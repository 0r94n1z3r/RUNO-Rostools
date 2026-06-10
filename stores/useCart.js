export default defineStore("useCart", ()=>{

    //init
        const initLoading = ref(true);
        const {data: list} = useAPI(
            `/lk/cart`, 
            {
                default: ()=>[],
                server: false,
                onResponse(){
                    initLoading.value = false
                },
                onResponseError(){
                    initLoading.value = false
                },
                transform(l) {
                    if (!Array.isArray(l)) {
                        return [];
                    }
                    return l.filter((e) => e.count > 0);
                },
            }
        );

    //TmpCart - Временная корзина для незалогиненных юзеров или для шэринга
        const tmpCartLoading = ref(Boolean(!useUser().info));

        const stringifyTmpCart = (cart) =>
            (Array.isArray(cart) ? cart : []).map((e) => `${e.id}:${e.count}`).join(';');

        const parseTmpCartString = (strCart)=>
            strCart.split(';').map(e => e.split(':')).map(([product_id, count]) => ({product_id, count}));
        
        
        const parseTmpCart = async (strCart)=>{
            if(!strCart){
                tmpCartLoading.value = false;
                return[];
            }

            tmpCartLoading.value = true;

            const cart = parseTmpCartString(strCart);

            const { data: { value: fetched } } = await useAPI(`/products/by_ids`, {
                method: 'POST',
                body: {
                    ids: cart.map((e) => e.product_id),
                },
            });

            const rows = Array.isArray(fetched) ? fetched : [];
            const res = rows.map((e, k) => ({
                ...e,
                count: Number(cart[k]?.count),
            }));

            tmpCartLoading.value = false;

            return res;
        }

        const saveTmpCart = ()=>{
            if(!localStorage)return;
            localStorage['RTOOLS-cart'] = stringifyTmpCart(list.value);
        }

        const pushTmp = async (strCart)=>{
            tmpCartLoading.value = true;

            const fetched = await useAPI(
                '/lk/cart/products',
                {
                    method: 'POST',
                    body: {
                        products: parseTmpCartString(strCart)
                    }
                }
            )

            tmpCartLoading.value = false;
            return fetched;
        }

    // control
        const update = async ()=>{
            if(!import.meta.client)return;

            purify();

            if(!useUser().info){
                list.value = await parseTmpCart(localStorage?.['RTOOLS-cart']);
                purify();
                return;
            }

            tmpCartLoading.value = true;

            await new Promise(r => setTimeout(r));

            if(localStorage?.['RTOOLS-cart']){
                await pushTmp(localStorage['RTOOLS-cart']);
                localStorage.removeItem('RTOOLS-cart');
            }

            await new Promise(r => setTimeout(r));

            tmpCartLoading.value = true;

            const cartRefresh = await useAPI(`/lk/cart`, { cache: 'no-cache' });
            const v = cartRefresh.data.value;
            list.value = Array.isArray(v) ? v : [];

            tmpCartLoading.value = false;
        }

        watch(()=>useUser().info?.id, async () => {await sleep(); update}); // смена аккаунта/выход
        setTimeout(async ()=>{if(!useUser().info){await sleep();update();}}); // CSR обновление tmp корзины

        const purify = () => {
            if (!Array.isArray(list.value)) {
                list.value = [];
                return;
            }
            list.value = list.value.filter((e) => e.count > 0);
        };
    
    // general getters
        const length = computed(()=>getLength(list.value));
        const getLength = (prods)=>prods?.reduce((acc, e) => acc + Number(e.count), 0)
        const getTotal = (prods=list.value, key='price')=>
            prods?.reduce((acc, e) => {
                const p = useCatalog().getPrice(e);

                if(key == 'price_before')key = 'priceBefore';
                
                const val = Number((key == 'price' || key == 'priceBefore') ? p[key] : e[key]);

                return acc + (Math.ceil(val || 0) * Number(e.count))
            }, 0)
        

        const getSelectedLength = (prods)=>getLength(prods.filter(e => e.selected));
        const getSelectedTotal= (prods, key)=>getTotal(prods.filter(e => e.selected), key);
        
    // amount
        let cartDebounce = null;
        
        const changeAmount = (prod, count, overrideDebounce) => {
            let p = product(prod.id);

            if(!p){
                p = unlink(prod);
                list.value.push(p)
            };

            p.count = count;

            // if(window?.ym)
            //     ym(57376876,'reachGoal','goal_basket_add');

            if(!useUser().info){
                saveTmpCart();
                return;
            }

            if(cartDebounce && !overrideDebounce)clearTimeout(cartDebounce);

            cartDebounce = setTimeout(() => {
                useAPI(
                    `/lk/cart`,
                    {
                        method: count>0?'POST':'DELETE',
                        body: {
                            product_id: prod.id,
                            count
                        }
                    }
                )
            }, 300)
        }

    //product
        const product = (value, key="id")=>{
            if(!value)return null;
            return list.value?.find(e => e?.[key] == value);
        }

    //clean
        const clean = ()=>{
            list.value.forEach(e => {
                changeAmount(e,0,true);
            });
            
            list.value = [];
        }



//----------------------------------------------------------------
    return {
        list,
        initLoading,
        update,
        purify,

        tmpCartLoading,
        stringifyTmpCart,
        parseTmpCart,
        pushTmp,

        length,
        getLength,
        getTotal,
        getSelectedLength,
        getSelectedTotal,

        changeAmount,

        product,

        clean
    }
})