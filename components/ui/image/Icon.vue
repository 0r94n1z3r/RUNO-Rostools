<template>
    <component
        :is="icon"
        class="icon"
        :style="{
            '--default-size': Number(size)/10+'rem'
        }"
    />
</template>

<script setup>
    const props = defineProps({
        icon: Object,
        size: {
            type: [String, Number],
            default: 24
        }
    })
</script>

<style lang="scss" scoped>
    .icon{
        flex-shrink: 0;
        color: inherit;
        display: block;
        width: var(--icon-size, var(--default-size));
        height: var(--icon-size, var(--default-size));
    }
</style>