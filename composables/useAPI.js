function getServerPublicOrigin(config) {
    if (!import.meta.server) {
        return '';
    }
    const headers = useRequestHeaders(['x-forwarded-host', 'x-forwarded-proto', 'host']);
    let host = (headers['x-forwarded-host'] || '').split(',')[0].trim();
    if (!host) {
        host = (headers.host || '').split(',')[0].trim();
    }
    let proto = (headers['x-forwarded-proto'] || '').split(',')[0].trim() || 'https';

    const hostnameOnly = host.includes(']')
        ? host.slice(1, host.indexOf(']'))
        : host.split(':')[0];

    const loopback =
        !host
        || /^127\.0\.0\.1$/i.test(hostnameOnly)
        || /^localhost$/i.test(hostnameOnly)
        || hostnameOnly === '::1';

    if (loopback) {
        const siteHost = (config?.public?.siteHost || '').trim();
        if (siteHost) {
            const lower = siteHost.toLowerCase();
            const scheme = lower.startsWith('localhost') || lower.startsWith('127.0.0.1')
                ? 'http'
                : 'https';
            return `${scheme}://${siteHost}`;
        }
        try {
            const u = useRequestURL();
            if (u?.origin && !/^https?:\/\/(127\.0\.0\.1|localhost)(:\d+)?$/i.test(u.origin)) {
                return u.origin;
            }
        } catch {
        }
        return '';
    }

    return `${proto}://${host}`;
}

const resolveServerApiBaseURL = (config) => {
    let resolved;
    const priv = config.apiBaseURL;
    if (priv !== undefined && priv !== null && String(priv).trim() !== '') {
        resolved = String(priv).trim();
    } else {
        const pub = config.public.baseURL;
        if (pub !== undefined && pub !== null && String(pub).trim() !== '') {
            resolved = String(pub).trim();
        } else {
            try {
                const origin = getServerPublicOrigin(config) || useRequestURL().origin;
                if (origin) {
                    resolved = `${origin.replace(/\/$/, '')}/api`;
                }
            } catch {
            }
            if (!resolved) {
                resolved = '/api';
            }
        }
    }
    return absolutizeServerApiBase(resolved, config);
};

function absolutizeServerApiBase(base, config) {
    if (typeof base !== 'string' || !base.startsWith('/') || base.startsWith('//')) {
        return base;
    }
    const fromForwarded = getServerPublicOrigin(config);
    if (fromForwarded) {
        return `${fromForwarded.replace(/\/$/, '')}${base}`;
    }
    try {
        const origin = useRequestURL().origin;
        if (origin) {
            return `${origin.replace(/\/$/, '')}${base}`;
        }
    } catch {
    }
    return base;
}

function shouldSendSiteHostForApiBase(baseURL, siteHost) {
    if (!import.meta.server || !siteHost || !baseURL || !/^https?:\/\//i.test(baseURL)) {
        return false;
    }
    try {
        const { hostname } = new URL(baseURL);
        return (
            hostname === '172.17.0.1'
            || hostname === '127.0.0.1'
            || hostname === 'localhost'
            || hostname === 'host.docker.internal'
        );
    } catch {
        return false;
    }
}

export const useAPI = (
    request, 
    opts={}, 
    customOptions={}
    /*
        external: String // игнорирует baseURL (Нужно для внешних сервисов)
    */
) => {
    const config = useRuntimeConfig();
    const baseURL = customOptions.external
        ? ''
        : import.meta.server
            ? resolveServerApiBaseURL(config)
            : (config.public.baseURL || '');

    const siteHost = config.public.siteHost || '';

    const passedHeaders = { ...(opts.headers || {}) };
    delete opts.headers;

    const headers = {
        Accept: 'application/json',
        ...passedHeaders,
    };

    if (!headers.Authorization) {
        const token = useCookie('token').value;
        if (token !== undefined && token !== null && String(token).trim() !== '') {
            headers.Authorization = `Bearer ${token}`;
        }
    }

    if (shouldSendSiteHostForApiBase(baseURL, siteHost)) {
        headers.Host = siteHost;
    }

    //fin
        return useFetch(
            request, 
            { 
                baseURL, 
                headers,
                cache: isCacheAllowed(request, opts)?'force-cache':'no-cache', 
                onRequestError({ request, options, error }){
                    if (import.meta.dev && error) {
                        console.log('req-err', request, error);
                    }
                    if (!error || error.name == 'AbortError') {
                        return;
                    }
                    handle500();
                },
                onResponseError({ request, response, options }){
                    if(import.meta.client && response.status == 401){
                        useUser().exit();
                    }

                    if([500,501,502,503].includes(response.status))
                        handle500(response);
                },
                ...opts,
            }
        );
}

export const useMultipleAPI = (
    fetches // {key: [request, opts, customOptions] ...}
)=> 
    new Promise(
        async (res)=>{
            const fetched = await Promise.all(
                Object.values(fetches).map(e =>useAPI(...e))
            )

            const keys = Object.keys(fetches);

            res(
                Object.fromEntries(
                    keys.map((_, i) => [keys[i], fetched[i]])
                )
            );
        }
    )

//cacheAllowed
    let cacheAllowedArray = []; 

    const isCacheAllowed = (request, opts)=>{
        if(opts.method?.toLowerCase() == 'post')return false;
        let key;
        try {
            key = JSON.stringify([request, opts]);
        } catch {
            return false;
        }
        if(cacheAllowedArray.includes(key))return true;
        cacheAllowedArray.push(key);
        return false;
    }

const handle500 = (r)=>{
    showError({
        statusCode: 500,
        statusMessage: r?.statusMessage || '',
        fatal: true,
    })
}