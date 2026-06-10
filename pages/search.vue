<template>
    <BasicPage 
        class="search-page"
        :breadcrumbs="{title: 'Поиск'}"
        title="Поиск по сайту"
    >
        <div class="search-page__header">
            <div class="content-wrapper">
                <AnimText class="search-page__description" transition-block>
                    Используйте поиск, чтобы быстро найти нужное оборудование и материалы для вашего бизнеса.
                </AnimText>
                <Search 
                    v-model="searchText"
                    style-type="transparent-light"
                    transition-block
                />
            </div>
        </div>
        <div class="content-wrapper">
            <p class="search-page__result" transition-block>
                Результаты поиска по запросу: <span>{{ searchText }}</span> 
            </p>

            <div class="search-page__list">
                <template v-if="loading">
                    <Placeholder 
                        v-for="i in 3"
                        type="block"
                        style="--width:100%;--height: 15.6rem;"
                    />
                </template>

                <template v-else>
                    <SearchCard 
                        v-for="i in categories" 
                        :key="i.id"
                        :title="i.title"
                        :image="i.images?.[0]?.url || '/no-photo.svg'"
                        :to="`/catalog/${i.name}`"
                        transition-block
                        subtitle="Категория"
                    />

                    <SearchCard 
                        v-for="i in products" 
                        :key="i.id"
                        :title="i.title"
                        :to="'/product/' + i.name"
                        :subtitle="useCategories().category(i.category_id)?.title || 'Товар'"
                        :image="i.image || '/no-photo.svg'"
                        transition-block
                        :product="i"
                    />
                </template>

                <!-- notdone pagination -->
                <!-- notdone loading -->
            </div>
        </div>
    </BasicPage>
</template>

<script setup>
definePageMeta({
    saveScroll: true
})

const searchText = ref(R().query.q || '');

const categories = ref([]);
const products = ref([]);

const page = ref(0);
const total = ref(0);
const err = ref(null);
const loading = ref(false);

const limit = 12;

const push = async ()=>{
    if(loading.value) return;
    loading.value = true;
    err.value = '';

    const start = page.value * limit;
    const end = start + limit - 1;

    try{
        const {
            data: {value: fetched},
            error
        } = await useAPI(
            `/search/`,
            {
                server: import.meta.server,
                query: {
                    start,
                    end,
                    q: searchText.value
                },
            },
        );

        if(error?.value){
                if(error.value.statusCode < 500){
                    throw Error404(event, error?.value?.message);
                }else if(error.value.cause?.name == 'AbortError'){
                    return;
                }else{
                    throw new Error(error?.value?.data?.message);
                }
            }

            if(page.value.length == 1 && fetched.products.length == 0){
                throw Error404(event, 'page overflow');
            }

        products.value.push(...fetched.products);
        page.value++;
        total.value = fetched.total;
    }catch (error) {
        err.value = error.message;
    }finally{
        loading.value = false;
    }
}

const update = async () => {
    categories.value = useSearch().getCategories(999, searchText.value);

    page.value = 0;
    total.value = 0;
    await push();
}

update();
debouncedWatch(searchText, update, {debounce: 600});
watch(()=>useCategories().list.length, ()=>{categories.value = useSearch().getCategories(999, searchText.value);})

</script>

<style lang="scss" scoped>
    .search-page{
        &__header{
            position: relative;
            padding-bottom: 6.4rem;
            margin-bottom: var(--content-pad);

            &::before{
                @include pseudo-absolute;
                bottom: 0;
                left: 0;
                width: 100%;
                height: 100vh;
                background: var(--c-surface-neutral-secondary);
                z-index: -2;
            }  
        }

        &__description{
            margin-bottom: 2.4rem;
            margin-top: 1.2rem;
            max-width: 53.8rem;

            @include desktop{
                @include font-p2;
            }
        }

        &__result{
            color: var(--c-text-secondary);
            margin-bottom: 1.6rem;

            @include desktop{
                @include font-p2;
            }

            span{
                font-weight: 600;
                color: var(--c-text-accent);
            }
        }

        &__list{
            @include flex-col;
            gap: 1rem;
        }
    }
</style>