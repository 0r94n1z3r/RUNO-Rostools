<template>
    <Card
        class="order-item-product"
    >
        <div class="order-item-product__image-wr">
            <div 
                :ref="e => refs[1][k] = e"
                class="order-item__anchor"
                :style="{ width: states?.[0]?.[0]?.width + 'px' }"
            ></div>
        </div>
        <div class="order-item-product__content">
            <div class="order-item-product__texts">
                <p class="order-item-product__title">{{info.title}}</p>
                <!-- notdone [API] (???) <p class="order-item-product__category">{{ useCategories().category(info.category_id)?.title }}</p> -->
                <p class="order-item-product__category">{{ info.article }}</p>
            </div>
            <div class="order-item-product__texts order-item-product__price-wr">
                <p class="order-item-product__price">{{pricify(price.price)}} ₽</p>
                <p class="order-item-product__amount"><span class="desk-visible">Кол-во: </span>{{ info.count }} шт.</p>
            </div>
        </div>
    </Card>
</template>

<script setup>
    const props = defineProps({
        info: Object,
        states: Array,
        k: Number
    });

    const refs = defineModel('refs', []);

    const price = computed(() => useCatalog().getPrice(props.info));
</script>

<style lang="scss" scoped>
    .order-item-product{
        display: flex;
        align-items: center;
        gap: 1.6rem;
        width: 100%;
        @include transition-bounce;
        will-change: opacity;

        &:not(:first-child){
            border-top-left-radius: 0;
            border-top-right-radius: 0;
        }

        &:not(:last-child){
            border-bottom: .1rem solid var(--c-border-neutral-main);
            border-bottom-left-radius: 0;
            border-bottom-right-radius: 0;
        }

        &__content{
            width: 100%;
            @include flex-jtf;
            min-width: 0;
            @include transition-bounce;
            will-change: scale;
        }

        &__texts{
            min-width: 0;

            p{
                @include desktop(700px){
                    &:first-child{
                        @include font-p2;
                        font-weight: 600;
                        margin-bottom: .4rem;
                        white-space: nowrap;
                    }
                }

                &:last-child{
                    color: var(--c-text-disabled);
                }
            }
        }

        &__price-wr{
            flex-shrink: 0;
        }

        &__title{
            @include text-overflow;
        }

        @include mob-display(700px);

        @include mobile(700px){
            --padding: 0;
            --background: transparent;

            @include padding-y(1.6rem);
            align-items: stretch;

            &:first-child{
                border-radius: 0;
                border-top: .1rem solid var(--c-border-neutral-main);
            }

            &__content{
                flex-direction: column;
                @include flex-jtf;
            }

            &__title{
                @include font-p3;
                font-weight: 500;
            }

            &__category{
                @include font-p5;;
            }  

            &__texts{
                p:last-child{
                    color: var(--c-text-secondary);
                }
            } 

            &__price-wr{
                display: flex;
                gap: .4rem;
                white-space: nowrap;
                @include font-p4;
            } 
        }
    }
</style>