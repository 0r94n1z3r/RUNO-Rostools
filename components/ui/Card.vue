<template>
    <component 
        :is="component" 
        :to="isA?null:to"
        :href="isA?to:null"
        class="card"
        :class="`card--${type}`"
    >
        <slot />
    </component>
</template>

<script setup>
    const props = defineProps({
        type: { // dark / light / white / transparent-dark
            type: String,
            default: 'light'
        },
        to: [String, Object],
        isA: Boolean
    });

    const component = computed(()=>
        props.isA?
            'a':
            props.to?
                defineNuxtLink({}):
                'div'
    )

</script>

<style lang="scss" scoped>
    .card{
        --background: var(--c-surface-neutral-secondary);
        --padding: 2.4rem;
        --radius: 1.2rem;

        &--dark{
            --background: var(--c-surface-neutral-main);
            color: var(--c-text-inverse);
        }

        &--transparent-dark{
            --background: var(--c-surface-neutral-low-inverse);
        }

        &--white{
            --background: var(--c-surface-neutral-main-inverse);
            border: .1rem solid var(--c-border-neutral-low);
        }

        background: var(--background);
        border-radius: var(--radius);
        padding: var(--padding);

        @include mobile{
            --padding: 1.6rem;
        }
    }
</style>