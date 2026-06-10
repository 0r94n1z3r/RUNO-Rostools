<template>
    <div class="checkboxes-input">
        <Checkbox 
            v-for="i in model.slice(0, drop?undefined:limit)"
            v-model="i.value" 
            :="i"
        />
        <p
            v-if="limit < model.length"
            class="drop"
            @click="drop = !drop"
        >
            <template v-if="!drop">Показать все ({{ model.length }})</template>
            <template v-else>Скрыть</template>
        </p>
    </div>
</template>

<script setup>
    const props = defineProps({
        limit: {
            type: Number,
            default: 3
        },
    })

    const model = defineModel() // [{title: String, value: Boolean, string: String}]

    const drop = defineModel('drop', {default: false});
</script>

<style lang="scss" scoped>
    .checkboxes-input{
        @include flex-col;
        gap: 1.6rem;
    }

    .drop{
        color: var(--c-text-accent);
        cursor: pointer;
        transition: .3s;
        @include font-p4;

        @media (hover: hover){
            &:hover{
                color: var(--c-brand-300);
            }
        }
    }
</style>