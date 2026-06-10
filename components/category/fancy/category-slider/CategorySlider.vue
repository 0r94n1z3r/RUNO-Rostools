<template>
    <div class="category-slider content-wrapper">
        <SectionTitle
            class="category-slider__title"
            bullit="Отрасли применения"
        >
            Применение <span nobr>в различных</span> отраслях
        </SectionTitle>

        <div class="category-slider__wrapper">
            <div class="category-slider__content desk-visible">
                <div class="category-slider-tabs">
                    <div
                        v-for="(i,k) in data" 
                        class="category-slider-tabs__tab"
                        :class="{'category-slider-tabs__tab--active': k == slide}" 
                        @click="slide = k"
                    >
                        <p>{{ i.title }}</p>
                    </div>
                </div>

                <div class="category-slider-texts">
                    <div 
                        v-for="(i,k) in data" 
                        class="category-slider-texts__block" 
                        :class="{'category-slider-texts__block--active': k == slide}"
                    >
                        <AnimText class="category-slider-texts__title" duration="400" component="h3">{{ i.title }}</AnimText>
                        <AnimText class="category-slider-texts__description" duration="400">{{ i.description }}</AnimText>
                    </div>
                </div>
            </div>

            <ScaleSlider 
                v-model:slide="slide"
                class="category-slider-images"
                :images="data.map(e => e.image.url)"
                pagination
            />

            <div class="category-slider__content-mob mob-visible">
                <div class="category-slider-mob-tabs">
                    <SwiperWr
                        v-model:slide="tabsSlide"
                        slides-per-view="auto"
                    >
                        <SwiperSlide v-for="(i,k) in data" :key="i.title" style="width: fit-content;">
                            <div 
                                class="category-slider-tabs__tab"
                                :class="{'category-slider-tabs__tab--active': k == slide}" 
                                @click="slide = k"
                            >
                                <p>{{ i.title }}</p>
                            </div>
                        </SwiperSlide>
                    </SwiperWr>
                </div>

                <SwiperWr 
                    v-model:slide="slide"
                    class="category-slider-mob-texts"
                    loop
                    auto-height
                >
                    <SwiperSlide v-for="(i,k) in data" :key="i.title">
                        <h3 class="category-slider-texts__title">{{ i.title }}</h3>
                        <p class="category-slider-texts__description">{{ i.description }}</p>
                    </SwiperSlide>
                </SwiperWr>
            </div>


        </div>
    </div>
</template>

<script setup>
    const props = defineProps({
        info: Object
    });

    const data = computed(()=> props.info?.applications?.filter(e => e.publish) || []);

    const slide = ref(0);

    const tabsSlide = ref(0);
    watch(slide, (n)=>{
        tabsSlide.value = n;
    })
</script>

<style lang="scss" scoped>
    .category-slider{
        &__title{
            margin-bottom: 6.4rem;
            
            @include mobile{
                margin-bottom: 3.2rem;
            }
        }

        &__wrapper{
            @include grid(1fr 1fr, 2rem);
        }

        &__content{
            @include flex-col;
            justify-content: space-between;
        }

        :deep(.swiper){
            width: 100%;
            height: 100%;
        }

        .category-slider-tabs{
            --mark: transparent;
            --mark-size: 100%;

            &__tab{
                transition: .3s;
                padding: 1.2rem;
                width: fit-content;
                cursor: pointer;
                position: relative;
                user-select: none;

                border: solid var(--c-border-neutral-med);
                border-width: 0 0 0 .2rem;

                &::before{
                    @include pseudo-absolute;
                    top: 0;
                    bottom: 0;
                    left: -.2rem;
                    width: .2rem;
                    background: var(--mark);
                    @include transition-bounce;
                    height: var(--mark-size);
                    margin: auto;
                }

                &--active{
                    --mark: var(--c-border-accent-main)!important;
                    &::before{
                        --mark-size: 100%!important;
                    }
                }

                &:not(&--active){
                    color: var(--c-text-disabled);
                }

                @include hover {
                    &:hover{
                        --mark: var(--c-border-accent-high);
                    }

                    &:not(:hover){
                        &::before{
                            --mark-size: 0;
                        }
                    }
                }

                &:active{
                    &::before{
                        --mark-size: 50%;
                    }
                }
            }
        }

        .category-slider-texts{
            position: relative;

            &__block{
                position: absolute;
                bottom: 0;
                @include transition-bounce;

                &:not(&--active){
                    pointer-events: 0;
                    @include hidden(3.2rem);
                }
            }

            &__title{
                margin-bottom: 1.6rem;
            }

            &__description{
                color: var(--c-text-secondary);
            }
        }

        :deep(.scale-slider){
            height: 48rem;
            border-radius: 1.2rem;
            background: var(--c-surface-neutral-secondary);
        }

        @include mob-display(700px);

        @include mobile(700px){
            &__wrapper{
                @include grid(1fr, 3rem);
                width: calc(100vw - var(--pad) * 2);
            }

            .category-slider-images{
                height: 38rem;
            }

            .category-slider-mob-tabs{
                margin-bottom: 3rem;
            }

            :deep(.category-slider-images),
            :deep(.category-slider-mob-tabs),
            :deep(.category-slider-mob-texts)
            {
                width: calc(100vw - var(--pad) * 2);
            }

            .category-slider-tabs__tab{
                border-left-width: 0;
                border-bottom-width: .2rem;

                &::before{
                    width: var(--mark-size);
                    height: .2rem;
                    bottom: -.2rem;
                    left: 0;
                    right: 0;
                    margin: auto;
                    top: unset;
                }
            }
        }
    }
</style>