<template>
    <div 
        class="scale-slider"
        :class="{
            'scale-slider--drag': isDrag,
            'scale-slider--scrollable': images.length > 1
        }"
    >
        <SwiperWr 
            :key="images[0]"

            v-model:slide="slide"

            :modules="[SwiperPagination]"

            :pagination="
                pagination && 
                {
                    dynamicBullets: false,
                    clickable: true
                }
            "

            loop

            @touch-start="isTouch = true;isDrag = true"

            @transition-start="isDrag = true"
            @touch-end="isTouch = false;isDrag = false"

            @transition-end="()=>{if(!isTouch)isDrag = false}"
        >
            <SwiperSlide v-for="i in images" :key="i.title" >
                <div class="scale-slider__img-wrapper">
                    <ParallaxWrapper :z-shift="100">
                        <img :key="i" :src="normalizeAssetSrc(i)" alt="" class="scale-slider__img"/>
                    </ParallaxWrapper>
                </div>
            </SwiperSlide>
        </SwiperWr>
        <SliderArrows 
            v-if="arrows && images.length > 1"
            v-model:slide="slide"
        />
    </div>
</template>

<script setup>
    const props = defineProps({
        images: Array,
        pagination: Boolean,
        arrows: Boolean
    });

    const slide = defineModel('slide', 0)

    const isDrag = ref(false);
    const isTouch = ref(false);
</script>

<style lang="scss" scoped>
    :deep(.swiper-pagination){
        --swiper-pagination-bottom: 2.2rem;
        --swiper-pagination-bullet-inactive-opacity: 1;
        --swiper-pagination-bullet-inactive-color: var(--c-surface-neutral-secondary)
    }

    .scale-slider{
        overflow: hidden;

        :deep(.swiper) {
            height: 100%;
        }

        :deep(.swiper-slide) {
            width: 100%;
            height: 100%;

            &.swiper-slide-active{
                z-index: 2;
            }
        }

        &--drag.scale-slider--scrollable{
            .scale-slider{
                &__img{
                    transform: scale(0.85);
                }
            }
        }

        &__img-wrapper{
            width: 100%;
            height: 100%;
        }

        &__img{
            position: absolute;
            display: block;
            width: 100%;
            height: 100%;
            object-fit: cover;
            transform: scale(1.08);
            border-radius: 1.2rem;
            @include transition-bounce;
        }

        @include hover{
            .slider-arrows{
                @include transition-bounce;
                // transition: .3s;
            }

            &:not(:hover){
                .slider-arrows{
                    opacity: 0;
                    transform: scale(1.2);
                }
            }
        }
    }
</style>