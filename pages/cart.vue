<template>
    <BasicPage
        class="cart"
        :breadcrumbs="{title: 'Корзина'}"
        title="Корзина"
        :="{description}"
    >
        <div class="content-wrapper">
            <AnimText v-if="loading" component="h2">Загрузка...</AnimText>
            
            <div v-else-if="!displayList.length">
                <AnimButton 
                    :icon-left="IconArrowLeftLine"
                    to="/"
                    class="cart__empty-button"
                    transition-block
                >
                    На главную
                </AnimButton>
            </div>

            <div v-else class="cart__wrapper">
                <div class="cart__content">
                    <h3 transition-block>Товары <span>({{ useCart().length }})</span></h3>
                    <Card class="cart__products" transition-block>
                        <CartProduct
                            v-for="i in displayList"
                            :info="i"
                        />
                        <!-- notdone если делаем share надо отдельный clean, чтобы не чистить основную корзину -->
                        <Button
                            type="light"
                            class="cart__clear-button"
                            transition-block
                            @click="useCart().clean()"
                        >
                            Очистить корзину
                        </Button>
                    </Card>
                </div>
                <div class="cart__info">
                    <h3>Детали заказа</h3>
                    <CartInfo/>
                </div>
            </div>
        </div>
    </BasicPage>
</template>

<script setup>
    import { IconArrowLeftLine } from '#components';

    onUnmounted(()=>{useCart().purify()});

    const loading = computed(()=>useCart().tmpCartLoading || useCart().initLoading);
    const displayList = computed(()=>useCart().list.filter(e => e.count));

    const description = computed(()=>
        loading.value?
            null:
        displayList.value.length?
            "Здесь вы можете просмотреть все добавленные товары, изменить их количество или перейти к оформлению заказа.":
        "Похоже, что в вашей корзине пока ничего нет. Добавьте товары, чтобы продолжить оформление заказа."
    )

</script>

<style lang="scss" scoped>
    .cart{
        --title-mx-w: 51rem;
        --title-mb: 6.4rem;

        &__empty-button{
            @include mobile{
                width: 100%;
            }
        }

        &__wrapper{
            display: flex;
            gap: 6.4rem 2rem;
        }

        &__content{
            flex-grow: 1;
            min-width: 0;
        }

        &__info{
            flex-shrink: 0;
            width: 100%;
            max-width: 38.8rem;
        }

        h3{
            margin-bottom: 2.4rem;
            span{
                color: var(--c-text-disabled);
            }        
        }

        &__clear-button{
            margin-top: 2.4rem;
            width: 100%;
        }

        @include desktop(1000px){
            &__products{
                position: sticky;
                top: calc(var(--header-height) + var(--pad-o));
            }
        }

        @include mobile(1000px){
            &__wrapper{
                flex-direction: column;
            }

            &__info{
                max-width: unset;
            }
        }

        @include mobile{
            h3{
                @include font-h2--mob;
            }
        }
    }
</style>