<template>
    <component
        :is="component" 
        class="user-page-card" 
        :to="to" 
        transition-block 
        @mouseenter="hover = true"
        @mouseleave="hover = false"
    >
        <Card>
            <div class="user-page-card__title">
                <h4>{{ title }} <span v-if="num">({{ num }})</span></h4>
                <slot name="title"/>
            </div>
            <Button 
                v-if="to"
                type="transparent-light" 
                :icon-left="IconArrowRightUpLine"
                :="{hover}"
            />
            <slot/>
        </Card>
    </component>
</template>

<script setup>
    import { IconArrowRightUpLine } from '#components';

    const props = defineProps({
        title: String,
        num: [String, Number],
        to: [String, Object]
    })

    const hover = ref();

    const component = computed(()=>
        props.to?defineNuxtLink({}):'div'
    )
</script>

<style lang="scss" scoped>
    .user-page-card{
        --h: 24.8rem;

        height: var(--h);
        display: block;

        &__title{
            width: 100%;
            @include flex-jtf;
        }

        .card{
            height: 100%;
            @include flex-col;
            justify-content: space-between;
            --padding: 3.2rem;
        }

        h4{
            span{
                color: var(--c-text-disabled);
            }
        }

        .button{
            align-self: flex-end;
        }

        @include mobile{
            --h: 16rem;
            .card{
                --padding: 2.4rem;
            }

            h4{
                @include font-h3--mob;
            }
        }
    }
</style>