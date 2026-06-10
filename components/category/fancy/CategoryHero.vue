<template>
    <InverseWrapper class="category-hero">
        <div class="category-hero__container content-wrapper">
            <SectionTitle 
                class="category-hero__title"
                :bullit="info.hero_title?info.title:''"
                :bullit-component="info.hero_title ? 'h1' : 'p'"
                :title-component="info.hero_title ? 'h2' : 'h1'"
                inverse
            >
                {{ info.hero_title || info.title}}
            </SectionTitle>
            <AnimText class="category-hero__description" transition-block>
                {{ info.hero_description }}
            </AnimText>
            <AnimButton 
                type="light"
                class="category-hero__button" 
                transition-block
                @click="scrollToQuery('#category-catalog')"
            >
                Каталог оборудования
            </AnimButton>
        </div>
    </InverseWrapper>
</template>

<script setup>
    const props = defineProps({
        info: Object
    });
</script>

<style lang="scss" scoped>
    .category-hero{
        min-height: 64rem;
        padding-bottom: 6.4rem;

        @include flex-col;
        justify-content: end;

        &__title{
            margin-bottom: 1.6rem;

            :deep(.bullit){
                color: var(--c-text-inverse-secondary)
            }
        }

        &__description{
            max-width: 67.7rem;
            margin-bottom: 2.4rem;
            @include font-p2;
            color: var(--c-text-inverse-secondary);
        }

        @include mobile{
            padding-bottom: 2.4rem;

            &__description{
                color: var(--c-text-inverse);
            }

            &__button{
                width: 100%;
            }
        }

    }
</style>