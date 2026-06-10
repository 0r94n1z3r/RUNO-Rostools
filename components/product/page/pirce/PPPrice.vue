<template>
    <div 
        v-if="info"
        class="pp-price content-wrapper-out"
        :class="{'pp-price--full': isFull}"
    >
        <div class="pp-price__container" transition-block @click="isFull = !isFull">
            <div class="pp-price__content">
                <div class="pp-price-price">
                    <p class="pp-price-price__title">
                        <span v-if="price?.discount" class="pp-price-price__discounted">от {{pricify(price?.priceBefore)}} ₽</span>
                        <span v-else>Стоимость</span>
                    </p>
                    <div class="pp-price-price__price-wr">
                        <AnimText v-if="price.price" class="pp-price-price__price" autoplay="immediate" duration="300">
                            <span class="desk-visible">от</span> {{ pricify(price.price) }} ₽
                        </AnimText>
                        <ProdCardStatus class="desk-visible pp-price__status" :="{info}"/>
                    </div>
                </div>
                <div class="pp-price__buttons">
                    <ProdCardButton type="light" :="{info}" icon-button-type="transparent-dark"/>
                    <FavButton 
                        type="transparent-dark"
                        :="{info}" 
                    />
                </div>
            </div>

            <div class="pp-price-preview desk-visible">

                <Image 
                    class="pp-price-preview__image"
                    :ratio="1"
                    :src="info?.images?.[0]?.url || '/no-photo.svg'"
                />

                <div class="pp-price-preview__content">
                    <p class="pp-price-preview__title">{{ useCategories().category(info?.category_id)?.title }}</p>
                    <p class="pp-price-preview__name">{{ info.title }}</p>
                </div>
            </div>
        </div>

        
    </div>
</template>

<script setup>
    const props = defineProps({
        info: Object
    });

    const { y } = useWindowScroll();
    const scrollBound = ref(false);
    onMounted(() => {
        scrollBound.value = true;
    });

    const isFull = computed(() => scrollBound.value && y.value > 200);

    const price = computed(() => useCatalog().getPrice(props.info));
</script>

<style lang="scss" scoped>
    .pp-price{
        --p-w: 36rem;
        --p-h: 15.2rem;
        --p-pad: 1.6rem;

        position: sticky;
        bottom: var(--pad-o);
        z-index: 8;
        pointer-events: none;
        padding-top: calc(0.5 * var(--content-pad));
        display: flex;
        justify-content: end;

        &__container{
            padding: var(--p-pad);
            background: var(--c-surface-neutral-main);
            border-radius: 1.2rem;
            width: fit-content;
            pointer-events: all;
            width: var(--p-w);
            height: var(--p-h);
            position: relative;
            display: flex;
            justify-content: end;
            overflow: hidden;
            transform: translateZ(0);
            
            @include transition-bounce();
            will-change: width, height;
        }

        &__content{
            width: 100%;
            position: relative;
            height: 100%;
            display: flex; 
            align-items: end;
            max-width: calc(36rem - var(--p-pad) * 2);
            will-change: width, height;
        }

        .pp-price-price{
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            @include transition-bounce();
            will-change: transform;

            &__title{
                @include font-p3;
                color: var(--c-text-inverse-secondary);
                margin-bottom: .8rem;
            }

            &__discounted{
                text-decoration: line-through;
            }
            
            &__price-wr{
                @include flex-jtf;
                align-items: center;
            }

            &__price{
                @include font-h3;
                @include transition-bounce();
                color: var(--c-text-inverse);
                will-change: font;
            }
        }

        &__status{
            --status-h: 3.6rem;
            --status-pad: 1.4rem;
            @include transition-bounce();
            will-change: margin;

            :deep(.badge){
                @include transition-bounce();
                height: var(--status-h);
                padding: 0 var(--status-pad);
                will-change: height, padding;
            }
        }

        &__buttons{
            display: flex;
            gap: .8rem;
            width: 100%;

            .button{
                &:first-child{
                    width: calc(100% - 4.4rem - .8rem);
                }
            }

            :deep(.prod-card-button){
                width: 100%;

                .prod-card-button__button{
                    background: var(--c-surface-neutral-low-inverse);
                    color: var(--c-text-inverse);

                    .button{
                        color: var(--c-text-inverse);
                    }
                }
            }
        }

        .pp-price-preview{
            position: absolute;
            left: var(--p-pad);
            bottom: var(--p-pad);
            display: flex;
            align-items: center;
            gap: 1.6rem;
            width: calc(100% - 70rem);
            @include transition-bounce();

            &__content{
                min-width: 0;
                
            }

            &__image{
                width: 4.4rem;
                border-radius: .6rem;
                background: var(--c-surface-neutral-secondary);
                overflow: hidden;
            }

            &__title{
                color: var(--c-text-inverse-secondary);
                margin-bottom: .4rem;
            }

            &__name{
                color: var(--c-text-inverse);
                @include font-p2;
                font-weight: 500;
            }

            &__title,
            &__name{
                @include text-overflow;
                white-space: nowrap;
            }
        }

        &--full{
            --p-w: 100%;
            --p-h: 7.6rem;

            .pp-price-price{
                transform: translateX(calc(-100% - .8rem));
                width: 80%;

                &__title{
                    margin-bottom: .2rem; 
                }

                &__price{
                    @include font-p2;
                    white-space: nowrap;
                    font-weight: 600;
                    transition-delay: 0s;
                }
            }

            .pp-price__status{
                margin-top: -2.2rem;
                --status-h: 4.4rem;
                --status-pad: 2rem;
            }
        }

        &:not(&--full){
            .pp-price-preview{
                opacity: 0;
                left: -10rem;
            }

            .pp-price-price{
                &__price{
                    transition-delay: .4s;
                }
            }
        }

        @include mobile(1000px){
            --p-w: 100%;
            --p-h: 6.8rem;
            --p-pad: 1.2rem;

            &__content{
                position: static;
                max-width: 18.9rem;
            }

            .pp-price-price{
                left: 0;
                transform: none;
                top: var(--p-pad);
                left: var(--p-pad);

                &__title{
                    margin-bottom: .2rem; 
                }

                &__price{
                    @include font-p2;
                    font-weight: 500
                }

            }
        }
    }

    @include mob-display(1000px);

    
</style>