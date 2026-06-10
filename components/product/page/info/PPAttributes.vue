<template>
    <div class="pp-attributes">
        <DataTable 
            v-if="stats.length"
            :data="stats"
            transition-block
            :min="stats.length"
        />
    </div>
</template>

<script setup>
    const props = defineProps({
        info: Object
    });

    const attributes = computed(() => {
        const raw = props.info?.attributes;
        return Array.isArray(raw) ? raw : [];
    });

    const primaryAttributes = computed(()=>
        attributes.value.filter(e => e.primary) || []
    )

    const normalizeTitle = (value) =>
        typeof value === 'string' ? value.toLocaleLowerCase() : '';

    const generalAttributes = computed(()=>{
        if(!attributes.value?.length)return [];

        const dimensionsIDs = props.info?.dimensions?.map(e => e.property_id) || [];
        const primaryIDs = primaryAttributes.value.map(e => e.property_id);

        return attributes.value.filter((e) => 
            !(
                dimensionsIDs.includes(e.property_id) ||
                primaryIDs.includes(e.property_id) ||
                normalizeTitle(e.property?.title) == normalizeTitle('УголКругПрофиль') ||
                normalizeTitle(e.property?.title) == normalizeTitle('Максимальные размеры заготовок (мм)') ||
                e.equipment_id
            )
        );
    });

    const attrsByTitle = (list, title)=>list?.filter(e => normalizeTitle(e.property?.title) == normalizeTitle(title))
    const getAttrsTable = (
        list, 
        title, 
        tableTitle
    )=>{
        const l = attrsByTitle(list, title);
        if (!l.length) {
            return [];
        }
        const firstVals = l[0]?.values;
        if (!Array.isArray(firstVals) || !firstVals.length) {
            return [];
        }

        const res = [];
        res.push([tableTitle || title]);
        res.push(firstVals.map(e => e.name));
        res.push(...l.map(e => (Array.isArray(e.values) ? e.values.map(n => n.value) : [])));
        return res;
    }

    const stats = computed(()=>{
        if(!props.info)return [];

        const res = [];

        if(primaryAttributes.value.length){
            res.push(['Основные характеристики']);
            res.push(...primaryAttributes.value.map(e => [e.property?.title, e.value]));
        }

        res.push(...getAttrsTable(attributes.value, 'УголКругПрофиль', 'Размеры обрабатываемой заготовки'));
        res.push(...getAttrsTable(attributes.value, 'Максимальные размеры заготовок (мм)'))

        if(generalAttributes.value.length){
            res.push(['Технические характеристики']);
            res.push(...generalAttributes.value.map(e => [e.property?.title, e.value]));
        }

        if (Array.isArray(props.info?.dimensions) && props.info.dimensions.length) {
            res.push(['Габаритные размеры']);
            res.push(...props.info.dimensions.map(e => [e.property?.title, e.value]));
        }

        return res;
    })
</script>

<style lang="scss" scoped>

</style>