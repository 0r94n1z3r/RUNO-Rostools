export default defineStore("useFavorites", ()=>{
    
    const list = ref([]);
    const loading = ref(true);

    //upd
        const update = async ()=>{
            loading.value = true;

            if(!useUser().info?.id){
                list.value = [];
            }else{
                await sleep();
                const fetched = await useAPI(
                    `/lk/favorites`,
                    {
                        cache: 'no-cache',
                        server: false
                    }
                );

                list.value = fetched.data.value?.list || [];
            }

            loading.value = false;
        }

        watch(()=>useUser().info?.id, update); 
        onMounted(update);

    // methods
        const isFav = (value, key="id")=>{
            if(!value || !useUser().info)return false;
            return list.value?.some(e => e?.[key] == value);
        }

        const switchFav = (product)=>{
            let method;

            if(isFav(product.id)){
                list.value = list.value?.filter(e => e.id != product.id);
                method = 'DELETE';
            }else{
                list.value.unshift(product);
                method = 'POST';
                
                // if(window?.ym)
                //     ym(46656762,'reachGoal','vizbrannoe');
            }

            useAPI(
                `/lk/favorites`,
                {
                    method,
                    body: {
                        product_ids: [product.id]
                    }
                }
            )
        }

    
    
//----------------------------------------------------------------
    return {
        list,
        loading,

        switchFav,
        isFav,
    }
})