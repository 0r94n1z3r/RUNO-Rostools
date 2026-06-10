<template>
    <BasicPage
        class="catalog-page"
        :breadcrumbs="{title: 'Каталог'}"
        title="Каталог"
        :="{description}"
    >
        <div class="content-wrapper">
            <SubcategoriesTile 
                :parent-id="null"
            />
        </div>
    </BasicPage>
</template>

<script setup>
    definePageMeta({
        saveScroll: true
    })
</script>

<style lang="scss" scoped>
    .catalog-page{
        --title-mb: 6.4rem;
        @include mobile{
            --title-mb: 3.2rem;
        }
    }
</style>