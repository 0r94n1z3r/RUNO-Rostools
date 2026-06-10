<template>
    <Head>
        <Title>{{ R_title }}</Title>
        <Meta name="description" :content="R_description" />

        <Link rel="canonical" :href="canonical" />

        <Meta property="og:locale" content="ru_RU" />
        <Meta property="og:type" :content="type" />
        <Meta property="og:title" :content="R_title" />
        <Meta property="og:description" :content="R_description" />
        <Meta property="og:url" :content="url.href" />
        <Meta property="og:site_name" content="РОСТУЛС" />
        <!-- <Meta property="og:image" :content="image" /> -->

        <Meta v-for="i in extraMeta" :property="i.property" :content="i.content"/>

    </Head>
</template>

<script setup>
    const props = defineProps({
        title: { type: String },
        description: { type: String },
        // image: { 
        //     type: String, 
        //     default: '' 
        // },
        type: {
            type: String, 
            default: 'website'
        },
        canonical: String,
        extraMeta: Array
    })

    const url = useRequestURL();

    const R_title = computed(()=>SEO_title(props.title));
    const R_description = computed(()=>SEO_description(props.description));

    //canonical
        const canonical = computed(() => {
            if (props.canonical)
                return `https://${url.hostname}${props.canonical}`

            const [tpl, act] = [R().matched?.[0]?.path, R().path].map(p => p?.split('/') ?? [])
            const normalized = act.map((p, i) => tpl[i]?.startsWith(':') ? p : p.toLowerCase()).join('/')

            return `https://${url.hostname}${normalized}`
        })

</script>

<style lang="scss" scoped>

</style>