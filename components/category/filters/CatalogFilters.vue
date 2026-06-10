<template>
    <div class="catalog-filters">
        <template v-if="loading">
            <FilterPreloader 
                v-for="i in 4"
            />
        </template>

        <template v-else>
            <CatalogFilter 
                v-if="priceRange[0] != null && priceRange[1] != null && priceRange[0] != priceRange[1]" 
                v-model="useFilters().dynamicPrice"
                title="ДИАПАЗОН ЦЕН, руб."
                type="range"
                :filter-attrs="{
                    min: priceRange[0], 
                    max: priceRange[1], 
                    onEnd: ()=>useFilters().updatePrice(useFilters().dynamicPrice)
                }"
            />

            <CatalogFilter 
                v-for="i in filters"
                v-model="i.value"
                :="i"
            />
        </template>
    </div>
</template>

<script setup>

    const props = defineProps({
        id: [String, Number],
    })

    const loading = ref(false);

    const updateFilters = async () => {
        loading.value = true;

        const {
            data: { value: fetched },
            error: { value: error},
        } = await useAPI(
            `/categories/filter/${props.id}`,
            {},
            // {abortKey: 'updateFilters'}
        );

        if(error){
            loading.value = false;
            return;
        }

        if (fetched?.meta && fetched.meta.maxPrice != null && fetched.meta.minPrice != null) {
            priceRange.value = [parseInt(fetched.meta.minPrice), parseInt(fetched.meta.maxPrice)];

            if(!useFilters().filter?.price)
                setTimeout(()=>useFilters().dynamicPrice = priceRange.value);
        } else {
            priceRange.value = [null, null];
            useFilters().updatePrice([null, null]);
        }

        const propsList = Array.isArray(fetched?.properties) ? fetched.properties : [];
        filters.value = propsList.map((filter) => {
            const attrs = filter && typeof filter.attributes === 'object' && filter.attributes !== null
                ? filter.attributes
                : {};

            return {
                ...filter,
                title: String(filter?.title || '').toUpperCase(),
                type: "checkbox",
                value: Object.entries(attrs).map(
                    ([key, value]) => ({
                        title: key,
                        value: useFilters().isActiveProp(filter.property_id, key),
                        string: `(${value})`,
                        onChange: ()=>useFilters().switchProp(filter.property_id, key)
                    })
                )
            };
        }).sort((a,b) => (b.title === 'БРЕНД') - (a.title === 'БРЕНД'));

        loading.value = false;
    }

    watch(
        ()=>props.id, 
        (n)=>{if(n)updateFilters()},
        {immediate: true}
    )

// price
    const priceRange = ref([null,null])

// filters
    const filters = ref([]);


</script>

<style lang="scss" scoped>

</style>