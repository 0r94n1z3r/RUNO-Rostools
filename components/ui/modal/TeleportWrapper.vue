<template>
    <ClientOnly>
        <Teleport to="body" v-if="teleport">
            <slot/>
        </Teleport>
        <template v-else>
            <slot/>
        </template>
    </ClientOnly>
</template>

<script setup>
    const props = defineProps({
        teleport: {
            type: Boolean,
            default: true
        }
    })

</script>

<style lang="scss" scoped>

</style>