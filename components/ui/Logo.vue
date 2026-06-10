<template>
    <Component :is="component" class="logo" :to="to">
        <LogoSVG class="logo__icon" />
    </Component>
</template>

<script setup>
    import LogoSVG from '@/assets/icons/logo/logo.svg?component'

    const props = defineProps({
        to: [String, Object]
    })

    const component = computed(()=>
        props.to?defineNuxtLink({}):'div'
    )
</script>

<style lang="scss" scoped>
    .logo{
        display: block;
        flex-shrink: 0;

        &__icon{
            display: block;
            width: 100%;
            height: 100%;
        }
    }
</style>