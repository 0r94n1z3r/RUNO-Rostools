<template>
    <div 
        class="textarea-input"
        :class="[
            isFocused ? 'textarea-input--focused' : null,
            disabled ? 'textarea-input--disabled' : null,
            error ?'textarea-input--error' : null,
            limit ?'textarea-input--limit' : null,
            `textarea-input--${styleType}`
        ]"
        @click="focus"
    >
        <textarea 
            ref="inputRef"

            v-model="model"
            class="textarea-input__input"
            type="text"
            cols

            :="{
                placeholder,
                rows
            }"

            @focus="focusHandler"
            @blur="blurHandler"
        /> 
        <div v-if="hasLimit" class="textarea-input__limit font-c3">
            {{ model?.length || 0 }} / {{ limit }}
        </div>
        <div class="textarea-grab">
            <IconTextareaGrab class="textarea-grab__icon" size="16"/>
        </div>
    </div>
</template>

<script setup>
    const props = defineProps({
        placeholder: String, 
        disabled: Boolean,
        error: null,
        limit: Number,
        rows: {
            type: Number,
            default: 3
        },
        styleType: { // light / transparent-dark / transparent-light
            type: String,
            default: 'default'
        },
    })

    const emit = defineEmits(['focus','blur'])

    
    const model = defineModel();
    
    watch(model, (n, o) => {
        if(!hasLimit.value)return;
        
        if(n.length > props.limit){
            if(o == 0){
                model.value = n.slice(0, props.limit);
                return;
            }
            model.value = o;
        }
    })
    
    
//limit
    const hasLimit = computed(() => props.limit != null);
    
//focus/blur
    const inputRef = ref();

    const isFocused = ref(false);

    const focus = ()=>{
        inputRef.value.focus();
    }

    const focusHandler = ()=>{
        isFocused.value = true;
        emit('focus');
    }

    const blur = ()=>{
        inputRef.value.blur();
    }

    const blurHandler = ()=>{
        isFocused.value = false;
        emit('blur');
    }

    defineExpose({
        focus,
        blur
    })
</script>

<style lang="scss" scoped>
    .textarea-input{
        --padding-x: 1.2rem;
        --color: var(--c-text-default);
        --empty-color: var(--c-text-secondary);
        --background: var(--c-surface-neutral-secondary);
        --hov-background: var(--c-surface-neutral-med);
        --placeholder-color: var(--c-text-disabled);

        --mh: 4lh;

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

        position: relative;
        display: flex;
        align-items: center;
        width: 100%;
        background: var(--background);
        transition: .3s;
        border-radius: .6rem;
        overflow: hidden;

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

        &--error{
            // notdone ::after
        }

        &--disabled{
            pointer-events: none;
            color: var(--empty-color);
        }

        &--notFocusable{
            textarea{
                pointer-events: none;
            }
        }

        &__input{
            position: relative;
            width: 100%;
            height: 100%;
            color: inherit;
            resize: vertical;
            padding: 1.4rem var(--padding-x);
            min-height: var(--mh);
            // overscroll-behavior: contain;

            &::placeholder{
                transition: .3s;
                color: var(--empty-color);
            }
        }

        &--limit{
            margin-bottom: 2.8rem;
        }

        &__limit{
            position: absolute;
            top: calc(100% + .8rem);
            right: .5rem;
            color: var(--black-40)
        }

        @media (max-width: $mobile) {
            --padding-x: .8rem;
            --padding-y: .8rem;
            --border-radius: .8rem;
        }
    }

    .textarea-grab{
        position: absolute;
        bottom: 0;
        right: 0;
        pointer-events: none;
        background: var(--white);
        color: var(--empty-color);
        backdrop-filter: blur(.6rem);
        border-radius: .6rem 0 0 0;
    }
</style>