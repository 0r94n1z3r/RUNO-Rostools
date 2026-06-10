<template>
    <div v-if="discount" class="prod-card-discount">
        <Badge
            type="red"
        >
            {{discount}}%
        </Badge>
    </div>
</template>

<script setup>
    const props = defineProps({
        info: Object
    });

    const discount = computed(()=>useCatalog().getPrice(props.info).discount);
</script>

<style lang="scss" scoped>

</style>