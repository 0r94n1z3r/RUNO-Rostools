<template>
    <!-- notdone [API] (???) -->
    <div class="category-items-comparison content-wrapper">
        <SectionTitle
            class="category-items-comparison__title"
            bullit="Сравнение аппаратов"
        >
            <span class="title-gray">Сравнение технологий</span> — выберите свою производительность
        </SectionTitle>

        <SwiperWr 
            class="category-items-comparison__items swiper--faded"
            :modules="[SwiperPagination]"
            :pagination="{
                dynamicBullets: true,
                clickable: true
            }"
            slides-per-view="auto"
        >
            <SwiperSlide
                v-for="i in 3"
                :key="i"
                style="width: max-content"
            >
                <CategoryComparisonItem
                    transition-block
                    :info="i"
                />
            </SwiperSlide>
        </SwiperWr>
    </div>
</template>

<script setup>
    const props = defineProps({
        categoryId: [Number, String]
    });

</script>

<style lang="scss" scoped>
    .category-items-comparison{
        --gap: 2rem;

        &__title{
            margin-bottom: 6.4rem;
            
            @include mobile{
                margin-bottom: 3.2rem;
            }
        }

        .category-comparison-item{
            width: 100%;
            max-width: 38.6rem;
        }

        .swiper-slide:not(:last-child){
            margin-right: var(--gap);
        }

        :deep(.swiper){
            padding-bottom: 2.4rem;
            margin-bottom: -2.4rem;
        }

        @include mobile(700px){
            --gap: .8rem;

            :deep(.category-comparison-item){
                max-width: 33rem;
                padding: 2.4rem;

                .prod-card-title{
                    @include font-h2--mob;
                }

                .category-comparison-item{
                    &__stat{
                        padding: 2rem;
                    }

                    &__stat-value{
                        @include font-h2--mob;
                        margin-bottom: .4rem;
                    }
                }
            }
        }
    }
</style>