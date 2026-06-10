<template>
    <Component
        :is="component"
        :to="to"
        :="$attrs"
        :class="[
            `button`,
            `button--${type}`,
            `button-size--${size}`,
            `${isEmpty && 'button--icon' || ''}`,
            `${square && 'button--icon' || ''}`,
            `${disabled && 'button--disabled' || ''}`,
            `${loading && 'button--loading' || ''}`,
            `${hover && 'button--hover' || ''}`,
        ]"
    >
        <div 
            class="button__status"
            :class="{
                'button__status--none': !status,
                'button__status--transition': statusTransition
            }
            "
        >
            {{ status }}
        </div>
        <Icon 
            v-if="iconLeft"
            :icon="iconLeft" 
            class="button__icon button__icon--left"
        />
        <div 
            v-if="!isEmpty"
            class="button__content"
        >
            <slot/>
        </div>
        <Icon 
            v-if="iconRight"
            :icon="iconRight" 
            class="button__icon button__icon--right"
        />
        <div class="button__loading">
            <Loader/>
        </div>
    </Component>
</template>

<script setup>

    const props = defineProps({
        to: [String, Object],
        iconLeft: Object,
        iconRight: Object,
        iconSize: [String, Number],
        type: { // dark / light / accent / transparent / transparent-light
            type: String, 
            default: 'dark'
        },
        size: { // m / s
            type: String,
            default: 'm'
        },
        disabled: Boolean,
        loading: Boolean,
        square: Boolean,
        hover: Boolean,
        status: [String, Number]
    })

    const component = computed(()=>
        props.to?defineNuxtLink({}):'div'
    )

//empty
    const slots = useSlots();
    const isEmpty = computed(()=>!slots.default); 

//status
    const statusTransition = ref(false);
    watch(() => props.status, () => {
        statusTransition.value = true;
        setTimeout(() => statusTransition.value = false, 150);
    })
</script>

<style lang="scss" scoped>
    .button{
        --color: var(--c-text-inverse);
        --color-hov: var(--c-text-inverse);
        --color-active: var(--c-text-inverse);
        --color-disabled: var(--c-text-disabled);

        --background: var(--c-surface-neutral-main);
        --background-hov: var(--c-surface-accent-hover);
        --background-active: var(--c-surface-accent-press);
        --background-disabled: var(--c-surface-neutral-med);

        --brd: var(--background);
        --brd-hov: var(--background-hov);
        --brd-active: var(--background-active);
        --brd-disabled: var(--c-border-neutral-main);

        --gap: .2rem;
        --rad: .6rem;

        --pad-x: 3.2rem;
        --pad-y: .4rem;

        --mh: 4.4rem;

        --icon-size: 1.6rem;

        &--light{
            --color: var(--c-text-default);

            --background: var(--c-white);
            --background-disabled: var(--c-white);

            --brd: var(--c-border-neutral-main);
        }

        &--transparent,
        &--transparent-dark{
            --color: var(--c-text-inverse);
            --background: var(--c-surface-neutral-low-inverse);
            --brd: var(--c-border-neutral-high-inverse);
            @include blur-background(var(--rad));
        }

        &--transparent-light{
            --color: var(--c-text-default);
            --background: var(--c-surface-neutral-high-inverse);
            --brd: var(--c-border-neutral-main);
            @include blur-background(var(--rad));
        }

        &--accent{
            --background: var(--c-surface-accent-main);
        }

        cursor: pointer;
        display: flex;
        align-items: center;
        justify-content: center;
        text-align: center;
        width: max-content;
        border-radius: var(--rad);
        transition: .3s;
        position: relative;

        min-height: var(--mh);

        user-select: none;

        padding: var(--pad-y) var(--pad-x);

        @include font-p4;

        flex-shrink: 0;

        background: var(--background);
        border: .1rem solid var(--brd);
        color: var(--color);

        gap: var(--gap);

        &--icon{
            width: var(--mh)!important;
            height: var(--mh)!important;
            --pad-x: 0;
            --pad-y: 0;
        }

        &--disabled{
            pointer-events: none;
            background: var(--background-disabled);
            color: var(--color-disabled);
            border-color: var(--brd-disabled);
        }

        &-size{
            &--s{
                --mh: 3.6rem;
                --pad-x: 1.2rem;
                --pad-y: .4rem;
                --icon-size: 1.2rem;

                &.button--icon{
                    --mh: 3.2rem;
                }
            }
        }

        //hover
            @mixin hov(){
                background: var(--background-hov);
                color: var(--color-hov);
                border-color: var(--brd-hov);
            }

            @include hover{
                &:hover{
                    @include hov;
                }
            }

            &--hover{
                @include hov;
            }

        //active
            &:active{
                background: var(--background-active);
                color: var(--color-active);
                border-color: var(--brd-active);
                transition: .01s;
            }

        &__content{
            display: flex;
            gap: var(--gap);
            align-items: center;
            position: relative;
            white-space: nowrap;
        }

        &__loading{
            position: absolute;
            @include all-directions(0);
            @include flex-c;

            .loading{
                --color: var(--color);
            }
        }

        &__icon{
            position: relative;
        }

        &--loading{
            pointer-events: none;

            .icon,
            .button__content
            {
                @include hidden(0);
            }
        }

        &:not(&--loading){
            .button__loading{
                @include hidden(0);
            }
        }

        :deep(.icon){
            height: var(--icon-size);
            width: var(--icon-size);
        }

        &__status{
            position: absolute;
            top: -.8rem;
            right: -.8rem;
            border-radius: 2.4rem;
            height: 1.6rem;
            min-width: 1.6rem;
            background: var(--c-surface-accent-main);
            white-space: nowrap;
            @include flex-c;
            font-size: 1rem;
            line-height: 1rem;
            color: var(--c-text-inverse);
            padding: 0.3rem;
            @include transition-bounce;
            transition-duration: .3s;
            will-change: scale;

            &--none{
                scale: 0;
            }

            &--transition{
                scale: 0.5;
            }
        }
    }
</style>