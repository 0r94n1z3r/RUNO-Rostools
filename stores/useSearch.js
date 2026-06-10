import Fuse from 'fuse.js';
// import { toEngLayout } from 'searchHelpers';

export default defineStore("useSearch", ()=>{
//search
    const searchText = ref('');

    //stores
        const searchStore = (store, limit=3, q=searchText.value)=>{
            if(!q)return [];

            //layout
                let exactList = [
                    ...store.list.filter(e => {
                        let title = toEngLayout(e.title.toLowerCase());
                        let search = toEngLayout(q.toLowerCase());
                        return title.includes(search)            
                    })
                ].sort((a, b) => 
                    (a.title.indexOf(q) - b.title.indexOf(q))
                );


            //fuse 
                let searched = [];

                if(exactList.length<3){
                    const fuse = new Fuse(
                        store.list, 
                        {
                            keys: ['title'],
                        }
                    );

                    searched = fuse.search(q).slice(exactList.length,exactList.length+3).map(e => e.item);
                }

            return [...exactList, ...searched].slice(0, limit);
        };

        //category
            const categories = computed(()=>searchStore(useCategories()))
            const getCategories = (limit, q)=> searchStore(useCategories(), limit, q)
            

    //products
        const products = ref([]);
        const productsLoading = ref(false);

        const updateProducts = async ()=>{
            if(!searchText.value){
                products.value = [];
                productsLoading.value = false;
                return;
            }

            productsLoading.value = true;

            try {
                const {
                    data: {value: fetched}
                } = await useAPI(
                    `/search/`,
                    {
                        // key: 'Search',
                        query: {
                            q: searchText.value,
                            start: 0,
                            end: 9
                        }
                    },
                )
        
                products.value = fetched?.products?.slice(0,10) || [];
                productsLoading.value = false;

            } catch (error) {
                // notdone
                console.error("Ошибка:", error);
                productsLoading.value = false;
            }
        }

        let updateProductsDebounce = null;
        watch(searchText, ()=>{
            if(searchText.value.length < 3) {
                products.value = [];
                return;
            }
            productsLoading.value = true;
            
            if(updateProductsDebounce)clearTimeout(updateProductsDebounce);
            updateProductsDebounce = setTimeout(updateProducts, 300);
        });
//----------------------------------------------------------------
    return {
        searchText,
        
        categories,
        getCategories,
        
        products,
        productsLoading,
    }
})