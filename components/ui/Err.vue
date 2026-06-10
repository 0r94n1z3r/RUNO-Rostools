<template>
    <p v-if="err" class="err">
        {{ err }}
    </p>
</template>

<script setup>
    const props = defineProps({
        err: [String, Object]
    });
</script>

<style lang="scss" scoped>
    .err{
        @include font-p4;
        color: var(--c-text-error)
    }
</style>