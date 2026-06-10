<template>
    <div class="empty">
        <AnimText v-if="title" class="empty__title" immediate transition-block>{{ title }}</AnimText>
        <AnimText v-if="description" class="empty__description" immediate delay="300" transition-block>{{ description }}</AnimText>
        <AnimButton v-if="hasButton" class="empty__button" immediate :icon-left="IconArrowLeftLine" delay="600" :to="'/'" transition-block>На главную</AnimButton>
        <slot />
    </div>
</template>

<script setup>
    import { IconArrowLeftLine } from '#components';

    const props = defineProps({
        title: String,
        description: String,
        hasButton: Boolean
    });
</script>

<style lang="scss" scoped>
    .empty{
        &__title{
            @include font-h4;
            margin-bottom: .8rem;
            width: fit-content;
        }

        &__description{
            color: var(--c-text-secondary);
            margin-bottom: 1.6rem;
            width: fit-content;
        }

        @include mobile{
            &__button{
                width: 100%;
            }
        }
    }
</style>