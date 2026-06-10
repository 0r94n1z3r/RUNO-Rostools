import cookies from 'browser-cookies';

const IGNORED_HOST_LABELS = new Set(['www']);

function stripIgnoredLeadingLabels(parts) {
    const out = [...parts];
    while (out.length > 2 && IGNORED_HOST_LABELS.has(String(out[0]).toLowerCase())) {
        out.shift();
    }
    return out;
}

export default defineStore("useRegions", ()=>{
    const {data: fetchedList} = useAPI('/regions/', {
        key: 'pinia-regions',
        default: ()=>({regions: []}),
    });
    const list = computed(() => {
        const raw = fetchedList?.value?.regions;
        if (!Array.isArray(raw) || raw.length === 0) {
            return [];
        }
        return [...raw].sort((a, b) => (a?.default ?? 0) - (b?.default ?? 0));
    });

    const host = computed(()=>{
        let res;

        if (import.meta.client) {
            res = location?.host;
        } else {
            res = useRequestHeaders(['host']).host;
        }

        res = res.split('.');

        return res;
    })

    const locationSub = computed(() => {
        const first = host.value[0];
        if (!first || IGNORED_HOST_LABELS.has(String(first).toLowerCase())) {
            return null;
        }
        if (list.value.map((e) => e.subdomain).includes(first)) {
            return first;
        }

        return null;
    });

    const current = computed(()=>
        (
            locationSub.value?
                list.value?.find(e => e.subdomain == locationSub.value):
                list.value?.find(e => e.default)
        ) || 
        list.value[0]
    );

    //cookie
        const setLocationCookie = (val)=>{
            if(import.meta.dev)return; // Предотвращает лупы при разработке // notdone temp (remove true) 
            
            const cookieBase = stripIgnoredLeadingLabels(location.host.split('.')).join('.');
            let domain = '.' + (
                locationSub.value
                    ? location.host.split('.').slice(1).join('.')
                    : cookieBase
            );

            domain = domain.split(':')[0];

            cookies.set('location', val, {domain});
        }

    //redirect
        const redirect = (subdomain)=>{
            if (
                current.value?.subdomain == subdomain ||
                (subdomain == 'default' && !current.value?.subdomain)
            ) {
                return;
            }

            let toHost = stripIgnoredLeadingLabels(host.value);

            if (locationSub.value) {
                toHost.splice(0, 1);
            }
            
            setLocationCookie(subdomain || 'default');

            globalThis.location.href = `${globalThis.location.protocol}//${(subdomain && subdomain != 'default')?subdomain+'.':''}${toHost.join('.')}${R().fullPath}`;
        }

        const autoRedirectDone = ref(false);

        const tryAutoRedirect = async () => {
            if (!import.meta.client || autoRedirectDone.value) {
                return;
            }
            if (!list.value.length) {
                return;
            }

            if (locationSub.value) {
                autoRedirectDone.value = true;
                return;
            }

            const cookie = useCookie('location').value;
            if (cookie) {
                autoRedirectDone.value = true;
                redirect(cookie);
                return;
            }

            autoRedirectDone.value = true;
            await new Promise((r) => setTimeout(r));

            const { data: fetchedLocation } = await useAPI('/regions/region_info_by_ip');
            const sub = fetchedLocation.value?.subdomain;
            if (sub) {
                redirect(sub);
            }
        };

        watch(list, () => { tryAutoRedirect(); }, { flush: 'post', immediate: true });

        onMounted(() => {
            tryAutoRedirect();
        });

    //product
        const getCurrentSEO = (info)=>{
            if(!info)return null;
            return info.regions?.find(e => e.region_id === current.value?.id);
        }

//----------------------------------------------------------------
    return {
        list,
        locationSub,
        current,
        redirect,
        getCurrentSEO,
    }
})