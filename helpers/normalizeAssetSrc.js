export function normalizeAssetSrc(url, requestOrigin) {
    if (url == null || typeof url !== 'string' || !url) {
        return url ?? '';
    }
    if (!url.startsWith('http://') && !url.startsWith('https://') && !url.startsWith('/_nuxt')) {
        if(import.meta.dev){
            return useRuntimeConfig().public.baseURL?.replace('/api','') + url || '';
        }
        return url;
    }
    if (!requestOrigin) {
        return url;
    }
    try {
        const u = new URL(url);
        const site = new URL(requestOrigin);
        if (u.hostname !== site.hostname) {
            return url;
        }
        return `${u.pathname}${u.search}${u.hash}`;
    } catch {
        /* ignore */
    }
    return url;
}
