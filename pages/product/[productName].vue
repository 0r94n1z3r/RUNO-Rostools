<template>
    <div class="product-page">
        <PPHero :="{info, breadcrumbs}"/>

        <PPInfo :="{info}"/>

        <!-- <DashesDivider />
        <CategoryItemsComparison :category-id="info?.category_id"/> -->

        <GenericBlocks />
        
        <PPPrice :="{info}"/>
    </div>
</template>

<script setup>
    definePageMeta({
        name: "Product",
    })

    const route = useRoute()
    const productName = computed(() => {
        const raw = route.params.productName
        const s = Array.isArray(raw) ? raw[0] : raw
        return String(s ?? '').trim()
    })
    const event = useRequestEvent()

    const { data: infoData, pending, error: fetchError } = await useAPI(
        () =>
            productName.value
                ? `/products/product/${productName.value}`
                : null,
        {
            key: computed(() =>
                productName.value
                    ? `product-${productName.value}`
                    : 'product-page-empty',
            ),
            watch: [productName],
        },
    )

    const info = computed(() => infoData.value ?? {})

    if (fetchError.value || !infoData.value?.id) {
        throw Error404(event)
    }

    watch(pending, async (n) => {
        if(n)return;
        useProdTransition().finish();
    }, { immediate: true })

    watch([infoData, pending, fetchError], ([data, isPending, err]) => {
        if (import.meta.server) {
            return
        }
        if (isPending) {
            return
        }
        if (data?.id) {
            return
        }
        if (err) {
            throw Error404()
        }
        if (data != null && !data?.id) {
            throw Error404()
        }
    })

    const breadcrumbs = computed(() => [
        { title: 'Каталог товаров', href: '/catalog' },
        ...(
            useCategories().list.length
                ? useCategories().breadcrumbs(info.value?.category_id)?.map(e => ({ title: e?.title, to: `/catalog/${e?.name}` })) || []
                : [{ loading: true }]
        ),
        { title: info.value?.title, loading: pending.value },
    ])
</script>

<style lang="scss" scoped>

</style>