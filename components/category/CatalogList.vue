<template>
    <div key="catalog-list" class="catalog-list">
        <template v-if="isMounted && !list?.length">
            <CatalogPreloader 
                v-if="loading || (!list?.length && process?.server)" 
                :="{view: R_view}"
            />
            <Empty
                v-else
                title="К сожалению, по вашему запросу ничего не нашлось"
                :description="
                    hasFilters?
                    'Попробуйте изменить параметры фильтра или сбросить выбранные значения':
                    ''                    
                "
            >
                <template v-if="hasFilters && useFilters().isFiltersActive">
                    <AnimButton
                        @click="useFilters().reset()"
                    >
                        Сбросить фильтры
                    </AnimButton>
                </template>
            </Empty>
        </template>
        <template v-else>
            <PagLoader
                v-if="hasPagination && page[0] > 1"
                v-model="page" 
                v-model:pag-pause="pagPause" 
                :vector="-1"
                :bump="100"
                :="{totalPages, loading}"
            />

            <div 
                class="catalog-list__container catalog-grid"
                :class="
                    [
                        loading && list?.length && page.length == 1 && `catalog-list__container--loading`
                    ]
                "
            >
                <RenderWrapper v-for="i in list" v-slot="{isVisible}" :key="i?.id">
                    <component
                        :is="component"
                        :info="{loading: !isVisible, ...i}"
                    />
                </RenderWrapper>
            </div>

            <PagLoader
                v-if="hasPagination && totalPages > 1"
                v-model="page" 
                v-model:pag-pause="pagPause" 
                :="{totalPages, loading}"
            />

            <Paginator
                v-model="page"
                v-model:pag-pause="pagPause" 
                :="{totalPages, loading}"
            />
        </template>
    </div>
</template>

<script setup>
    import { ProdCard } from '#components'

    const props = defineProps({
        view: String, // normal / horizontal
        list: Array,
        loading: Boolean,
        
        hasPagination: Boolean,
        totalPages: Number,
        hasFilters: Boolean,
        component: {
            type: [Object, String],
            default: ProdCard
        }
    })

    const page = defineModel('page');
    const pagPause = defineModel('pagPause');

    const isMounted = ref(false);
    onMounted(()=>isMounted.value = true);

    const R_view = computed(() => props.view == 'grid' ? 'normal' : 'horizontal');
</script>

<style lang="scss" scoped>
    .catalog-list{
        .pagination{
            margin-top: 3.2rem;
        }

        .prod-card{
            width: auto;
        }

        &__container{
            &--loading{
                animation: breathe 1s alternate infinite;
            }
        }
    }
</style>