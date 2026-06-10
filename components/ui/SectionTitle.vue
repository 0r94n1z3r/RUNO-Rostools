<template>
    <div 
        class="section-title title" 
        :class="{'section-title--inverse': inverse}" 
    >
        <Bullit transition-block :component="bullitComponent">{{ props.bullit }}</Bullit>
        <Breadcrumbs v-if="breadcrumbs" class="section-title__breadcrumbs" :="breadcrumbs"/>
        <AnimText v-if="$slots.default" :component="titleComponent" class="section-title__title" transition-block><slot/></AnimText>
    </div>
</template>

<script setup>

    const props = defineProps({
        bullit: String,
        inverse: Boolean,
        titleComponent: {
            type: [String, Object],
            default: 'h2'
        },
        bullitComponent: {
            type: [String, Object],
            default: 'p'
        },
        breadcrumbs: Object
    });
</script>

<style lang="scss" scoped>
    .section-title{
        :deep(.title-gray){
            color: var(--c-text-disabled);
        }

        @include mobile{
            &__title{
                @include font-h1--mob;
            }
        }

        &--inverse{
            color: var(--c-text-inverse);

            .bullit{
                color: var(--c-text-inverse);
            }
            
            :deep(.title-gray){
                color: var(--c-text-inverse-disabled);
            }
        }

        &__breadcrumbs{
            margin-bottom: 1.6rem;
        }
    }
</style>