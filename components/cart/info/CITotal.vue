<template>
    <Card class="ci-total">
        <p class="ci-total__title">{{ useCart().getLength(list) }} {{ pluralizeWord(['товар','товара','товаров'], useCart().getLength(list)) }}</p>
        <div class="ci-total__value">
            <p>Итого</p>
            <p>{{ pricify(useCart().getTotal(list, 'priceBefore')) }} ₽</p>
        </div>
        <div v-if="discount" class="ci-total__value ci-total__value--sale">
            <p>Скидка</p>
            <p>-{{ pricify(discount) }} ₽</p>
        </div>
        <!-- notdone [API] (???) -->
        <!-- <div class="ci-total__value">
            <p>Стоимость доставки</p>
            <p>{{ pricify(0) }} ₽</p>
        </div> -->
        <div class="ci-total__value ci-total__value--total">
            <p>Итоговая сумма</p>
            <p>{{ pricify(useCart().getTotal(list)) }} ₽</p>
        </div>
    </Card>
</template>

<script setup>
    const props = defineProps({
        list: {
            type: Array,
            default: () => useCart().list
        }
    });

    const discount = computed(()=>{
        return useCart().getTotal(props.list, 'priceBefore') - useCart().getTotal(props.list)
    })
</script>

<style lang="scss" scoped>
    .ci-total{
        @include flex-col;
        gap: 1.6rem;

        &__title{
            font-weight: 500;
        }

        &__value{
            @include flex-jtf;
            align-items: baseline;

            p:first-child{
                color: var(--c-text-secondary);
            }

            p:last-child{
                font-weight: 500;
                white-space: nowrap;
            }

            &:last-child{
                padding-top: 2.4rem;
                margin-top: .8rem;
                border-top: .1rem solid var(--c-border-neutral-main);
                p{
                    color: var(--c-text-default);
                    font-weight: 500;
                }
            }

            &--sale{
                p{
                    color: var(--c-text-success)!important;
                }
            }
        }

    }
</style>