<template>
    <AnimText :component="bullitComponent" class="bullit font-h5" duration="500">
        <slot/>
    </AnimText>
</template>

<script setup>
    const props = defineProps({
        bullitComponent: {
            type: [String, Object],
            default: 'p'
        }
    });
</script>

<style lang="scss" scoped>
    .bullit{
        @include font-c1;
        margin-bottom: 1.2rem;
        color: var(--c-text-accent);
        width: fit-content;

        @include mobile{
            @include font-c3;
        }
    }
</style>