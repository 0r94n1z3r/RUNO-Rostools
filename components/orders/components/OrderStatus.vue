<template>
    <Badge
        :type="currentStatus?.color"
    >
        {{ currentStatus?.title }}
    </Badge>
</template>

<script setup>
    const props = defineProps({
        info: Object
    });

    const currentStatus = computed(() => useStatic().orderStatuses.status(props.info.status_id || 1));

</script>

<style lang="scss" scoped>

</style>