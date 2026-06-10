<template>
    <div class="home-materials-slider">
        <div class="home-materials-slider__wrapper content-wrapper">
            <div class="home-materials-slider__content">
                <MaterialsSliderTracker
                    :list="data"
                    :slide="slide"
                    :progress="progress"
                    @clicked="slide = $event"
                />
                <div :key="dataShow.title" class="home-materials-slider__text">
                    <AnimText v-model:reset="reset" component="h2" class="home-materials-slider__title" duration="500" transition-block>
                        {{dataShow.title}}
                    </AnimText>
                    <div class="home-materials-slider__options">
                        <div v-for="i in dataShow.options" class="home-materials-slider__option">
                            <AnimText v-model:reset="reset" :delay="100" component="h3" duration="500" transition-block>{{ i.title }}</AnimText>
                            <div v-for="v in i.values" class="home-materials-slider__values" transition-block>
                                <AnimText v-model:reset="reset" :delay="200" duration="500" @reset="handleReset">
                                    {{ v }}
                                </AnimText>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="home-materials-slider__slider">
                <SwiperWr 
                    v-model:slide="slide"
                    v-model:timeout-progress="progress"
                    
                    loop
                    :autoplay="{
                        delay: 4000,
                        disableOnInteraction: false,
                        pauseOnMouseEnter: false,
                        running: true
                    }"
                    :slide-to-speed="0"

                    :modules="[SwiperAutoplay]"

                    @swiper="initSwiper"
                >
                    <SwiperSlide v-for="i in data" :key="i.title">
                        <div class="home-materials-slider__slide">
                            <ParallaxWrapper>
                                <Image :src="i.image" ratio="1"/>
                            </ParallaxWrapper>
                        </div>
                    </SwiperSlide>
                </SwiperWr>
            </div>
        </div>
    </div>
</template>

<script setup>
    import data from './data/data.js';

    const swiper = ref();
    const initSwiper = (sw) => swiper.value = sw;

    const slide = ref();

    const progress = ref(0);

//text-slide
    const reset = ref(false);

    const dataShow = ref(data[0]);

    watch(slide, async(n,o)=>{
        if(o == undefined || n == o)return;
        reset.value = true;
    })

    const handleReset = () => {
        dataShow.value = data[slide.value];
    }

</script>

<style lang="scss" scoped>
    .home-materials-slider{
        height: 90rem;
        overflow: hidden;

        &__wrapper{
            height: 100%;
            position: relative;
        }

        &__content{
            color: var(--c-text-inverse);
            @include flex-col;
            justify-content: space-between;
            padding: 12rem 0;
            position: relative;
            pointer-events: none;
            z-index: 2;
            height: 100%;
            width: 100%;
            max-width: 59rem;
            flex-shrink: 0;

            &>*{
                pointer-events: all;
            }
        }

        &__title{
            @include font-h1;
            margin-bottom: 3.2rem;
        }

        &__options{
            @include flex-col;
            gap: 2.4rem;

            h3{
                @include font-p3;
                color: var(--c-text-inverse-secondary);
                margin-bottom: .8rem;
            }
        }

        &__values{
            p{
                @include font-c1;
            }
        }

        &__slider{
            position: absolute;
            left: 0;
            top: 0;
            width: 100%;
            height: 100%;

            :deep(.swiper){
                height: 100%;
                overflow: visible;

                .swiper-slide:not(.swiper-slide-active){
                    .home-materials-slider__slide{
                        .image{
                            opacity: 0;
                            transform: translateX(-35%);
                        }
                    }
                }

                .swiper-slide-prev{
                    .image{
                        transform: translateX(35%)!important;
                    }
                }
            }
        }

        &__slide{
            display: flex;
            justify-content: end;
            align-items: center;
            height: 100%;

            .parallax-wrapper{
                width: auto;
                height: auto;
            }

            .image{
                width: 82rem;
                transition: .55s;
            }
        }

        @include nav-mobile{
            &__slide{
                .image{
                    margin-right: -10rem;
                }
            }
        }

        @include mobile(1000px){
            &__slide{
                .image{
                    margin-right: -20rem;
                }
            }
        }

        @include mobile{
            &__content{
                padding: 6.4rem 0;
            }

            &__title{
                @include font-h1--mob;
            }

            &__values{
                p{
                    @include font-c2;
                }
            }

            &__slide{
                height: 100vw;
                margin-top: 8rem;

                .image{
                    width: 100vw;
                    margin: 0;
                }
            }

            
        }
    }
</style>