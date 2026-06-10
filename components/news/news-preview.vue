<template>
    <div class="news-preview content-wrapper">
        <SectionTitle :="{bullit}" class="news-preview__title">
            {{ title }}
        </SectionTitle>

        <div class="news-preview__content content-grid">
            <template v-if="loading">
                <NewsCard
                    v-for="i in 3"
                    :info="{loading: true}"
                />
            </template>
            <template v-else>
                <NewsCard
                    v-for="i in list"
                    :key="i.id"
                    :info="i"
                />
            </template>
        </div>

        <AnimButton to="/news" class="news-preview__button" type="light" transition-block>
            Смотреть все
        </AnimButton>
    </div>
</template>

<script setup>
    const props = defineProps({
        title: {
            type: String,
            default: 'Последние новости и обновления'
        },
        bullit: {
            type: String,
            default: 'Новости'
        }
    });

    const list = ref([]);
    const loading = ref();

    const update = async ()=>{
        loading.value = true;

        const fetched = await useAPI(
            `/news`, 
            {
                query: {start: 0, end: 2},
                server: false
            },
        );

        // notodone filter /publish

        list.value = fetched.data.value?.news || [];

        loading.value = false;
    }

    onMounted(()=>setTimeout(update));
</script>

<style lang="scss" scoped>
    .news-preview{
        &__title{
            margin-bottom: 6.4rem;
        }

        &__button{
            margin-top: 3.6rem;
            width: 100%;
        }

        @include mobile{
            &__title{
                margin-bottom: 3.2rem;
            }
        }
    }
</style>