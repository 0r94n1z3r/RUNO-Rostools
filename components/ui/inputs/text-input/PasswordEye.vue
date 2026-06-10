<template>
    <div 
        class="password-eye"
        @click="model = !model"
    >
        <!-- <IconEye24 v-if="model"/> -->
        <!-- <IconEyeOff24 v-else/> -->
    </div>
</template>

<script setup>
    const props = defineProps({
        size: [String, Number]
    })

    const model = defineModel();
</script>

<style lang="scss" scoped>
    .password-eye{
        cursor: pointer;
        @include virtual-area(calc(var(--padding-x) / 2));
    }
</style>