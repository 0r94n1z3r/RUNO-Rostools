<template>
    <div 
        class="catalog-filter-category"
        :class="{'catalog-filter-category--called': called}"
    >
        <div 
            class="catalog-filter-category__head"
            :class="[isActive && `catalog-filter-category__head--active`]"
        >
            <p 
                class="
                    catalog-filter-category__link
                    text-link--basic
                    font-h7
                "
                @click="setCategory"
            >
                {{ info.title }}
            </p>
            <div 
                class="catalog-filter-category__caller text-link--basic"
                :class="{
                    'catalog-filter-category__caller--shown': info.children?.length
                }"
                @click="called = !called"
            >
                <IconArrowDropUpLine />
            </div>
            
        </div>
        <div class="catalog-filter-category__children">
            <CatalogFilterCategoriesList 
                :list="info.children"
                @categories="emit('categories', $event)"
            />
        </div>
    </div>
</template>

<script setup>
    const props = defineProps({
        info: Object,
    })

    const emit = defineEmits(['categories']);

    const called = ref(false);

    const isActive = computed(()=>
        useFilters().filter?.selectedCategories?.[0] == props.info.id || 
        R().params?.categoryName == props.info.name
    );

    const setCategory = ()=>{
        emit('categories', useCategories().getTreeIds(props.info))
    }

    const collectIds = (obj) => {
        const ids = [];

        function recurse(currentNode) {
            ids.push(currentNode.id);

            if (currentNode.children && currentNode.children.length > 0) {
                for (const child of currentNode.children) {
                    recurse(child);
                }
            }
        }

        recurse(obj);

        return ids;
    }
</script>

<style lang="scss" scoped>
    .catalog-filter-category{
        --hov: var(--orange-100);

        &__head{
            @include flex-jtf;
            align-items: center;
            position: relative;

            &--active{
                color: var(--hov);

                &::after{
                    width: 100%!important;
                }
            }

            &::after{
                @include pseudo-absolute;
                bottom: 0;
                left: 0;
                width: 0%;
                height: .1rem;
                background: var(--hov);
                transition: .3s;
            }

            @media (hover: hover) {
                &:hover{
                    &:after{
                        width: 100%;
                    }
                }
            }
        }

        &__caller{
            // margin: .2rem 0;
            flex-shrink: 0;
            cursor: pointer;
            @include virtual-area(.5rem);


            &:not(&--shown){
                @include hidden(0);
            }

            .icon{
                transition: transform .3s;
            }
        }

        &__link{
            text-transform: uppercase;
            padding: 1rem 0;
            width: 100%;
        }

        &__children{
            padding-left: 2rem;
        }

        &:not(&--called){
            .catalog-filter-category{
                &__caller{
                    .icon{
                        transform: rotate(.25turn);
                    }
                }

                &__children{
                    display: none;
                }
            }
        }
    }
</style>