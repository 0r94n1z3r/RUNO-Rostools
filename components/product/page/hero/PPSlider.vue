<template>
    <ClientOnly>
        <SwiperWr
            v-model:slide="slide"
            :slides-per-view="1"
            loop
            :speed="800"
            class="pp-slider"
            :class="[
                fullscreen && 'pp-slider--fullscreen',
                !fullscreen && 'swiper--faded',
            ]"
            :modules="[SwiperKeyboard, SwiperZoom]"
            :keyboard="{enabled: fullscreen}"
            :zoom="fullscreen"
        >
            <SwiperSlide
                v-for="(i, idx) in images"
                :key="idx"
                @click.self="emit('click-outside')"
            >
                <div class="swiper-zoom-container">
                    <PPHeroImage
                        :src="i.url" 
                        :z-shift="fullscreen?0:300"
                        @click="emit('fullscreen', slide)"
                    />
                </div>
            </SwiperSlide>
        </SwiperWr>
        <SliderArrows v-if="images?.length > 1" v-model:slide="slide" class="desk-visible"/>
    </ClientOnly>
</template>

<script setup>
    const props = defineProps({
        images: Array,
        fullscreen: Boolean
    });

    const slide = defineModel(0);

    const emit = defineEmits(['fullscreen', 'click-outside']);
</script>

<style lang="scss">
    .pp-slider{
        width: 100%;

        user-select: none;
        --gap: 2rem;
        --background: var(--c-surface-neutral-secondary);
        --swiper-wrapper-transition-timing-function: cubic-bezier(0.28, 1.3, 0.17, 1);

        .swiper-slide{
            height: auto;
            @include flex-c;
            width: 100%;
        }
        
        &--fullscreen{
            .pp-hero-image{
                width: fit-content;
                height: auto;
                min-height: unset;
                padding: 0;
                transform: none;
                img{
                    max-width: 100%!important;
                }
            }

            .parallax-wrapper{
                background: var(--c-surface-neutral-secondary);
                width: fit-content;
                border-radius: 2.4rem;

                img{
                    margin: 0;
                }
            }
        }
    }

    @include mob-display(750px);
</style>