<template>
    <div class="search-global-list">
        <SearchCard 
            v-for="i in useSearch().categories" 
            :key="i.id"
            :title="i.title"
            subtitle="Категория"
            :image="i.images?.[0]?.url || '/no-photo.svg'"
            :to="`/catalog/${i.name}`"
            :transition-block="isCalled || null"
        />

        <div v-if="useSearch().productsLoading" class="search-global-list__loading">
            <Loader />
        </div>

        <template v-else-if="useSearch().products?.length">
            <SearchCard 
                v-for="i in useSearch().products.slice(0,4)" 
                :key="i.id"
                :title="i.title"
                :to="'/product/' + i.name"
                :subtitle="useCategories().category(i.category_id)?.title || 'Товар'"
                :transition-block="isCalled || null"
                :image="i.image || '/no-photo.svg'"
                :product="i"
            />
        </template>
    </div>
</template>

<script setup>

</script>

<style lang="scss" scoped>
    .search-global-list{
        @include flex-col;
        gap: .8rem;

        &__loading{
            margin: 0 auto;
        }
    }
</style>