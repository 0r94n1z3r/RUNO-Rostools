<template>
    <BasicPage 
        class="order-page"
        :breadcrumbs="{title: 'Заказ'}"
        :title="order ? `Заказ #${order?.number}` : 'Заказ не найден'"
        :description="order ? 'Спасибо за заказ. Мы скоро свяжемся с вами для подтверждения заказа.' : 'К сожалению, запрошенная вами заказ не найден. Возможно, ссылка устарела.'"
    >
        <div class="order-page__content content-wrapper">
            <Empty v-if="!order" has-button/>
            <OrderItem v-else :info="order"/>
        </div>
    </BasicPage>
</template>

<script setup>
    const orderCode = computed(()=>R().params.orderCode);

    const loading = ref(true)
    const {data: order} = await useAPI(
        `/lk/order_without_account/${orderCode.value}`,
        {
            server: false,
            cache: 'no-cache',
            onResponse(){loading.value = false}
        }
    );

</script>

<style lang="scss" scoped>
    .order-page{
        --title-mx-w: 58.8rem;

        &__content{
            margin-top: 3.2rem;
        }
    }
</style>