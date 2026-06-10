<template>
    <div class="inverse-wrapper header-state-dark">
        <slot/>
    </div>
</template>

<script setup>

</script>

<style lang="scss" scoped>
    .inverse-wrapper{
        position: relative;
        color: var(--c-text-inverse);
        background: var(--c-surface-neutral-main);

        &::before{
            @include pseudo-absolute;
            @include all-directions(0);
            background: var(--c-surface-neutral-main);
            z-index: -2;
        }
    }
</style>