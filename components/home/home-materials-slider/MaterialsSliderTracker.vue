<template>
    <div class="materials-slider-tracker">
        <div
            v-for="(i,k) in list" 
            class="materials-slider-tracker__block"
            :class="{'materials-slider-tracker__block--active': slide == k}"
            @click="emit('clicked', k)"
        >
            <p class="font-c3" transition-block>0{{k+1}} {{ i.title }}</p>
            <div class="materials-slider-tracker__line">
                <div class="materials-slider-tracker__progress" :style="{width: getProgressWidth(k)}"></div>
            </div>
        </div>
    </div>
</template>

<script setup>
    const props = defineProps({
        list: Array,
        slide: Number,
        progress: Number
    });

    const emit = defineEmits(['clicked']);

    const getProgressWidth = (k) => {
        const i = props.slide || 0;

        if (i > k) {
            return '100%';
        }else if (i < k) {
            return '0%';
        }
        return (props.progress || 0) * 100 + '%';
    };
</script>

<style lang="scss" scoped>
    .materials-slider-tracker{
        display: flex;
        gap: 1.2rem;

        --inactive-color: var(--c-white-40);

        &__block{
            width: 100%;
            max-width: 18.8rem;
            transition: .3s;
            position: relative;
            cursor: pointer;

            &:not(&--active){
                color: var(--inactive-color);
            }

            p{
                white-space: nowrap;
                margin-bottom: .8rem;
            }

            @include hover {
                &:hover{
                    --inactive-color: var(--c-white-68);  
                }
            }
        }

        &__line{
            width: 100%;
            height: .2rem;
            border-radius: .2rem;
            background: var(--inactive-color);
            position: relative;
            transition: .3s;
        }

        &__progress{
            height: 100%;
            position: absolute;
            top: 0;
            left: 0;
            border-radius: .2rem;
            background: var(--c-surface-neutral-main-inverse);
            transition: .3s;
        }

        @include mobile{
            gap: .8rem;

            &__block{
                p{
                    display: none;
                }
            }
        }
    }
</style>