<template>
    <p class="prod-card-title">
        {{ info?.title }}
    </p>
</template>

<script setup>
    const props = defineProps({
        info: Object
    });
</script>

<style lang="scss" scoped>
    .prod-card-title{
        @include font-p2;
        font-weight: 600;
        transition: .3s;

        @include multiple-text-overflow(3);
        // height: 3.6em;
        // height: 3lh;

    }
</style>