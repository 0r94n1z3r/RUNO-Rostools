//Стор роутера с полезными методами

export default defineStore("R", ()=>{
    const router = useRouter();

    const getRoute = ()=>import.meta.server ? useRoute() : router.currentRoute.value;
    const route = ()=> getRoute();

    const push = (r)=>router.push(r);
    const back = (r)=>router.back(r);
    const resolve = (r)=>{
        if(!r)return '';
        return router.resolve(r);
    }

    const name = computed(()=>getRoute().name);
    const meta = computed(()=>getRoute().meta);
    const query = computed(()=>getRoute().query);
    const params = computed(() => getRoute().params);
    const path = computed(()=>getRoute().path);
    const fullPath = computed(()=>getRoute().fullPath);

    const getHistory = ()=>router.options.history?.state;

    const pushQuery = (q)=>{
        let res = Object.assign(
            {},
            query.value,
            q
        )

        res = Object.fromEntries(Object.entries(res)?.filter(([_, v]) => v != null));

        push({query: res});
    }

    const parseQuery = (key)=>{
        if(!query.value[key])return null;
        return Object.fromEntries(query.value[key].split(';').map(e => e.split('=')))
    }

    const matched = computed(()=>getRoute().matched);

    //guard
        const guard = (to=getRoute(), from, isMiddleware)=>{  
            if(to.meta.private && !useUser().info){
                const redir = (from && !from?.meta?.private) ? from : '/';

                if(!import.meta.client){
                    return navigateTo(redir);
                }

                if(isMiddleware){
                    useUser().callAuth();
                    return abortNavigation();
                }

                push(redir);
            }
        }

//----------------------------------------------------------------
    return {
        router,
        route,

        push,
        back,
        resolve,

        pushQuery,
        parseQuery,

        name,
        meta,
        query,
        params,
        path,
        fullPath,
        matched,

        getHistory,
        guard,
    }
})