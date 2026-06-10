<template>
    <div class="page-banner header-state-dark">
        <div class="page-banner__image">
            <ParallaxWrapper>
                <img :src="image" alt="">
            </ParallaxWrapper>
        </div>
        <div class="content-wrapper page-banner__container">
            <SectionTitle 
                inverse
                title-component="h1"
                :="{bullit}"
                transition-block
            >
                {{title}}
            </SectionTitle>
            <AnimText class="page-banner__description" :delay="200" transition-block>{{ description }}</AnimText>
            <slot />
        </div>
    </div>
</template>

<script setup>
    const props = defineProps({
        title: String,
        bullit: String,
        description: String,
        image: [Object, String]
    });
</script>

<style lang="scss" scoped>
    .page-banner{
        --gap: 1.6rem;

        height: 100vh;
        width: 100%;
        min-height: fit-content;
        position: relative;
        @include padding-y(var(--content-pad));
        color: var(--c-text-inverse);
        background: var(--c-surface-neutral-main);
        overflow: hidden;


        &__image{
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;

            img{
                display: block;
                width: 100%;
                height: 100%;
                object-fit: cover;
            }
        }

        &::before{
            @include pseudo-absolute;
            @include all-directions(0);
            background: rgba(0,0,0,.4);
            z-index: 1;
        }

        &__container{
            height: 100%;
            @include flex-col;
            justify-content: end;
            gap: var(--gap);
            position: relative;
            z-index: 2;
        }

        &__description{
            margin-bottom: var(--gap);
        }

        @include desktop{
            &__description{
                @include font-p2;
            }
        }

        @include mobile{
            --gap: 1.2rem;
            
            :deep(h1){
                @include font-h1--mob;
            }
        }
    }
</style>