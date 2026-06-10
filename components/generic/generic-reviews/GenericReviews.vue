<template>
    <InverseWrapper class="generic-reviews">
        <div class="content-wrapper">
            <SectionTitle class="generic-reviews__title" bullit="Отзывы" inverse>
                <span class="title-gray">Опыт наших клиентов</span><br/> подтверждает нашу надёжность
            </SectionTitle>

            <div class="generic-reviews__slider">
                <SwiperWr
                    slides-per-view="auto"
                >
                    <SwiperSlide v-for="i in 6" style="width: max-content" transition-block>
                        <div class="review">
                            <div class="review__header">
                                <div class="review__name">Игорь Петров</div>
                                <div class="review__title font-c2">директор компании «МеталлоКомплект»</div>
                            </div>
                            <p class="review__body">
                                Мы работаем с оборудованием REALREZ уже более двух лет, и могу сказать, что это было одно из лучших решений для нашего производства. Лазерные станки демонстрируют невероятную точность и надёжность, что особенно важно для наших задач.
                            </p>
                        </div>
                    </SwiperSlide>
                </SwiperWr>
            </div>
        </div>
    </InverseWrapper>
</template>

<script setup>
    import { animate, onScroll, stagger } from 'animejs';

    let anim;
    onMounted(()=>{
        const el = document.querySelector(".review");
        if (!el?.isConnected) return;
        anim = animate(".review", {
            translateY: [-200, 0],
            translateX: [100, 0],
            ease: 'easeInOut',
            opacity: [0, 1],
            delay: stagger(300),
            duration: 800,
            autoplay:  onScroll()
        })
    });
    // onBeforeUnmount(()=>anim?.revert?.());

</script>

<style lang="scss" scoped>
    .generic-reviews{
        padding-top: var(--content-pad);
        position: relative;
        padding-bottom: var(--content-pad);
        overflow: hidden;

        &__title{
            margin-bottom: 6.4rem;
        }

        :deep(.swiper){
            z-index: 1;
            overflow: visible;
        }

        .swiper-slide{
            &:not(:last-child){
                padding-right: 2rem;
            }
        }
    }

    .review{
        width: 54.4rem;
        height: 54rem;
        background: var(--c-surface-neutral-low-inverse);
        border-radius: 1.2rem;
        padding: 2.4rem;
        @include flex-col;
        color: var(--c-text-inverse);

        &__name{
            @include font-p2;
            font-weight: 500;
            margin-bottom: .6rem;
        }

        &__body{
            margin-top: auto;
        }
    }

    @include mobile(600px){
        .generic-reviews{
            overflow-x: hidden;
            .swiper-slide{
                &:not(:last-child){
                    padding-right: .8rem;
                }
            }
        }

        .review{
            width: 34.3rem;
            height: 40rem;

            &__name{
                @include font-p4;
            }

            &__title{
                @include font-c3;
            }
        }
    }
</style>