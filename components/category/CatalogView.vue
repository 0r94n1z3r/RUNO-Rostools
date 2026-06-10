<template>
    <BasicPage
        class="catalog-view"
        :title="category?.title"
        :="{breadcrumbs}"
    >
        <div class="content-wrapper">
            <SubcategoriesTile 
                :key="category?.id"
                :parent-id="category?.id"
            />
        </div>
    </BasicPage>
</template>

<script setup>
    const props = defineProps({
        category: Object,
        breadcrumbs: Object
    });
</script>

<style lang="scss" scoped>
    .catalog-view{
        --title-mb: 5.2rem!important;
    }
</style>