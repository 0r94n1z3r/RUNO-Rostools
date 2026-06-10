<template>
    <div class="breadcrumbs">
        <div ref="dropdownContainerRef" class="breadcrumbs__container">
            <div 
                v-for="(i,k) in breadcrumbs.slice(0, -1)"
                class="breadcrumb text-link--basic text-label text-label--medium" 
            >
                <HistoryNuxtLink :to="i.to || i.href">
                    <AnimText class="text-link-basic" autoplay="immediate" :delay="200 * k" :duration="400" @fin="()=>points[k] = true">{{ i.title }}</AnimText>
                </HistoryNuxtLink>
                <IconArrowDropRightLine 
                    class="breadcrumb__point" 
                    :class="{'breadcrumb__point--show': points[k]}"
                    size="18"
                />
            </div>
        </div>

        <div 
            v-if="R_loading"
            class="breadcrumb breadcrumb--placeholder" 
        >
            <Placeholder/>
            <IconArrowDropRightLine class="breadcrumb__point" size="18"/>
        </div>

        <div
            v-else 
            :key="breadcrumbs[breadcrumbs.length-1]?.title" 
            class="breadcrumb breadcrumb--current"
        >
            <AnimText class="text-label text-label--medium" autoplay="immediate" :delay="200 * (breadcrumbs.length-1)" :duration="400">{{ breadcrumbs[breadcrumbs.length-1]?.title }}</AnimText>
        </div>
    </div>
</template>

<script setup>
    const props = defineProps({
        id: [String, Number], // id или [keyName] категории
        list: Array, // {to: [String, Object], title: String} // список, если breadcrumbs не относятся к каталогу
        keyName: String,
        loading: Boolean,
        title: String 
    })

    const points = ref([]);

    //category
        const fetchedBreadcrumbs = ref([]);

        if(!useCategories().list?.length && !props.list){
            ({data: {value: fetchedBreadcrumbs.value}} = await useAPI(`/categories/category/${props.id}/parents`)) 
        }

        const currentBreadcrumbs = computed(()=>
            useCategories().breadcrumbs(props.id, props.keyName)?.length ? useCategories().breadcrumbs(props.id, props.keyName) : fetchedBreadcrumbs.value
        )

    const breadcrumbs = computed(()=>{
        let res = [
            {to: '/', title: 'Главная'},
            ...(
                (props.title && [{title: props.title}]) ||
                props.list ||
                [
                    {to: '/catalog', title: 'Каталог'},
                    ...(currentBreadcrumbs.value?.map((e) => ({to: `/catalog/${e?.name}`, title: e?.title})) || [])
                ]
            ),
        ]

        return res.filter(e => e.title);
    })

//loading
    const R_loading = computed(()=> props.loading) // || (!props.list && useCategories().initLoading && !currentBreadcrumbs.value?.length))

//schema
    // useSchemaOrg([{
    //     "@context": "https://schema.org",
    //     "@type": "BreadcrumbList",
    //     "itemListElement": [
    //         ...breadcrumbs.value?.slice(0, -1)?.map((e,k) => ({
    //             "@type": "ListItem",
    //             "position": k+1,
    //             "name": e.title,
    //             "item": `${useRequestURL().origin.replace(/^http:/, 'https:')}${e.href}`
    //         })),
    //         {
    //             "@type": "ListItem",
    //             "position": breadcrumbs.value.length,
    //             "name": breadcrumbs.value[breadcrumbs.value.length-1]?.title
    //         }
    //     ]
    // }])
</script>

<style lang="scss" scoped>
    .breadcrumbs{
        display: flex;
        flex-wrap: wrap;

        &__container{
            display: flex;
            flex-wrap: wrap;
            position: relative;
        }
    }
    
    .breadcrumb{
        display: flex;
        word-break: normal;
        height: 2.4rem;
        display: flex;
        align-items: center;
        color: var(--c-text-secondary);
        @include font-p4;

        &--current{
            color: var(--c-text-accent);
        }

        &--placeholder{
            .placeholder{
                align-self: center;
            }
        }

        &__point{
            margin-top: .2rem;
            @include transition-bounce;

            &:not(&--show){
                @include hidden(2rem);
            }
        }
    }
</style>