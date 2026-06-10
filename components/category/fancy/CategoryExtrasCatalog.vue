<template>
    <div class="category-extras-catalog content-wrapper">
        <div class="category-extras-catalog__title">
            <SectionTitle
                bullit="Сопутствующие товары"
            >
                Повышайте производительность<br/> 
                <span class="title-gray">
                    с дополнительным оснащением<br/>
                    и расходными материалами
                </span>
            </SectionTitle>
            <AnimText class="category-extras-catalog__subtitle" transition-block>
                Максимально используйте возможности ваших лазерных сварочных аппаратов REALREZ <span nobr>с помощью</span> наших специализированных аксессуаров <span nobr>и расходных</span> материалов
            </AnimText>
        </div>
        <!-- notdone [API] `/categories/extras/${info.name}` -->
        <ProdsPagList
            v-if="categoryName"
            :endpoint="`/categories/products/${categoryName}`"
        />
    </div>
</template>

<script setup>
    const props = defineProps({
        info: Object
    });

    const categoryName = computed(()=>props.info?.id && useCategories().subCategories(props.info?.id)?.[0]?.name);
</script>

<style lang="scss" scoped>
    .category-extras-catalog{
        &__title{
            margin-bottom: 6.4rem;
        }

        &__subtitle{
            margin-top: 1.6rem;
            max-width: 72rem;
            @include font-p2;
        }

        @include mobile{
            &__title{
                margin-bottom: 3.2rem;
            }

            &__subtitle{
                @include font-p3;
            }
        }
    }
</style>