<template>
    <p class="badge">
        <slot />
    </p>
</template>

<script setup>
    const props = defineProps({
        type: {
            type: String,
            default: 'green'
        }
    });

    const types = {
        green: {
            bg: 'var(--c-surface-success-main)',
            color: 'var(--c-text-inverse)'
        },
        blue: {
            bg: 'var(--c-surface-accent-main)',
            color: 'var(--c-text-inverse)'
        },
        red: {
            bg: 'var(--c-surface-error-main)',
            color: 'var(--c-text-inverse)'
        },
        gray: {
            bg: 'var(--c-surface-neutral-secondary)',
            color: 'var(--c-text-default)'
        },
    }

    const bg = computed(() => types[props.type]?.bg);
    const color = computed(() => types[props.type]?.color);
</script>

<style lang="scss" scoped>
    .badge{
        white-space: nowrap;
        @include font-c3;
        @include flex-c;
        padding: 0 2rem;
        height: 4.4rem;
        border-radius: .6rem;
        background: v-bind(bg);
        color: v-bind(color);
        flex-shrink: 0;
        width: fit-content;
    }
</style>