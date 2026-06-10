<template>
    <div class="slider-input">
        <Slider 
            v-if="isMounted"
            v-model="model" 
            class="slider-input__slider"
            :tooltips="false" 
            :lazy="false"
            :min="min" 
            :max="max"
            @end="emit('end')"
            @mouseup="emit('end')"
        ></Slider>
    </div>
</template>

<script setup>
    import Slider from '@vueform/slider';
    import '@vueform/slider/themes/default.css';

    const props = defineProps({
        min: Number,
        max: Number,
    });

    const emit = defineEmits(['end']);

    const model = defineModel() // [Number, Number] / Number

    const isMounted = ref(false);
    onMounted(()=>isMounted.value = true);
</script>

<style lang="scss" scoped>
    .slider-input{
        height: 1.6rem;
        padding-top: .8rem;

        &__slider{
            --slider-height: .2rem;
            --slider-bg: var(--c-border-neutral-low);
            --slider-connect-bg: var(--c-surface-accent-main);

            --slider-handle-width: 1.6rem;
            --slider-handle-height: 1.6rem;

            --slider-handle-shadow: none;
            --slider-handle-shadow-active: none;

            --slider-handle-ring-width: 0;

            :deep(.slider-touch-area){
                &::after{
                    @include pseudo;
                    width: 100%;
                    height: 100%;
                    border: .1rem solid var(--c-border-neutral-high);
                    border-radius: 50%;
                }
            }
        }
    }   
        
    
</style>