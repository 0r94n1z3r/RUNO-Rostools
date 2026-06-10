<template>
    <div class="filter-preloader">
        <Placeholder 
            style="--width: 100%"
        />
        <div>
            <Placeholder
                v-for="i in 4"
                style="--width: 50%"
            />
        </div>
    </div>
</template>

<script setup>

</script>

<style lang="scss" scoped>
    .filter-preloader{
        @include flex-col;
        gap: .4rem;
        margin-top: .8rem;
        margin-bottom: 2rem;

        .placeholder{
            margin-bottom: 1.2rem;
        }
    }
</style>