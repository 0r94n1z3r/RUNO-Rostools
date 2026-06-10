<template>
    <NuxtLayout 
        ref="catalogRef"
        name="catalog"
        :title="category?.title"
        :endpoint="`/categories/products/${categoryName}`"
        :="{breadcrumbs}"
        :description="description"
        has-filters
    >
        <template #filters>
            <CatalogFilters :id="categoryName"/>
        </template> 
    </NuxtLayout>
</template>

<script setup>
    const categoryName = computed(()=>R().params.categoryName);

    const props = defineProps({
        category: Object,
        breadcrumbs: Array
    });

    const catalogRef = ref();

    const description = computed(()=>{
        const text = props.category?.description?.text ?? '';
        const title = props.category?.description?.title;
        if (title) {
            return `<h2>${title}</h2>${text}`;
        }
        return text || undefined;
    })

//scroll top
    watch(categoryName, (n)=>{
        setTimeout(()=>{
            // useWindowScroll().y.value = 0;
            if(n && !useCategories().hasSubCategories(categoryName.value, 'name')){
                catalogRef.value?.layoutRef?.forceUpdate();
            }  
        })
    })

</script>

<style lang="scss" scoped>

</style>