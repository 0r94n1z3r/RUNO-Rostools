<template>
    <div class="home-products-preview">
        <div class="home-products-preview__title content-wrapper">
            <SectionTitle bullit="Хиты продаж">
                <span class="title-gray">В нашем каталоге</span> представлены наиболее востребованные позиции
            </SectionTitle>
            <AnimText class="home-products-preview__description">
                Настоящие лидеры <span nobr>по соотношению</span> цены <span nobr>и производительности</span>. Особого внимания заслуживают следующее оборудование:
            </AnimText>
        </div>

        <div class="home-products-preview__content">
            <HomeProduct 
                v-for="i in list?.products"
                :key="i.id"
                :info="i"
            />
        </div> 
    </div>
</template>

<script setup>
    const { data: list } = await useAPI('/products/main', {
        key: 'home-products-main',
        cache: 'no-cache',
        server: false,
        default: () => ({ products: [], total: 0 }),
    });
</script>

<style lang="scss" scoped>
    .home-products-preview{
        &__title{
            margin-bottom: 6.4rem;

            .section-title{
                max-width: 100rem
            }
        }

        &__description{
            @include font-p2;
            color: var(--c-text-secondary);
            max-width: 57rem;
            margin-top: 2.4rem;
        }

        &__content{
            @include flex-col;
            gap: 2rem;
        }
    }
</style>