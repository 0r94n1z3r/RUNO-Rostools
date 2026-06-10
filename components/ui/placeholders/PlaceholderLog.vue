<template>
    <div class="placeholder--log">
        <div class="placeholder__log">

        </div>
    </div>
</template>

<script setup>

</script>

<style lang="scss" scoped>
    .placeholder{
        --PH-pad: .8rem;

        &--log{
            background: transparent!important;
            padding: var(--PH-pad) 0;
        }

        &__log{
            width: var(--width, 3.6rem);
            height: var(--height, .6rem);
            border-radius: .4rem;

            background: var(--gray-40);
        }
    }
</style>