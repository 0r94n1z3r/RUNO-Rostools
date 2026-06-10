<template>
    <MediaContentContainer 
        class="category-description header-state-dark"
        :src="info?.description?.image?.url || tempImg"
        :backup-src="info?.description?.image?.url || tempImg"
    >
        <SectionTitle 
            class="category-description__title"
            :bullit="info?.description?.title ? info?.title : ''"
            inverse
        >
            <!-- notdone [API] -->
            {{ info?.description?.title || info?.title}}
        </SectionTitle>
        <div class="category-description__descriptions">
            <AnimText class="category-description__description">
                <ParsedHTML :html="info?.description?.text"/>
            </AnimText>
        </div>
    </MediaContentContainer>
</template>

<script setup>
    import tempImg from './temp/description.png'

    const props = defineProps({
        info: Object
    });
</script>

<style lang="scss" scoped>
    .category-description{
        &__title{
            margin-bottom: 6rem;
        }

        &__descriptions{
            color: var(--c-text-inverse);
        }

        @include mobile(640px){
            &__title{
                margin-bottom: 2.4rem;

                :deep(h2){
                    @include font-h1--mob;
                }
            }
        }
    }
</style>