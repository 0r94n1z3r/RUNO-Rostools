<template>
    <div 
        class="search-drop"
        :class="{
            'search-drop--called': isCalled
        }"
        :transition-block="isCalled || null"
    >
        <SearchGlobalList />
    </div>
</template>

<script setup>
    const props = defineProps({
        called: Boolean
    })

    const isCalled = computed(() => 
        Boolean(
            props.called && 
            (
                useSearch().searchText?
                    (
                        useSearch().categories.length || 
                        useSearch().productsLoading || 
                        useSearch().products?.length
                    )
                : useSearch().history?.list?.length
            )
        )
    );
</script>

<style lang="scss" >

</style>

<style lang="scss" scoped>
    .search-drop{
        position: absolute;
        top: calc(100% + 1.8rem);
        @include shadow;
        padding: 1.2rem;
        border-radius: 1.2rem;
        background: var(--background, var(--c-surface-neutral-main));
        border: .1rem solid var(--border, var(--c-border-neutral-low));
        width: 100%;
        z-index: 10;

        backdrop-filter: blur(4rem);

        @include transition-bounce;

        max-height: calc(75 * var(--vh));
        overflow-y: auto;

        &:not(&--called){
            @include hidden(-1rem)
        }

        :deep(.search-card){
            gap: .8rem;
            background: var(--c-surface-neutral-low);

            @include hover{
                &:hover{
                    background: var(--c-surface-neutral-high);
                }
            }

            .search-card{
                &__image{
                    width: 6.4rem;
                }

                &__title{
                    @include font-h3--mob;
                    margin-bottom: .2rem;
                }

                &__category{
                    @include font-p4;
                    color: inherit;
                    opacity: .6;
                }

                &__button{
                    display: none;
                }
            }
        }
    }
</style>