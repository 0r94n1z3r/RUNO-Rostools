<template>
    <Card 
        class="search-card" 
        type="white"
        transition-block
        :to="to"
        :is-a="product"
        @mouseenter="hover = true"
        @mouseleave="hover = false"
        @click="product && handleTransition($event)"
    >
        <div 
            ref="mediaRef"
            class="search-card__image-wr"
        >
            <Image class="search-card__image" :src="image" :ratio="1" />
        </div>
        <div class="search-card__content">
            <div class="search-card__title">
                {{ title }}
            </div>
            <div v-if="subtitle" class="search-card__category">
                {{ subtitle }}
            </div>
        </div>
        <Button
            class="search-card__button"
            type="transparent-light"
            :icon-left="IconArrowRightUpLine"
            :hover="hover"
        />
    </Card>
</template>

<script setup>
    import { IconArrowRightUpLine } from '#components';

    const props = defineProps({
        title: String,
        subtitle: String,
        image: [Object, String],
        type: String,
        to: [String, Object],
        product: Object
    });

    const hover = ref();

    //transition
        const mediaRef = ref();

        const handleTransition = (e) => {
            if (e.ctrlKey || e.metaKey || e.shiftKey || e.altKey || e.button !== 0)return;
            e.preventDefault();

            console.log(props.product.name, R().params.productName);

            if(props.product.name == R().params.productName)return;

            const {x,y,width,height} = mediaRef.value.getBoundingClientRect();
            useProdTransition().transit(props.product,x,y,width,height);
        }
</script>

<style lang="scss" scoped>
    .search-card{
        display: flex;
        align-items: center;
        gap: 1.6rem;
        transition: .3s;
        background: transparent;

        &__image{
            width: 10.6rem;
            border-radius: .6rem;
            background: var(--c-surface-neutral-secondary);
        }

        &__content{
            min-width: 0;
        }

        &__title{
            margin-bottom: .8rem;
            @include text-overflow;
            @include font-h4;
        }

        &__category{
            color: var(--c-text-secondary);
            @include text-overflow;
            @include font-p2;
        }

        &__button{
            margin-left: auto;
        }

        @include mobile{
            gap: .8rem;

            &__image{
                width: 6.4rem;
            }

            &__title{
                @include font-h3--mob;
                margin-bottom: .2rem;
            }

            &__category{
                @include font-p4;
            }
        }
    }
</style>