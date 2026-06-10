export default defineStore("useFilters", () => {
//drop
    const called = ref(false);
    watch(called, n => {
        window.scrollTo({ top: 0, behavior: 'instant' });
        useModals().lockScroll(Number(n));
    })

//filters
    const keys = ['props', 'filter', 'hasDiscount', 'has_discount', 'sortBy']; //все query или переменные стора, значения которых относятся к фильтрам

    const snakeRE = key => new RegExp(`^${key}_(.+)$`)
    const isEmpty = obj => !obj || !Object.keys(obj).length

    const applyFilter = (key, newFilter) => {
        const { query, pushQuery } = R()
        const re = snakeRE(key)

        const nextQuery = Object.entries(query)
            .filter(([k]) => re.test(k))
            .reduce((acc, [k]) => {
                const match = k.match(re)
                const subKey = match ? match[1] : null
                
                // Если в новом фильтре нет этого subKey, удаляем из query
                if (subKey && (!newFilter || !newFilter[subKey])) {
                    acc[k] = null
                }
                return acc
            }, {})

        if (isEmpty(newFilter)) {
            pushQuery(nextQuery)
            return
        }

        Object.entries(newFilter).forEach(([subKey, values]) => {
            // Формат: props_6
            nextQuery[`${key}_${subKey}`] = Array.isArray(values) ? values : [values]
        })

        pushQuery(nextQuery)
    }

    const getQuery = key => {
        const re = snakeRE(key)
        const { query } = R()

        const result = Object.entries(query)
            .filter(([k]) => re.test(k))
            .reduce((acc, [k, v]) => {
                const match = k.match(re)
                if (match) {
                    // match[1] — это ID или имя фильтра после "_"
                    acc[match[1]] = Array.isArray(v) ? v : [v]
                }
                return acc
            }, {})

        return isEmpty(result) ? null : result
    }

    //state
        const isFiltersActive = computed(()=>
            keys.some(k => R().query?.[k])
        )

        const resetLoading = ref();
        const reset = ()=>{
            // notdone нужно придумать что-то поумнее
            resetLoading.value = true;
            location = R().route.path;
        };

    // props (props как поле фильтров из api)
        const props = computed(() => getQuery('props'));

        const isActiveProp = (propId, value) =>
            props.value?.[propId]?.includes(value)


        const switchProp = (propId, value) => {
            let newProps = structuredClone(props.value || {});

            if (!newProps[propId]) { // если prop не существует (добавляем)
                newProps[propId] = [value]
            }
            else if (!isActiveProp(propId, value)) { // если prop существует, но value нет (добавляем)
                newProps[propId].push(value)
            } else { // если prop существует, и value тоже (удаляем)
                newProps[propId] = newProps[propId]?.filter(e => e != value) || [];
                if (!newProps[propId].length) delete newProps[propId];
            }

            applyFilter('props', newProps);
        }

    //filters (определенные фильтры для поля filter в апи)
        const filter = computed(() => getQuery('filter'));

        //price
            const dynamicPrice = ref(structuredClone(filter.value?.price) || [null,null]);
            
            const updatePrice = (price) => {
                dynamicPrice.value = price;

                let newFilter = structuredClone(filter.value || {});

                if (price[0] != null || price[1] != null) {
                    newFilter.price = price;
                } else if (newFilter.price) {
                    delete newFilter.price;
                }

                applyFilter('filter', newFilter);
            }

        //filter
            const switchFilter = (key, value)=>{
                let newFilter = structuredClone(filter.value || {});

                if(value == null){
                    delete newFilter[key]
                }else{
                    newFilter[key] = value;
                }

                applyFilter('filter', newFilter);
            }

    //hasDiscount
        const hasDiscount = ref(getQuery('has_discount'));
        watch(hasDiscount, (n)=>{
            R().pushQuery({ has_discount: n || null })
        });

    //sortBy
        const sortByList = computed(() => [
            { key: "view_counter", order: "desc", title: "Популярные" },
            { key: "price", order: "asc", title: "Дешевле" },
            { key: "price", order: "desc", title: "Дороже" },
        ])

        const sortBy = computed(() => {
            const q = getQuery('sortBy')
            return q
                ? { key: q.key?.[0], order: q.order?.[0] }
                : null
        })

        const sortByDisplay = computed(() =>
            sortBy.value
                ? sortByList.value.find(
                    e => e.key === sortBy.value.key &&
                        e.order === sortBy.value.order
                )
                : sortByList.value[0]
        )

        const setSortby = sort =>
            R().pushQuery(
                sort?.key
                ? {
                    'sortBy_key': sort.key,
                    'sortBy_order': sort.order,
                    }
                : {
                    'sortBy_key': null,
                    'sortBy_order': null,
                    }
        )

    

//----------------------------------------------------------------
    return {
        called,

        keys,
        isFiltersActive,
        reset,
        resetLoading,

        props,
        isActiveProp,
        switchProp,
    
        filter,
        dynamicPrice,
        updatePrice,
        switchFilter,

        hasDiscount,
    
        sortBy,
        sortByDisplay,
        sortByList,
        setSortby,
    }
})