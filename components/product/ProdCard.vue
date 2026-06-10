<template>
    <ProdCardPlaceholder v-show="info.loading"/>
    <div v-show="!info.loading" class="prod-card card-cover-container" :transition-block="transitionBlock || null">
        <a :href="`/product/${info?.name}`" class="seo-link">{{ info?.title }}</a>

        <a ref="mediaRef" :href="`/product/${info?.name}`" class="prod-card__media" @click="handleTransition">
            <ProdCardActions v-if="hasActions" :="{actions, info}" @delete="emit('delete', $event)"/>
            <ProdCardPhoto :="{info, hasParallax}"/>
        </a>

        <a class="prod-card__title" :href="`/product/${info?.name}`" @click="handleTransition">
            <ProdCardTitle :="{info}"/>
            <p class="prod-card__sub">{{ info?.short_description }}</p>
        </a>

        <div class="prod-card__statuses">
            <ProdCardStatus :="{info}" type="string"/>
        </div>
        <ProdCardPrice :="{info}"/>

        <div v-if="hasButtons" class="prod-card__buttons">
            <a :href="`/product/${info?.name}`" @click="handleTransition">
                <Button>Подробнее</Button>
            </a>
            <ProdCardButton 
                :="{info}"
                :has-counter="false"
            />
        </div>
    </div>
</template>

<script setup>
    const props = defineProps({
        info: Object,
        hasButtons: {
            type: Boolean,
            default: true
        },
        hasActions: {
            type: Boolean,
            default: true
        },
        actions: {
            type: Array,
            default: () => ['fav']
        },
        hasParallax: {
            type: Boolean,
            default: true
        },
        transitionBlock:{
            type: Boolean,
            default: true
        },
        loading: Boolean
    });

    const emit = defineEmits('delete');

//transition
    const mediaRef = ref();

    const handleTransition = (e) => {
        if (e.ctrlKey || e.metaKey || e.shiftKey || e.altKey || e.button !== 0)return;
        e.preventDefault();

        const {x,y,width,height} = mediaRef.value.getBoundingClientRect();
        useProdTransition().transit(props.info,x,y,width,height);
    }
</script>

<style lang="scss" scoped>
    .prod-card{
        @include flex-col;
        width: 100%;
        height: 100%;
        cursor: pointer;

        --actions-shift: 1.6rem;

        &__media{
            position: relative;
            margin-bottom: 2.4rem;
        }

        :deep(){
            .prod-card-actions,
            .slider-arrows .button
            {   
                z-index: 3;
            }

            .slider-arrows{
                padding: var(--actions-shift);
            }
        }

        &__title{
            margin-bottom: .8rem;
        }

        &__statuses{
            margin-bottom: .8rem;
            display: flex;
            gap: .8rem;
            margin-top: auto;

            :deep(.badge){
                height: 2.8rem;
                padding: 0 1.2rem;
            }
        }

        &__buttons{
            margin-top: 1.2rem;
            @include grid(repeat(2, 1fr), .8rem);

            >*{
                width: 100%;
                @include transition-bounce;

                >*{
                    width: 100%;
                }
            }

            >:last-child{
                transition-delay: .1s;
            }
        }

        &__sub{
            margin-bottom: .8rem;
            @include font-p4;
            color: var(--c-text-secondary);
        }

        @include hover{
            &:hover{
                .prod-card-title{
                    color: var(--c-text-accent)
                }
            }

            &:not(:hover){
                .prod-card__buttons>*{
                    /*opacity: 0;*/
                    /*transform: scale(.95) translateY(-1rem);*/
                }
            }
        }
    }

    // .prod-card-status{
    //     position: absolute;

    //     left: var(--actions-shift);
    //     top: var(--actions-shift);
    //     z-index: 1;

    //     @include mobile{
    //         --actions-shift: 1.6rem;
    //     }
    // }

    .prod-card-actions{
        position: absolute;
        right: var(--actions-shift);
        top: var(--actions-shift);
        z-index: 1;
    }

    .prod-card-title{
        margin-bottom: .4rem;
    }

    .prod-card-price{
        // margin-top: auto;
    }


</style>