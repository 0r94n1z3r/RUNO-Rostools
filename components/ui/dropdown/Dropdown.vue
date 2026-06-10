<template>
    <div 
        ref="dropdownRef"
        class="dropdown"
        :class="[
            (called && allowCalled) ? 'dropdown--called' : null,
            `dropdown--${direction}`,
            `dropdown--${styleType}`,
            `dropdown--flaps-${flaps}`,
        ]"
    >
        <div
            class="dropdown__slot-caller" 
            @click="switchCalled('click')"
            @mouseover="switchCalled('hover', true)"
        >
            <slot name="caller"/>
        </div>
        <div v-if="title && !slotCaller" class="dropdown__caller">
            <div 
                v-if="title" 
                class="dropdown__title" 
                @click="switchCalled('click')"
                @mouseover="switchCalled('hover', true)"
            >
                <p>{{ title }}</p>
                <IconArrowDropDownLine/>
            </div>
        </div>
        <div 
            class="dropdown__container" 
            @mouseleave="switchCalled('hover', false)"
        >
            <slot :close="()=>{called = false}"/>
        </div>
    </div>
</template>

<script setup>
    import { IconArrowDropDownLine } from '#components';

    const props = defineProps({
        title: String,
        direction: { // left / right
            type: String,
            default: 'left'
        },
        to: [Object, String],
        styleType: { // light / transparent-dark / transparent-light
            type: String,
            default: 'default'
        },
        flaps: { // default / tight
            type: String,
            default: 'default'
        },
        mode: {
            type: String,
            default: 'click' // click / hover / custom
        },
        allowCalled: {
            type: Boolean,
            default: true
        },
        customCalled: Boolean
    });

    const emit = defineEmits(['called']);

    const dropdownRef = ref();

    const called = defineModel('called',false);
    watch(called, (value)=>emit('called', value))

    onClickOutside(dropdownRef, () => called.value = false);
    watch(()=>R().path, () => called.value = false);

    const switchCalled = (type, value)=>{
        if(type == 'custom') return;
        if(type == props.mode) called.value = value ?? !called.value;
    }

    //empty
        const slots = useSlots();
        const slotCaller = computed(()=>!!slots.caller); 
</script>

<style lang="scss" scoped>
    .dropdown{
        --w: 20rem;
        --mx-h: unset;
        --flaps: 1.2rem;
        --shift: .4rem;
        
        --color: inherit;
        --background: transparent;
        --hov-background: var(--c-surface-neutral-med);

        &--transparent-dark{
            --color: var(--c-text-inverse);
            --background: var(--c-surface-neutral-low-inverse);
            --hov-background: var(--c-surface-neutral-med-inverse);
        }

        &--transparent-light{
            --color: var(--c-text-default);
            --background: var(--c-surface-neutral-low);
            --hov-background: var(--c-surface-neutral-med);
        }

        &--flaps-tight{
            --flaps: 0rem;
        }

        color: var(--color, var(--color));

        position: relative;
        height: 4.4rem;
        @include flex-c;
        user-select: none;
        z-index: 8;
        
        &__slot-caller:empty{display: none;}

        &__caller{
            height: 100%;
            width: 100%;
            cursor: pointer;
        }
        
        &__title{
            @include flex-jtf;
            align-items: center;
            gap: .2rem;
            white-space: nowrap;
            height: 100%;
            transition: .3s;
            position: relative;
            padding: 0 calc(1.2rem - var(--flaps));

            --a-background: var(--background, var(--background));
            --a-transition: .3s;

            .icon{
                --icon-size: 2rem;
                transition: .3s;
            }
            
            @include hover{
                &:hover{
                    --a-background: var(--hov-background, var(--hov-background));
                }
            }

            &:active{
                --a-transition: .01s;
                --a-background: var(--c-surface-neutral-med);

                .icon{
                    transition: .1s;
                    transform: translateY(.2rem);
                }
            }

            &::after{
                @include pseudo-absolute;
                height: 100%;
                width: calc(100% + calc(var(--flaps) * 2));
                left: calc(var(--flaps) * -1);
                right: 0;
                background: var(--a-background);
                transition: var(--a-transition);
                border-radius: .6rem;
                pointer-events: none;
            }

            &>*{
                position: relative;
                z-index: 1;
            }
        }

        &__container{
            position: absolute;
            top: calc(100% + var(--shift));
            @include shadow;
            padding: 1.2rem;
            border-radius: 1.2rem;
            background: var(--background, var(--background, var(--c-surface-neutral-main)));
            border: .1rem solid var(--border, var(--border, var(--c-border-neutral-low)));
            width: var(--w);
            max-height: var(--mx-h);
            overflow-y: auto;
            overflow-x: hidden;
            overscroll-behavior: contain;

            backdrop-filter: blur(4rem);

            @include transition-bounce;
        }

        &--right{
            .dropdown__container{
                right: 0;
            }
        }

        &--left{
            .dropdown__container{
                left: 0;
            }
        }


        &--called{
            .dropdown__title{
                .icon{
                    transform: rotate(180deg);
                }
            }
        }

        &:not(&--called){
            .dropdown{
                &__container{
                    @include hidden(-1rem);
                }
            }
        }
    }
</style>