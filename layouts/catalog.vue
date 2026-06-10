<template>
    <BasicPage 
        class="page catalog catalog-page"
        :="{breadcrumbs, title}"
    >
        <slot :total="R_total" />
        
        <div class="filters-caller content-wrapper mob-visible">
            <Button
                type="transparent-light"
                :icon-left="IconFilterLine"
                @click="useFilters().called = !useFilters().called"
            />
        </div>

        <div v-if="showContent" ref="containerRef" class="catalog__content-wr content-wrapper">
            <div 
                class="catalog-filters-wr"
                :class="{'catalog-filters-wr--called': useFilters().called}"
            >
                <div 
                    class="catalog-filters-wr__wrapper"
                    @mousedown.self="useFilters().called = false"
                >       
                    <div class="catalog-filters-wr__content">
                        <div class="catalog-switches-total">
                            <Placeholder v-if="R_loading" style="--width:70%"/>
                            <template v-else>
                                <AnimText>
                                    {{ pluralizeWord(['Найден', 'Найдено', 'Найдено'], R_total) }}
                                    <span>{{ R_total }}</span>
                                    {{pluralizeWord(['товар', 'товара', 'товаров'], R_total)}}
                                </AnimText>
                                <Button class="mob-visible" :icon-left="IconCloseLine" type="light" @click="useFilters().called = false"/>
                            </template>
                        </div>
                        <div class="catalog-filters-wr__container faded-scroll faded-scroll--vertical">
                            <div class="catalog-filters-wr__scroll">
                                <slot name="filters"/>
                                <Button 
                                    class="catalog-filters-wr__button"
                                    @mousedown="useFilters().called = false"
                                >
                                    Показать
                                </Button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="catalog__content">
                <!-- <CatalogSwitches
                    v-model:view="view"
                    class="catalog-switches"
                    :total="R_total"
                    :show-sort="!isSearch"
                /> -->
                <CatalogList
                    v-model:page="page" 
                    v-model:pag-pause="pagPause"
                    class="catalog-list"
                    :="{
                        view,
                        list: R_list,
                        loading: R_loading,
                        totalPages,
                        hasPagination,
                        hasFilters
                    }"
                />
                <ParsedHTML v-if="description" :html="description"/>
            </div>
        </div>
    </BasicPage>
</template>

<script setup>
    import { IconCloseLine, IconFilterLine } from '#components';

    const event = useRequestEvent();

    const props = defineProps({
        breadcrumbs: Object,
        title: String,
        description: String,

        showContent: {
            type: Boolean,
            default: true
        },

        list: Array,
        total: Number,
        loading: {
            type: Boolean,
            default: null
        },

        hasPagination: {
            type: Boolean,
            default: true
        },

        endpoint: String,
        defaultFilters: {
            type: Object,
            default: {}
        },

        limit: {
            type: Number,
            default: 12
        },

        hasFilters: Boolean,
    })

    const emit = defineEmits(['empty']);

//defaults
    const R_list = computed(()=>props.list ?? F_list.value);
    const R_loading = computed(()=>props.loading ?? F_loading.value);
    const R_total = computed(()=>props.total ?? F_total.value);

//saved
    let saved = useCatalog().getCurrent();

//view
    const view = ref('grid');

//scroll
    const { y: windowY } = useWindowScroll();

    const scrollToTop = () => {
        windowY.value = 0;
    }

    const latestEndpoint = ref();

    const containerRef = ref();
    const scrollToContent = async ()=>{
        await nextTick();
        const { top } = useElementBounding(containerRef)
        const scrollTo = top.value + window.scrollY - 210;
        if(windowY.value <= scrollTo)return;
        window.scrollTo({top: scrollTo, behavior: 'smooth'});
    }

    const checkSameEndpoint = () => {
        if(latestEndpoint.value == props.endpoint)
            scrollToContent();
        latestEndpoint.value = props.endpoint;
    }

//search
    const isSearch = computed(() => R().name == 'Search');
    const searchString = computed(() => isSearch.value ? R().query.q : null);

//page
    const page = ref(saved?.page);

    const setQueryPage = () => {
        const pageToBe = page.value[0] <= 1 ? undefined : page.value[0];
        R().router.replace({query: {...R().query, page: pageToBe}})
    }

    setQueryPage();

//fetch
    const F_list = ref(unlink(saved?.list));

    const pagPause = ref(false);

    const F_loading = ref(false);

    //total
        const F_total = ref(saved?.total);
        
        const totalPages = computed(()=>
            Math.ceil(R_total.value / props.limit)
        );

    const updateList = async (
        options={}
        /*{
            soft: Boolean // при пагинации
        }*/
    )=>{
        if(props.list || !props.endpoint)return;

        F_loading.value = true;

        if(!options.soft){
            checkSameEndpoint();
            saved = useCatalog().getCurrent();
            F_list.value = unlink(saved?.list);
            F_total.value = saved?.total;
            page.value = unlink(saved?.page);

            if(useCatalog().hasCurrent()){
                F_loading.value = false;
                return;
            }
        }

        try{
            let start, end;

            if(options.vector < 0){
                start = (page.value[0] - 2) * props.limit;
            }else{
                start = (page.value[page.value.length-1] - 1) * props.limit;
            }

            end = start + props.limit - 1;

            const {
                data: {value: fetched},
                error
            } = await useAPI(
                props.endpoint,
                {
                    server: import.meta.server,
                    // key: 'updateList',
                    query: {
                        filter: {
                            ...props.defaultFilters,
                            ...useFilters().filter
                        },
                        props: useFilters().props,
                        sortBy: isSearch.value ? null : useFilters().sortByDisplay,
                        has_discount: useFilters().hasDiscount,

                        q: searchString.value?.toLowerCase(),

                        start,
                        end
                    },
                },
            );

            //error handler
                if(error?.value){
                    if(error.value.statusCode < 500){
                        throw Error404(event, error?.value?.message);
                    }else if(error.value.cause?.name == 'AbortError'){
                        return;
                    }else{
                        throw new Error(error?.value?.data?.message);
                    }
                }

            pagPause.value = false;

            const fetchedList = Array.isArray(fetched?.products) ? fetched.products : [];
            const fetchedTotal = typeof fetched?.total === 'number' ? fetched.total : fetchedList.length;
            useCatalog().pushCurrent(
                fetchedList,
                page.value[options.vector > 0 ? page.value.length - 1 : 0],
                fetchedTotal,
            );

            if(options.soft){
                const doc = document.documentElement
                const oldHeight = doc.scrollHeight
                const oldScroll = window.scrollY

                const method = options.vector < 0?"unshift":"push";
                F_list.value[method](...fetchedList);

                if(options.vector < 0){
                    await nextTick();
                    const newHeight = doc.scrollHeight
                    window.scrollTo({ top: oldScroll + (newHeight - oldHeight), behavior: 'instant' });
                }
            }else{
                F_list.value = fetchedList;
                if(!F_list.value.length)emit('empty');
            }

            // console.log(fetched);

            F_total.value = fetchedTotal;
            F_loading.value = false;

            return true;
        }catch (error) {
            // notdone
            console.error("Ошибка при получении информации о продукте:", error);
            F_loading.value = false;

            return false;
        }
    }

    if(import.meta.server){
        await updateList();
    }else{
        updateList();
    }
    
    const force = ref(false);
    const forceUpdate = async ()=>{
        saved = useCatalog().getCurrent();
        force.value = true;
        await updateList();
        force.value = false;
    }

    watch(()=>[...page.value], (n,o)=>{
        if(force.value || n.toString() == o.toString())return;
        const vector = n.length > o.length ? (n[0] === o[0] ? 1 : -1): 0;
        updateList({soft: n.length != 1, vector});
    });

    let filtersDebounce = null;
    if(import.meta.client){
        watch(
            // () => [useFilters().props, useFilters().filter, useFilters().sortBy, useFilters().hasDiscount],
            () => useFilters().keys.map(k => useFilters()[k]),
            (n, o) => {
                if (JSON.stringify(n) == JSON.stringify(o)) return;
                F_loading.value = true;
                if (filtersDebounce) clearTimeout(filtersDebounce); // таймер задержки
                filtersDebounce = setTimeout(forceUpdate, 500);
            },
            { deep: true }
        );
    }

    //show-content
        watch(()=>props.showContent, (n)=>{if(!n)F_list.value = []})
        
    //filters
        onUnmounted(()=>{
            useFilters().called = false;
            F_list.value = [];
            F_loading.value = true;
        })

    watch(()=>props.endpoint, ()=>{
        if(props.showContent){
            forceUpdate();
            scrollToContent();
        }
    });

//expose
    defineExpose({
        forceUpdate
    });
    
    
</script>

<style lang="scss" scoped>
    .catalog{
        --title-mb: 5.2rem;

        &__title-placeholder{
            --width: 100%;
            max-width: 40rem;
            margin-bottom: 4.6rem;
        }

        &__content-wr{
            display: grid;
            grid-template-columns: 27rem minmax(0, 1fr);
            gap: 3rem;
            align-items: flex-start;
            margin-bottom: 10rem;
        }

        &__content{
            height: 100%;
            min-width: 0;
        }

        &__found{
            padding: .8rem;
            padding-top: 0;
        }

        &__found-placeholder{
            margin: 1.1rem 0;
        }

        @media (max-width: $navigation-mobile) {
            &__content-wr{
                display: block;
            }
        }

        @media (max-width: $mobile) {
            .breadcrumbs {
                margin-bottom: 1.6rem;
            }
        }

    }

    .catalog-filters-wr{
        min-width: 0;
        position: sticky;
        top: var(--header-height);
        left: 0;
        padding-top: 3.2rem;
        margin-top: -3.2rem;

        &__container{
            overflow-y: auto;
            max-height: calc(100vh - var(--header-height) * 2);
            overscroll-behavior: contain;
            @include virtual-area(1.8rem);

            &::-webkit-scrollbar{
                    width: .4rem;
                &-thumb{
                    background: var(--c-brand-12);
                }

                &-track{
                    background: var(--c-surface-neutral-secondary);
                }
            }
        }

        &__title{
            @include flex-jtf;
            align-items: center;
            margin-bottom: 2rem;
        }

        &__button{
            width: 100%;
            position: sticky;
            bottom: 0;
            left: 0;
        }

        @media (min-width: calc($navigation-mobile + 1px)) {
            :deep(.catalog-filters-wr__title),
            :deep(.catalog-filters-wr__button)
            {
                display: none;
            }
        }

        @media (max-width: $navigation-mobile) {
            position: fixed;
            z-index: 10;
            top: 0;
            left: 0;
            bottom: unset;
            height: 100%;
            width: 100%;
            transition: 0s;
            transition-delay: .0s;

            padding-top: 0;
            margin-top: 0;

            --h: calc(
                100 * var(--vh) - 
                var(--header-height, 11.3rem) - 
                var(--mobile-navigation-height, 5.8rem) +
                1.2rem
            );

            height: var(--h);

            &__content{
                width: 100%;
                max-width: calc(27rem + 2.4rem);
                background: var(--c-surface-neutral-main-inverse);
                @include transition-bounce;
                position: fixed;
                left: var(--pad);
                top: var(--pad);
                border-radius: 1.2rem;
                height: calc(var(--100vh) - var(--pad) * 2);
                @include flex-col;
                overflow: hidden
            }

            &__container{
                @include virtual-area(0);
                position: relative;
                height: 100%;
                max-height: unset;
                --gap: 3.2rem
            }

            &__scroll{
                height: 100%;
                overflow: auto;
                padding: 1.6rem;
            }
            
            &__wrapper{
                width: 100%;
                min-height: 110vh;
                background: var(--c-black-68);
                transition: .3s;
                padding-bottom: 76rem;
            }
            
            &:not(&--called){
                transition-delay: .3s;
                height: 0;
                overflow: hidden;
                background-color: transparent;
                pointer-events: none;
                
                .catalog-filters-wr{
                    &__content{
                        @include hidden-hor(-5rem);
                    }

                    &__wrapper{
                        background: transparent;
                    }
                }
            }

            .catalog-switches-total{
                height: auto;
                padding: 1.6rem 1.6rem 0;
            }
        }

        @media (max-width: $mobile) {
            &__content{
                max-width: calc(100% - var(--pad) * 2);
            }

            &__wrapper{
                padding-bottom: 7.8rem;
            }
        }
    }

    .filters-caller{
        margin: -3.8rem 0 1.6rem;
    }

    h1{
        margin-bottom: 3.2rem;
    }

    .sub-categories{
        margin-bottom: 6rem;
    }    

    .catalog-tags{
        margin-bottom: 2.4rem;
    }

    .catalog-switches-total{
        @include font-c3;
        @include flex-jtf;
        align-items: center;
        width: 100%;
        padding: 1.2rem 0 2.4rem;
        height: 5rem;
    }

    @include mob-display($navigation-mobile);

    :deep(.catalog-switches){
        margin-bottom: 1.2rem!important;
    }

    :deep(.catalog-list){
        margin-bottom: 6rem;
    }

</style>