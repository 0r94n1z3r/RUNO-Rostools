<template>
    <div 
        class="checkbox" 
        :class="[
            model ? 'checkbox--checked' : '',
            disabled ? 'checkbox--disabled' : '',
            `checkbox--${type}`,
            `checkbox--${size}`,
        ]" 
        @click="clickHandler"
    >

    <!-- input -->
        <div class="checkbox__container">
            <div 
                v-if="type == 'default'" 
                class="checkbox__box"
            >
                <Icon
                    class="checkbox__icon"
                    :icon="checkIcon"
                />
            </div>
            <div 
                v-if="type == 'radio'" 
                class="checkbox__radio"
            ></div>
        </div>

    <!-- content -->
        <div class="checkbox__text">
            <p v-if="title || string" :class="textClass">
                {{ title }}
            </p>
            <slot/>
        </div>
    </div>
</template>

<script setup>
    import { 
        IconCheckLine,
        IconSubtractLine
    } from '#components';

    const props = defineProps({
        type: { // default / radio
            type: String,
            default: "default"
        },
        title: String,
        string: String,
        size: { // medium / small
            type: String,
            default: 'medium'
        },
        textClass: String,
        disabled: Boolean,
        halfChecked: Boolean, // отображение -

        //radio
        radioList: Array, // при изменении model у всех radioList[radioKey] = false
        radioKey: {
            type: String,
            default: 'value'
        }
    })

    const emit = defineEmits(['change']);

    const model = defineModel();

    const clickHandler = ()=>{
        if(props.type == 'radio'){
            props.radioList?.forEach(e => e[props.radioKey] = false);
            model.value = true;
            emitChange();
            return;
        }

        model.value = !model.value;
        emitChange();
    }

    const emitChange = ()=>{
        setTimeout(()=>{emit('change', model.value)});
    }

    const checkIcon = computed(()=>{
        if(props.halfChecked) return IconSubtractLine;
        return IconCheckLine;
    })


    


</script>

<style lang="scss" scoped>
    .checkbox{
        --brd: var(--c-border-neutral-med);
        --color: transparent;
        --size: 2.4rem;
        --box-size: calc(var(--size) - .4rem);

        &--small{
            --size: 2rem;
        }

        cursor: pointer;
        width: max-content;
        max-width: 100%;
        display: flex;
        gap: .8rem;

        &__container{
            height: var(--size);
            width: var(--size);
            flex-shrink: 0;
            @include flex-c;
        }

        &__box{
            border: .1rem solid var(--brd);
            border-radius: .6rem;
            @include flex-c;
            transition: .3s;
            flex-shrink: 0;
            height: var(--box-size);
            width: var(--box-size);
            background: var(--color);

            .icon{
                --icon-size: calc(var(--box-size) - .4rem);
                color: var(--c-text-inverse);
                @include transition-bounce;
            }
        }

        &__radio{
            border: .1rem solid var(--brd);
            border-radius: 50%;
            @include flex-c;
            transition: .3s;
            flex-shrink: 0;
            height: var(--box-size);
            width: var(--box-size);

            &::after{
                @include pseudo;
                height: 100%;
                width: 100%;
                background: var(--color);
                border-radius: 50%;
                transform: scale(.45);
                @include transition-bounce;
            }
        }

        &--checked{
            --color: var(--c-surface-accent-main);
            --brd: var(--c-surface-accent-main);
        }

        &:not(&--checked){
            --color: transparent!important;

            .checkbox{
                &__icon{
                    scale: 0.1;
                    opacity: 0;
                }

                &__radio{
                    &::after{
                        opacity: 0;
                        scale: 0.1;
                    }
                }
            }
        }

        @include hover{
            &:hover{
                --color: var(--c-surface-accent-hover);
                --brd: var(--c-surface-accent-hover);
            }
        }
        

        &--disabled{
            pointer-events: none;
            // notdone
        }

        &__text{
            min-height: 100%;
            display: flex;
            align-items: center;
            @include font-p4;
        }
    }
</style>