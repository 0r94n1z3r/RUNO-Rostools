<template>
    <div class="cart-product">
        <a :href="`/product/${info?.name}`" class="seo-link">{{ info?.title }}</a>
        <a 
            ref="mediaRef"
            class="cart-product__image card-cover-container"
            :href="`/product/${info?.name}`"
            @click="handleTransition"
        >
            <ProdCardPhoto :="{info}" :has-parallax="false"/>
        </a>
        <div class="cart-product__container">
            <div class="cart-product__content-container">
                <div class="cart-product__texts-wr">
                    <a class="cart-product__title text-link-basic" :href="`/product/${info?.name}`" @click="handleTransition">{{ info?.title }}</a>
                    <p class="cart-product__category">{{ useCategories().category(info?.category_id)?.title }}</p>
                </div>
                <Button 
                    class="cart-product__remove-button"
                    :icon-left="IconCloseLine"
                    type="transparent-light"
                    @click="useCart().changeAmount(info, 0)"
                />
            </div>
            <div class="cart-product__content-container">
                <div class="cart-product__texts-wr">
                    <ProdCardPrice 
                        class="cart-product__price"
                        :="{info}"
                    />
                </div>
                <ProdCardButton :="{info}" :to-cart="false"/>
            </div>
        </div>
    </div>
</template>

<script setup>
    import { IconCloseLine } from '#components';

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
    .cart-product{
        --padding: 2.4rem;

        --cp-photo: 12.8rem;

        position: relative;
        display: flex;
        gap: 1.6rem;
        min-width: 0;
        padding-bottom: var(--padding);

        .prod-card-photo{
            width: var(--cp-photo);
            border: .1rem solid var(--c-border-neutral-main);
            border-radius: .6rem;
            cursor: pointer;
        }

        
        &:not(:first-child){
            padding-top: var(--padding);
            border-top: .1rem solid var(--c-border-neutral-main);
        }

        &__container{
            @include flex-col;
            justify-content: space-between;
            flex-grow: 1;
            min-width: 0;
        }

        &__content-container{
            @include flex-jtf;
            gap: .8rem;
            
            &:last-child{ 
                align-items: center;
            }
        }

        &__texts-wr{
            @include flex-col;
            justify-content: space-between;
            min-width: 0;
        }

        &__title{
            @include font-p2;
            font-weight: 500;
            transition: .3s;
            cursor: pointer;
            @include text-overflow;
        }

        &__category{
            color: var(--c-text-disabled);
            @include text-overflow;
        }

        :deep(.prod-card-price){
            .prod-card-price__price{
                &--current{
                    @include font-p2;
                    font-weight: 500;
                }

                &--old{
                    color: var(--c-text-disabled);
                    font-weight: 300;
                }
            }
        }

        @include mobile{
            --cp-photo: 8rem;
            --padding: 1.6rem;

            gap: 1.2rem;

            &__remove-button{
                display: none;
            }

            &__title{
                @include font-p3;
            }

            &__category{
                @include font-p5;
            }

            &__texts-wr{
                min-width: 10rem;
            }

            &__price{
                &--current{
                    @include font-p4;
                }

                &--old{
                    @include font-p5;
                }
            }

            :deep(){
                .prod-card-button{
                    &__button{
                        height: max-content;
                        align-self: center;
                    }
                }
            }
        }
    }
</style>