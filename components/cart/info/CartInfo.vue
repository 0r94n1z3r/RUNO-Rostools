<template>
    <div class="cart-info">
        <CITotal transition-block/>
        <CIAnnoy transition-block/>
        <CIForm v-model:data="data" v-model:attachments="attachments" transition-block/>
        <CIFin transition-block :="{data, attachments}"/>
    </div>
</template>

<script setup>
    const data = ref({
        first_name: useUser().info?.first_name || '',
        tel: useUser().info?.tel || '',
        email: useUser().info?.email || '',
        comment: '',
    })

    const attachments = ref([]);
</script>

<style lang="scss" scoped>
    .cart-info{
        @include flex-col;
        gap: 1.6rem;
    }
</style>