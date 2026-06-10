<template>
    <div class="loader" v-html="loaderSvg"></div>
</template>

<script setup>
    import loaderSvg from "./loader.svg?raw";
</script>

<style lang="scss" scoped>
    .loader{
        width: 2.4rem;
        max-width: 100%;
    }
</style>