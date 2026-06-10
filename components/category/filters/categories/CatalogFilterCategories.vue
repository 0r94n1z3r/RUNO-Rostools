<template>
    <div class="catalog-filter-categories">
        <div v-if="R_loading" class="catalog-filter-categories__loading">
            <Placeholder 
                v-for="i in 12"
                type="bar"
            />
        </div>
        <template v-else>
            <p
                v-if="all && renderedList.length > 1"
                :class="[
                    `catalog-filter-categories__link font-14`,
                    `text-link--basic`,
                    !useFilters().filter?.selectedCategories?.length && `catalog-filter-categories__link--active`
                ]"
                @click="clickHandler"
            >
                Все
            </p>
            
            <CatalogFilterCategoriesList
                :list="renderedList"
                @categories="clickHandler"
                :called="R().meta.catalog"
            />
        </template>

    </div>
</template>

<script setup>
    const props = defineProps({
        list: Array,
        sticker: String,
        loading: {
            type: Boolean,
            default: null
        },
        all: {
            type: Boolean,
            default: true
        },
        isFilter: {
            type: Boolean,
            default: true
        },
    })

    const emit = defineEmits(['categories']);

    const renderedList = computed(()=>props.list || useCategories().stickerTree(props.sticker));
    const R_loading = computed(()=>props.loading || useCategories().initLoading);

// clickHandler
    const clickHandler = (ids)=>{
        emit('categories', ids);

        if(props.isFilter){
            useFilters().switchFilter('selectedCategories', ids)
        }
    }

    // setTimeout(()=>{
    //     if(!R_loading.value && renderedList.value?.length <= 1)
    //         clickHandler(useCategories().getTreeIds(renderedList.value?.[0]));
    // });


</script>

<style lang="scss" scoped>
    .catalog-filter-categories{
        &__link{
            padding: 1rem 0;

            &--active{
                color: var(--orange-100);
            }
        }

        &__loading{
            @include flex-col;
            gap: 2rem;
            padding: 2rem 0;

            .placeholder{
                --width: 100%;
            }
        }
    }
</style>