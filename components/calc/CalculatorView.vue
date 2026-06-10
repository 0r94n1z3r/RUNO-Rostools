<template>
    <BasicPage
        :="{breadcrumbs}"
        :title="category.hero_title || category.title"
        :description="category.hero_description"
    >
        <template #side>
            <CalcIntroImg :="{category}"/>
        </template>

        <DashesDivider />

        <Calc :category="category"/>

        <template v-if="category?.description?.text">
            <DashesDivider />
            <CalcInfoSlider :info="category" />
        </template>

        <DashesDivider />

        <CalcAdvantages />

        <DashesDivider />

        <CalcRecommendations />
    </BasicPage>
</template>

<script setup>
    const props = defineProps({
        category: Object,
        breadcrumbs: Object
    });

</script>

<style lang="scss" scoped>
    :deep(.calc){
        margin-top: calc(-1 * (var(--header-height) + var(--pad-o)));
        padding-top: calc(var(--header-height) + var(--pad-o));
    }

    @include mobile(1120px){
        :deep(.basic-page__wrapper){
            @include flex-col;
        }
    }
</style>