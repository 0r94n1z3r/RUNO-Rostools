<template>
    <div class="v-close close" :style="{margin: -(3 - Number(size)/10) / 2 + 'rem'}">
        <Icon class="close-icon" :="{icon, size}"/>
    </div>
</template>

<script setup>
    import { IconX16, IconX20, IconX24, } from '#components'; 

    const props = defineProps({
        size: {
            type: [String, Number],
            default: 24
        }
    })

    const icon = computed(()=>{
        return {
            12: IconX16,
            16: IconX16,
            20: IconX20,
            24: IconX24,
        }[props.size]
    })
</script>

<style lang="scss" scoped>
    .close{
        color: var(--black-40);
        transition: .3s;
        cursor: pointer;
        width: 3rem;
        height: 3rem;
        flex-shrink: 0;
        margin: -0.3rem;
        @include flex-c;

        @media (hover: hover) {
            &:hover{
                color: var(--black-100);
            }
        }
    }
</style>