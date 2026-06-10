<template>
    <div class="catalog-filter-categories-list">
        <CatalogFilterCategory 
            v-for="(i,k) in list"
            :key="k"
            :info="i"
            @categories="emit('categories', $event)"
            :called="called"
        />
    </div>
</template>

<script setup>
    const props = defineProps({
        list: Array,
        called: Boolean
    })

    const emit = defineEmits(['categories']);
</script>

<style lang="scss" scoped>

</style>