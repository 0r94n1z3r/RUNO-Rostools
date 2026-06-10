<template>
    <div class="placeholder--block"></div>
</template>

<script setup>

</script>

<style lang="scss" scoped>
    .placeholder{
        &--block{
            height: var(--height, 4rem);
            width: var(--width, 4rem);
            border-radius: var(--radius, 1.2rem);
        }
    }
</style>