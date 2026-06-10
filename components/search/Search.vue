<template>
    <TextInput
        class="search"
        :="{placeholder: 'Поиск', ...$attrs}"
    >
        <template #pre>
            <IconSearch2Line/>
        </template>
    </TextInput>
</template>

<script setup>
    import { IconSearch2Line } from '#components';
</script>

<style lang="scss" scoped>

</style>