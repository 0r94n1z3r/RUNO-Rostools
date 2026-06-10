<template>
    <div class="slider-arrows">
        <Button 
            class="slider-arrows__button slider-arrows__button--prev"
            :icon-left="IconArrowLeftSLine"
            type="light"
            @click.stop.prevent="slide--"
        />
        <Button 
            class="slider-arrows__button slider-arrows__button--next"
            :icon-left="IconArrowRightSLine"
            type="light"
            @click.stop.prevent="slide++"
        />
    </div>
</template>

<script setup>
    import { IconArrowLeftSLine, IconArrowRightSLine} from '#components';

    const slide = defineModel('slide', 0);
</script>

<style lang="scss" scoped>
    .slider-arrows{
        position: absolute;
        @include all-directions(0);
        margin: auto 0;
        z-index: 2;
        @include flex-c;
        justify-content: space-between;
        pointer-events: none;

        &__button{
            @include shadow('xs');
            pointer-events: all;
        }
    }
</style>