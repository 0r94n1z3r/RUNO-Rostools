export default defineStore("useCatalog", ()=>{
    
    const lists = ref({});

    /*
    {
        [endpoint]: {
            list: {
                [page]: []
            },
            total: 0
        }
    }
    */

    const has = ( endpoint ) => lists.value.hasOwnProperty( endpoint );
    const hasCurrent = () => lists.value.hasOwnProperty( R().fullPath );

    const get = ( endpoint, pages ) => {

        let list, page;

        if( !has(endpoint) ) {
            list = [];
            page = (()=>{
                let p = Number(R().query.page);
                return [p > 1 ? p : 1];
            })()
        } else if( !pages ) {
            list = Object.values(lists.value[endpoint].list).flat();
            page = Object.keys(lists.value[endpoint].list).map(e => Number(e));
        } else {
            page = pages;
            list = pages.map(e => lists.value[endpoint].list[e]).flat();
        }

        return {
            list,
            page,
            total: lists.value[endpoint]?.total || 0
        }
    }

    const getCurrent = () => get(R().fullPath)

    let keys = Object.keys(lists.value);
    const push = ( endpoint, list, page, total ) => {
        if( has(endpoint) ) {
            keys = keys.filter(e => e != endpoint);
        }else{
            lists.value[endpoint] = {
                list: {},
                total
            };
        }
        
        lists.value[endpoint].list[page] = unlink(list);
        
        if(keys.length > 5) {
            delete lists.value[keys[0]];
            keys.shift();
        }
    }

    const pushCurrent = ( ...args ) => push(R().fullPath, ...args);

    const getPrice = (product) => {
        if(!product) return {price: 0, discountedPrice: 0, discount: false};

        const discount = (
                (!isNaN(parseFloat(product.discount)) ? product : null) || 
                useCategories().categoryDiscount(product.category_id)
            )?.discount || 0

        let res = {
            priceBefore: Number(product.price),
            price: Math.ceil(
                    Number(product.price) * 
                    (
                        (
                            100 - 
                            discount
                        ) / 
                        100
                    )
                ),
            discount
        }
        
        return res; 
    }

//----------------------------------------------------------------
    return {
        lists,
        has,
        hasCurrent,
        get,
        getCurrent,
        push,
        pushCurrent,
        getPrice
    }
})