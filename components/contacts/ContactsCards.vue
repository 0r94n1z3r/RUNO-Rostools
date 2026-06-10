<template>
    <div class="contacts-cards">
        <Card 
            v-for="(i,k) in list" 
            :ref="e => refs[k] = e" 
            class="contacts-cards-card"
            :class="[`contacts-cards-card--${type}`]"
            :to="i.to"
            :="{type}"
            transition-block
            target="_blank"
            @mouseenter="i.hover = true"
            @mouseleave="i.hover = false"
        >
            <p class="contacts-cards-card__title" v-html="i.title"></p>
            <p class="contacts-cards-card__value">{{i.value}}</p>
            <Button
                class="contacts-cards-card__button"
                :type="btnType"
                :icon-left="IconArrowRightUpLine"
                :hover="i.hover"
                :style="{opacity: i.to?1:0}"
            />
        </Card>
    </div>
</template>

<script setup>
    import { IconArrowRightUpLine } from '#components';

    const props = defineProps({
        list: Array,
        type: { // dark / light / transparent-dark
            type: String,
            default: 'light'
        },
    });

    const refs = ref([]);

    const btnType = computed(()=>({
        'dark': 'light',
        'light': 'transparent-light',
        'transparent-dark': 'transparent-dark',
    }[props.type]));

</script>

<style lang="scss" scoped>
    .contacts-cards{
        @include grid(repeat(3, 1fr), 2rem);

        @include mobile(850px){
            @include grid(1fr, .8rem);
        }
    }

    .contacts-cards-card{
        --title-color: var(--c-text-secondary);

        @include flex-col;
        justify-content: space-between;
        height: 30rem;
        
        &--transparent-dark{
            --title-color: var(--c-text-inverse-secondary);
        }

        &__title{
            color: var(--title-color);
            @include font-c2;
        }

        &__value{
            @include font-h4;
            text-align: center;
        }

        &__button{
            align-self: flex-end;
        }

        @include mobile{
            &__value{
                @include font-h2--mob;
            }
        }
    }
</style>