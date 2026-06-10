<template>
    <Component
        :is="component"
        class="dropdown-item" 
        :to="to"
        @click="emit('close');"
    >
        <Icon v-if="icon" :icon="icon" size="16"/>
        <p>
            <slot/>
        </p>
    </Component>
</template>

<script setup>
    const props = defineProps({
        to: [String, Object],
        icon: Object
    })

    const emit = defineEmits(['close'])

    const component = computed(()=>
        props.to?defineNuxtLink({}):'div'
    )
</script>

<style lang="scss" scoped>
    .dropdown-item{
        min-height: 4.8rem;
        padding: 1.4rem 1.4rem;
        border-radius: .6rem;
        cursor: pointer;
        display: block;

        transition: .3s;

        display: flex;
        gap: .6rem;

        .icon{
            margin-top: .2rem;
        }

        &:not(:last-child){
            margin-bottom: .6rem;
        }

        @include hover{
            &:hover{
                background: var(--c-surface-neutral-low);
            }
        }

        &:active{
            transition: .01s;
            background: var(--c-surface-neutral-med);
        }
    }
</style>