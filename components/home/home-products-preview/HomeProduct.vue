<template>
    <div class="home-product content-wrapper-out">
        <div class="home-product__block">
            <div class="home-product__wrapper content-wrapper-in">
                <div class="home-product__content">
                    <div class="home-product__title">
                        <h3 transition-block>{{ info.title }}</h3>
                        <!-- <p transition-block>
                            {{ info.short_description }}
                        </p> -->
                        <!-- <Button type="transparent-light" transition-block>Техническая документация.PDF</Button> notdone -->
                    </div>
                    <div class="home-product__image-wr">
                        <div class="home-product__image mob-visible">
                            <ParallaxWrapper>
                                <img :src="info.images?.[0]?.url" alt="">
                            </ParallaxWrapper>
                        </div>
                        <p class="home-product__sub" transition-block>
                            {{ info.short_description }}
                        </p>
                    </div>
                    <div class="home-product__description">
                        <div class="home-product__buttons" transition-block>
                            <a :href="`/product/${info?.name}`" class="seo-link">{{ info?.title }}</a>
                            <a :href="`/product/${info?.name}`" @click="handleTransition">
                                <Button>Подробнее</Button>
                            </a>
                            <ProdCardButton :="{info}" />
                        </div>
                    </div>
                </div>
                <div ref="mediaRef" class="home-product__image desk-visible">
                    <ParallaxWrapper>
                        <img :src="info.images?.[0]?.url" alt="">
                    </ParallaxWrapper>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
    const props = defineProps({
        info: Object
    });

//transition
    const mediaRef = ref();

    const handleTransition = (e) => {
        if (e.ctrlKey || e.metaKey || e.shiftKey || e.altKey || e.button !== 0)return;
        e.preventDefault();

        const {x,y,width,height} = mediaRef.value.getBoundingClientRect();
        useProdTransition().transit(props.info,x,y,width,height);
    }
</script>

<style lang="scss" scoped>
    .home-product{

        &__block{
            background: var(--c-white-secondary);
            border-radius: .6rem;
            overflow: hidden;
        }

        &__wrapper{
            display: flex;
        }

        &__content{
            padding: 9.6rem 0;
            @include flex-col;
            height: calc(40.8rem + 9.6rem * 2);
            max-width: 48rem;
            position: relative;
            z-index: 2;
        }

        &__title{
            h3{
                @include font-h2;
                margin-bottom: 1.2rem;
            }

            p{
                color: var(--c-text-secondary);
            }
        }

        &__description{
            margin-top: auto;
            max-width: 40rem;

        }

        &__sub{
            color: var(--c-text-secondary);
        }

        &__buttons{
            margin-top: 2.4rem;
            display: grid;
            grid-template-columns: 1fr 1fr;
            gap: .8rem;

            .button{
                width: 100%;
            }
        }

        &__image{
            width: 63.6rem;
            padding: 9.6rem 0;
            margin-left: auto;
            position: relative;

            .parallax-wrapper{
                width: 100%;
                height: 100%;
            }

            img{
                position: absolute;
                width: 90rem;
                max-height: calc(100% + 4.9rem);
                object-fit: contain;
                pointer-events: none;
            }
        }

        @include nav-mobile{
            &__image{
                width: calc(100%);
                
                img{
                    width: 120%;
                    top: 0;
                    bottom: 0;
                    margin: auto;
                }
            }
        }

        @include mob-display(800px);

        @include mobile(800px){
            &__wrapper{
                padding: 0;
            }

            &__content{
                height: auto;
                max-width: unset;
                width: 100%;
                padding: 2.4rem;
            }

            &__description{
                max-width: unset;
                width: 100%;
            }

            &__image-wr{
                width: 100%;
                max-width: 40rem;
                margin: 0 auto;
            }

            &__image{
                width: 100%;
                margin: 0;
                padding: 0;
                padding-bottom: 110%;

                .parallax-wrapper{
                    position: absolute;
                    top: 0;
                    left: 0;
                }

                img{
                    width: 90%;
                    right: 0;
                    left: 0;
                    margin: auto;
                }
            }
        }

        @include mobile{
            text-align: center;

            &__title{
                h3{
                    @include font-h2--mob;
                }

                @include flex-col;
                align-items: center;
            }
        }

    }
</style>