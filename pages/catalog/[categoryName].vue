<template>
    <CategoryFancyView 
        v-if="type == 'fancy'"
        :key="`fancy-${currentCategory?.id}`"
        :="{category: currentCategory, breadcrumbs: {list: breadcrumbs}}" 
    />
    <CalculatorView 
        v-else-if="type == 'calculator'"
        :key="`calc-${currentCategory?.id}`"
        :="{category: currentCategory, breadcrumbs: {list: breadcrumbs}}" 
    />
    <CatalogView 
        v-else-if="currentCategory?.has_children"
        :key="`catalog-${currentCategory?.id}`"
        :="{category: currentCategory, breadcrumbs: {list: breadcrumbs}}" 
    />
    <CategoryView
        v-else-if="currentCategory?.id"
        :key="`cat-${currentCategory?.id}`"
        :="{category: currentCategory, breadcrumbs: {list: breadcrumbs}}" 
    />
</template>

<script setup>
    definePageMeta({
        name: 'Category',
        nav: 'catalog',
        // key: route => route.name, // nodone проверить нужно ли оно вообще было // мб consistancy у breadcrumbs // но тип в любом случае срабатывает PageTransition. Надо его тогда смотреть, кэнселить (Но тут же еще надо глядеть на Fancy не Fancy каталоги, так как между ними нужен транзишн)
        catalog: true,
        saveScroll: true
    })

    const categoryName = computed(()=>R().params.categoryName);

    const fetchedCategory = ref();
    if(!useCategories().list?.length){
        ({data: {value: fetchedCategory.value}} = await useAPI(`/categories/category/${categoryName.value}`)) 
    }

    const currentCategory = computed(()=>
        useCategories().list?.length ? useCategories().category(categoryName.value, 'name') : fetchedCategory.value
    )

    if(!currentCategory.value)throw Error404(useRequestEvent());

    const breadcrumbs = computed(()=>[
        {title: 'Каталог товаров', href: '/catalog'},
        ...(
            useCategories().list?.length
                ? useCategories().breadcrumbs(categoryName.value, 'name')?.map(e => ({title: e?.title, href: `/catalog/${e?.name}`})) || []
                :[{loading: true}]
        )
    ])

    // const isFancy = computed(()=> // notdone [определенные категории]
    //     [
    //         '129-lazernaia-svarka',
    //         '135-lazernaia-cistka',
    //         '136-lazernaia-rezka',
    //         '137-podkategoriia-1',
    //         '138-podkategoriia-2'
    //     ].includes(categoryName.value)
    // ) 

    const type = computed(()=> // notdone [определенные категории]
        currentCategory.value?.parent_id == 123? 
            'calculator' : 
        (
            currentCategory.value?.id == 15 || 
            currentCategory.value?.parent_id == 15
        )
            ? 'fancy' 
            : null
    )
</script>

<style lang="scss" scoped>

</style>