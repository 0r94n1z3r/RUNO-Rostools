<template>
    <div 
        class="text-input"
        :class="[
            isFocused ? 'text-input--focused' : null,
            disabled ? 'text-input--disabled' : null,
            error ?'text-input--error' : null,
            !focusable ? 'text-input--notFocusable' : null,
            step ? 'text-input--steps' : null,
            `text-input--${styleType}`
        ]"
        @mousedown="focus"
    >
        <div class="text-input__icons">
            <Button
                v-if="step"
                :type="styleType"
                :icon-left="IconSubtractLine"
                @click="model = clamp((Number(model) || 0) - step)"
            />
            <slot name="pre" />
        </div>

        <input
            ref="inputRef"
            v-model="model"
            v-maska="mask"
            class="text-input__input"
            :type="actualType"
            :="{placeholder: placeholder ? placeholder + (required?'*':'') : ''}"

            @focus="focusHandler"
            @blur="blurHandler"
            @input="emit('input', $event)"
            @change="emit('change', $event)"

            @keydown.enter="()=>{
                blur();
            }"
            
        >

        <div class="text-input__icons">
            <slot/>

            <IconCloseLine 
                v-if="hasClear && !step"
                class="text-input__icon text-input__icon--interactive text-input-clear"
                @mousedown="clear"
            />
            <!-- <PasswordEye 
                v-if="type=='password'" 
                v-model="isPasswordShown"
                :size="iconSize"
            /> -->

            <Button
                v-if="step"
                :type="styleType"
                :icon-left="IconAddLine"
                @click="model = clamp((Number(model) || 0) + step)"
            />
        </div>
    </div>
</template>

<script setup>
    import { IconCloseLine, IconAddLine, IconSubtractLine } from '#components';

    const props = defineProps({
        type: {
            type: String,
            default: "text",
        },

        styleType: { // light / transparent-dark / transparent-light
            type: String,
            default: 'default'
        },

        placeholder: String, 
        disabled: Boolean,
        error: null,
        
        mask: [String, Object],

        focusable: {
            type: Boolean,
            default: true
        },

        required: Boolean,

        hasClear: {
            type: Boolean,
            default: true
        },

        step: Number,

        min: [Number, String],
        max: [Number, String]
    })

    const emit = defineEmits(['focus','blur','input','change'])

    const model = defineModel();

    const inputRef = ref();

    const clamp = (value)=>{
        if(value === '' || value == null) return value;

        let num = Number(value);

        if(Number.isNaN(num)) return '';

        const alert = {
            title: 'Внимание',
            iconColor: 'var(--c-surface-error-main)',
            icon: IconCloseLine
        }

        if(props.min != null && num < Number(props.min)) {
            num = Number(props.min);
            useNotifications().push({
                ...alert,
                text: 'Минимальное значение: ' + props.min
            });
        }
        if(props.max != null && num > Number(props.max)) {
            num = Number(props.max);
            useNotifications().push({
                ...alert,
                text: 'Максимальное значение: ' + props.max
            });
        }

        return num;
    }

//type
    const actualType = computed(()=>{
        if(props.step)return 'number';
        if(props.type != "password")return props.type;
        return isPasswordShown.value?"text":"password";
    })

//password
    const isPasswordShown = ref(false);

//clear
    const clear = ()=>{
        model.value = '';
    }

//focus/blur
    const isFocused = ref(false);

    const focus = ()=>{
        if(!props.focusable)return;
        inputRef.value.focus();
    }

    const focusHandler = (e)=>{
        isFocused.value = true;
        emit('focus', e);
    }

    const blur = ()=>{
        inputRef.value.blur();
    }

    const blurHandler = (e)=>{
        isFocused.value = false;

        if(props.min || props.max){
            model.value = clamp(model.value);
        }

        emit(
            'blur', 
            e
        );
    }

    defineExpose({
        focus,
        blur,
        isFocused,
        input: inputRef
    })
</script>

<style lang="scss" scoped>
    .text-input{
        --padding-x: 1.2rem;
        --color: var(--c-text-default);
        --empty-color: var(--c-text-secondary);
        --background: var(--c-surface-neutral-secondary);
        --hov-background: var(--c-surface-neutral-med);
        --placeholder-color: var(--c-text-disabled);

        &--transparent-dark{
            --color: var(--c-text-inverse);
            --empty-color: var(--c-text-inverse-secondary);
            --background: var(--c-surface-neutral-low-inverse);
            --hov-background: var(--c-surface-neutral-med-inverse);
            --placeholder-color: var(--c-text-inverse-disabled);
        }

        &--transparent-light{
            --color: var(--c-text-default);
            --empty-color: var(--c-text-secondary);
            --background: var(--c-surface-neutral-low);
            --hov-background: var(--c-surface-neutral-med);
            --placeholder-color: var(--c-text-disabled);
        }

        --icon-color: var(--empty-color);

        position: relative;
        display: flex;
        align-items: center;
        width: 100%;
        height: 4.4rem;
        background: var(--background);
        transition: .3s;
        border-radius: .6rem;

        @include font-p4;
        color: var(--color);

        position: relative;
        @include blur-background(.6rem);

        &--focused{
            --icon-color: var(--color);

            .text-input{
                &__input{
                    &::placeholder{
                        color: var(--placeholder-color);
                    }
                }
            }
        }

        &:not(&--focused){
            .text-input-clear{
                pointer-events: none;
                @include hidden-hor(.8rem);
            }
        }

        @include hover{
            &:hover{
                background: var(--hov-background);
                --icon-color: var(--color);
            }
        }

        // &::after{
        //     @include pseudo-absolute;
        //     @include all-directions(0);
        //     pointer-events: none;
        //     border: .1rem solid var(--c-border-critical-main);
        //     border-radius: .6rem;
        //     transition: .3s;
        // }

        &:not(&--error){
            &::after{
                opacity: 0;
            }
        }

        &--disabled{
            pointer-events: none;
            color: var(--empty-color);
        }

        &--notFocusable{
            input{
                pointer-events: none;
            }
        }

        &__input{
            position: relative;
            width: 100%;
            height: 100%;
            padding: 0 var(--padding-x);
            color: inherit;
            overflow: hidden;
            border-radius: .6rem;

            &::placeholder{
                transition: .3s;
                color: var(--empty-color);
            }
        }

        &__icons{
            position: relative;
            display: flex;
            align-items: center;
            gap: .4rem;
            transition: .3s;

            color: var(--icon-color);

            --icon-size: 1.6rem;

            &:first-child{
                margin-left: var(--padding-x);
            }

            &:last-child{
                margin-right: var(--padding-x);
            }

            &:empty{
                display: none;
            }
        }

        &__icon{
            box-sizing: content-box;
            @include virtual-area(.2rem);
            transition: .3s;

            &--interactive{
                cursor: pointer;

                @include hover{
                    &:not(:hover){
                        color: var(--empty-color);
                    }
                }
            }

        }

        &--steps{
            .text-input{
                &__icons{
                    margin: 0;
                }

                &__input{
                    text-align: center;
                }
            }
        }
    }
</style>