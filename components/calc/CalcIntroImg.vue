<template>
    <div class="calc-intro-img">
        <div class="calc-intro-img__image">
            <ParallaxWrapper z-shift="100">
                <img :src="image" transition-block/>
            </ParallaxWrapper>
        </div>

        <Card 
            class="calc-intro-img__card"
            type="dark"
            transition-block
        >
            <AnimText class="calc-intro-img__title">Рассчитайте стоимость ленточной пилы за 30 секунд</AnimText>
            <div class="calc-intro-img__content">
                <AnimText class="calc-intro-img__text">
                    Подберите подходящую пилу {{ category.title }} по параметрам резки и сразу получите итоговую стоимость.
                </AnimText>
                <AnimButton
                    type="accent"
                    @click="scrollToQuery('#calculator')"
                >
                    Рассчитать
                </AnimButton>
            </div>
        </Card>
    </div>
</template>

<script setup>
    import { IconArrowRightUpLine } from '#components';
    import image from './media/sq.webp'

    const props = defineProps({
        category: Object
    });
</script>

<style lang="scss" scoped>
    .calc-intro-img{
        --gap: var(--pad-o);

        padding: var(--gap);
        position: relative;

        &__image{
            display: block;
            border-radius: 1.2rem;
            overflow: hidden;

            img{
                display: block;
                max-width: 50.4rem;
                border-radius: 1.2rem;
            }
        }

        &__card{
            position: absolute;
            left: 0;
            right: 0;
            bottom: calc(2 * var(--gap));
        }

        &__title{
            padding-bottom: 1.2rem;
        }

        &__content{
            @include flex-jtf;
            align-items: end;
            gap: var(--gap);
            align-self: center;
        }

        &__text{
            @include font-p4;
            color: var(--c-text-inverse-secondary);
        }

        @include mobile(1120px){
            &__image{
                img{
                    max-width: 100%;
                }
            }
        }

        @include mobile{
            --gap: 0;

            &__image{
                border-radius: 1.2rem 1.2rem 0 0;

                img{
                    scale: 1.1;
                    border-radius: 0;
                }
            }

            &__card{
                border-radius: 0 0 1.2rem 1.2rem!important;
                position: relative;
                bottom: unset;
            }

            &__content{
                @include flex-col;
                gap: 1.2rem;

                .anim-button{
                    width: 100%;
                }
            }
        }
    }
</style>