<template>
    <div class="category-page">
        <template v-if="category">
            <CategoryHero :info="category"/>

            <DashesDivider id="category-catalog" />
            <CategoryCatalog :key="category?.id" :info="category" :="{breadcrumbs}"/>

            <!-- notdone [API] -->
            <template v-if="useCategories().subCategories(category.id)?.length == 1">
                <DashesDivider />
                <CategoryExtrasCatalog :info="category" />
            </template>

            <template v-if="category.description?.title || category.description?.text">
                <DashesDivider />
                <CategoryDescription :info="category"/>
            </template>

            <template v-if="category.advantages?.filter(e => e.publish)?.length">
                <DashesDivider />
                <CategoryAdvantages :info="category"/>
            </template>
            
            <template v-if="category.applications?.filter(e => e.publish)?.length">
                <DashesDivider />
                <CategorySlider :info="category"/>
            </template>

            <DashesDivider />
            <GenericInfo />

            <!-- <DashesDivider />
            <CategoryItemsComparison :category-id="category?.id"/> -->
            
            <GenericBlocks />
            
            <DashesDivider />
            <!-- notdone [API] (???)-->
            <FAQ />
        </template>
    </div>
</template>

<script setup>
    const props = defineProps({
        category: Object,
        breadcrumbs: Array
    });
</script>

<style lang="scss" scoped>

</style>