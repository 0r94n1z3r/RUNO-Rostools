<template>
    <BasicPage 
        class="news"
        title="Будьте в курсе последних событий и достижений в мире лазерных технологий"
        :breadcrumbs="{title: 'Новости'}"
    >
        <div class="content-wrapper">
            <Placeholder 
                v-if="loading && categories?.length <= 2"
                class="news__filter news__filter--placeholder"
                type="block"
            />
            <TabsControl 
                v-if="categories?.length > 2"
                v-model="categoryIndex"
                class="news__filter"
                :list="categories.map(e => e.name)"
                transition-block
                @clicked="handleCatChange"
            />

            <CatalogList 
                v-model:page="page" 
                v-model:pag-pause="pagPause"
                class="news__content"
                :component="NewsCard"
                :="{
                    list,
                    loading,
                    totalPages,
                }"
            />
        </div>
    </BasicPage>
</template>

<script setup>
    import {NewsCard} from '#components';

    definePageMeta({
        name: 'News',
        key: route => route.name,
        catalog: true,
        saveScroll: true
    })

    // cats
        const categoryIndex = ref(R().params.categoryIndex || 0);
        const categories = computed(()=>[ // notdone [API] подтягивать с бэка?
            {id: 0, name: "Все"},
        ])

        const handleCatChange = (index) => {
            categoryIndex.value = index;
            if(index){
                R().push({query: {category: categories?.value[index]?.name}});
            }else{
                R().push({query: {}});
            }
        }

    const endpoint = computed(()=>R().fullPath);

    let saved = useCatalog().getCurrent();

    const page = ref(saved?.page);
    const list = ref(unlink(saved?.list));

    const limit = 12;

    //total
        const total = ref(saved?.total);
        
        const totalPages = computed(()=>
            Math.ceil(total.value / limit)
        );
    
    const loading = ref(true);
    
    const pagPause = ref(false);

    const updateList = async (
        options={}
        /*{
            soft: Boolean // при пагинации
        }*/
    )=>{
        if(R().name != 'News')return;

        loading.value = true;

        if(!options.soft && categories.value.length > 1){
            saved = useCatalog().getCurrent();
            list.value = unlink(saved?.list);
            total.value = saved?.total;
            page.value = unlink(saved?.page);

            if(useCatalog().hasCurrent()){
                loading.value = false;
                return;
            }
        }

        try{
            let start, end;

            if(options.vector < 0){
                start = (page.value[0] - 2) * limit;
            }else{
                start = (page.value[page.value.length-1] - 1) * limit;
            }

            end = start + limit - 1;

            // notdone publish

            const {
                data: {value: fetched},
                error
            } = await useAPI(
                endpoint.value,
                {
                    server: import.meta.server,
                    // key: 'updateList',
                    query: {
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

            const fetchedList = fetched.news || fetched || [];
            const t = fetched.total || fetchedList.length || 0;
            useCatalog().pushCurrent(fetchedList,  page.value[options.vector > 0 ? page.value.length - 1 : 0], t);

            if(fetched.categories?.length && categories.value.length <= 1){
                categories.value.push(...fetched.categories.filter(e => e.news_count));
                if(R().query.category){
                    categoryIndex.value = categories.value.findIndex(e => e.name == R().query.category)
                }
            }

            if(options.soft){
                const doc = document.documentElement
                const oldHeight = doc.scrollHeight
                const oldScroll = window.scrollY

                const method = options.vector < 0?"unshift":"push";
                list.value[method](...fetchedList);

                if(options.vector < 0){
                    await nextTick();
                    const newHeight = doc.scrollHeight
                    window.scrollTo({ top: oldScroll + (newHeight - oldHeight), behavior: 'instant' });
                }
            }else{
                list.value = fetchedList;
            }

            total.value = t;
            
            return true;
        }catch (error) {
            // notdone
            console.error("Ошибка при получении информации о новости:", error);
            return false;
        }finally{
            loading.value = false;
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
    watch(endpoint, forceUpdate);

    watch(()=>[...page.value], (n,o)=>{
        if(force.value || n.toString() == o.toString())return;
        const vector = n.length > o.length ? (n[0] === o[0] ? 1 : -1): 0;
        updateList({soft: n.length != 1, vector});
    });

    
</script>

<style lang="scss" scoped>
    .news{
        --title-mb: 3.2rem;
        
        &__filter{
            margin-bottom: var(--title-mb);
            &--placeholder{
                --height: 6rem;
                width: 80%;
            }
        }

        &__content{
            gap: 4.8rem 2rem;
        }

        @include mobile{
            --title-mb: 2.4rem;
        }
    }
</style>