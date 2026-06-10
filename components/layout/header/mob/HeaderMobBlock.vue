<template>
    <div class="header-mob-block">
        <h4 v-if="title" class="header-mob-block__title">{{ title }}</h4>
        <div 
            v-for="i in list" 
            :key="i.id" 
            class="header-mob-block-list-option" 
            @click="emit('clicked', i)"
        >
            <div class="header-mob-block-list-option__title">
                <Icon v-if="i.icon" :icon="i.icon"/>
                <p>{{ i.title }}</p>
            </div>
            <div class="header-mob-block-list-option__icon">
                <IconArrowRightSLine/>
            </div>
        </div>
    </div>
</template>

<script setup>
    const props = defineProps({
        title: String,
        list: Array,
        icon: Object
    });

    const emit = defineEmits(['clicked']);
</script>

<style lang="scss" scoped>
    .header-mob-block{
        padding: 1.6rem 0;

        &__title{
            @include font-c3;
            margin-bottom: 1.6rem;
            color: var(--c-text-disabled);
        }

        .icon{
            --icon-size: 2rem;
        }
    }

    .header-mob-block-list-option{
        @include flex-jtf;
        align-items: center;
        gap: .8rem;
        min-height: 4.4rem;
        padding: .4rem 0;
        cursor: pointer;
        border-radius: .6rem;
        transition: .3s;

        @include hover{
            &:hover{
                background: var(--c-surface-neutral-low);
            }
        }

        &:active{
            transition: .01s;
            background: var(--c-surface-neutral-med);
        }

        &__title{
            display: flex;
            gap: .4rem;
            @include font-p3;
            font-weight: 500;

            .icon{
                color: var(--c-text-accent);
            }
        }

    }
</style>