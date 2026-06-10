<template>
    <BasicPage 
        class="article"
        :breadcrumbs="{list: [
            {title: 'Новости', to: '/news'},
            {title: info?.title}
        ]}"
    >
        <div class="content-wrapper">
            <!-- nodone мб анимацию? -->
            <Badge type="blue" transition-block>{{ info?.category }}</Badge>
            <AnimText component="h1" transition-block>{{ info.title }}</AnimText>
        </div>

        <MediaContentContainer 
            v-if="info.image"
            :src="info.image"
            :backup-src="info.image"
            transition-block
        ></MediaContentContainer>

        <div class="content-wrapper" transition-block>
            <ParsedHTML :html="info.content"/>
        </div>

        <DashesDivider />

        <NewsPreview 
            bullit="Читайте также"
            title="Другие новости и обновления"
        />

    </BasicPage>
</template>

<script setup>
    const info = ref({});

    const update = async () => {
        const event = useRequestEvent();

        try {
            const {data, error} = await useAPI(`/news/${R().params.newsName}`);

            if(error.value)throw Error404(event);
            info.value = data.value;
        }catch{}
    }

    update();
</script>

<style lang="scss" scoped>
    .article{
        h1{
            margin: 1.6rem 0 4rem;

            @include mobile{
                @include font-h1--mob;
            }
        }

        :deep(.media-content-container){
            --h: 67.2rem;
            .media-content-container__wrapper::before{
                background: transparent;
            }

            @include mobile{
                --h: 48rem;
            }
        }
    }

</style>