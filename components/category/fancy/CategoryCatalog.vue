<template>
    <div class="category-catalog content-wrapper">

        <SectionTitle
            class="category-catalog__title"
            bullit="Каталог"
            :="{breadcrumbs}"
        >
            <!-- Наши {{ normalizeText(info.title) }} -->
            {{ info.title }}
        </SectionTitle>

        <SubcategoriesTile 
            v-if="useCategories().subCategories(props.info.id)?.length > 1"
            :parent-id="info.id"
        />
        <ProdsPagList
            v-else
            :endpoint="`/categories/products/${info.name}`"
        />
    </div>
</template>

<script setup>
    const props = defineProps({
        info: Object,
        breadcrumbs: Object
    });

    const normalizeText = (text, locale) =>
        text.replace(/[\p{L}\p{N}]+(?:[-'][\p{L}\p{N}]+)*/gu, word =>
            (word === (locale ? word.toLocaleUpperCase(locale) : word.toUpperCase()))
            ? word
            : (locale ? word.toLocaleLowerCase(locale) : word.toLowerCase())
        );

</script>

<style lang="scss" scoped>
    .category-catalog{
        &__title{
            margin-bottom: 6.4rem;
            
            @include mobile{
                margin-bottom: 3.2rem;
            }
        }
    }
</style>