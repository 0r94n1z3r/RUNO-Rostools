<template>
    <div 
        class="filters-caller font-14"
        @click="useFilters().called = !useFilters().called"
    >
        <p>Фильтры</p>
        <!-- <IconFilter48
            class="filters-caller__icon"
            size="48"
        /> -->
    </div>
</template>

<script setup>

</script>

<style lang="scss" scoped>
    .filters-caller{
        display: flex;
        align-items: center;
        gap: .8rem;
        color: var(--orange-100);
        cursor: pointer;

        &__icon{
            --icon-size: 2.4rem;
        }
    }
</style>