<template>
    <div 
        class="card-cover"
        :class="{ 'card-cover--loose': loose }"
    >
        <div class="card-cover__container">
            <ParallaxWrapper :z-shift="hasParallax?100:0">
                <img :src="srcSafe" alt="" class="card-cover__img">
            </ParallaxWrapper>
        </div>
    </div>
</template>

<script setup>
    import { normalizeAssetSrc } from '@/helpers/normalizeAssetSrc.js';

    const requestURL = useRequestURL();

    const props = defineProps({
        src: [Object, String],
        hasParallax: {
            type: Boolean,
            default: true
        },
        loose: Boolean
    });

    const srcSafe = computed(() =>
        normalizeAssetSrc(props.src, requestURL.origin)
    );
</script>

<style lang="scss">
    .card-cover-container:hover .card-cover{
        scale: 1.03;

        img{
            scale:  var(--cover-scale-hov, 1.1);
        }
    }

    a:active{
        .card-cover{
            scale: 1;

            img{
                scale: var(--cover-scale-act, 1.2);
            }
        }
    }
</style>

<style lang="scss" scoped>
    .card-cover{
        width: 100%;
        padding-bottom: 100%;
        overflow: hidden;
        border-radius: .6rem;
        display: block;
        position: relative;
        @include transition-bounce;

        &__container{
            position: absolute;
            left: 0;
            top: 0;
            width: 100%;
            height: 100%;

            img{
                border-radius: .8rem;
                display: block;
                width: 100%;
                height: 100%;
                object-fit: cover;
                scale: var(--cover-scale, 1.2);
                @include transition-bounce;
            }
        }

        &--loose{
            .card-cover__container img{
                object-fit: unset;
                width: unset;
                height: unset;
                max-width: 100%;
                max-height: 100%;
            }
        }
    }
</style>