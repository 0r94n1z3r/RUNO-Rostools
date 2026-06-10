<template>
    <div class="prod-card-price">
        <p class="prod-card-price__price prod-card-price__price--current">
            {{ pricify(price?.price) }} ₽
        </p>
        <p v-if="price.discount" class="prod-card-price__price prod-card-price__price--old">
            <span>{{ pricify(price?.priceBefore) }} ₽</span> [{{ price.discount }}%]
        </p>
    </div>
</template>

<script setup>
    const props = defineProps({
        info: Object
    });

    const price = computed(() => useCatalog().getPrice(props.info));
</script>

<style lang="scss" scoped>
    .prod-card-price{
        // @include flex-col;
        flex-wrap: wrap;
        display: flex;
        align-items: baseline;
        gap: .2rem .8rem;

        &__price{
            white-space: nowrap;

            &--current{
                @include font-p2;
            }
            &--old{
                @include font-p4;
                font-weight: 300;
                color: var(--c-text-disabled);

                span{
                    text-decoration: line-through;
                }
            }
        }
    }
</style>