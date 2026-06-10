<template>
    <div class="category-advantages content-wrapper">
        <SectionTitle
            bullit="основные преимущества"
            class="category-advantages__title"
        >
            Наши передовые решения <span nobr>для вашего</span> бизнеса
        </SectionTitle>

        <div class="category-advantages__cards" transition-block>
            <div v-for="i in list" class="category-advantages-card">
                <div class="category-advantages-card__icon">
                    <Image :src="i.icon.url"/>
                </div>
                <h3 class="category-advantages-card__title font-h3">
                    {{ i.title }}
                </h3>
                <p class="category-advantages-card__description">{{ i.description }}</p>
            </div>
        </div>
    </div>
</template>

<script setup>
    import { animate, onScroll, stagger } from 'animejs';

    import {
        IconPencilRuler2Fill,
        IconTimerFlashFill,
        IconLeafFill
    } from '#components'

    const props = defineProps({
        info: Object
    });

    // notdone [API] хендлить != 3 категории в css
    const list = computed(() => props.info?.advantages?.filter(e => e.publish) || [])

    let anim;
    onMounted(()=>{
        const el = document.querySelector(".category-advantages-card");
        if (!el?.isConnected) return;
        anim = animate(".category-advantages-card", {
            translateY: [-200, 0],
            translateX: [100, 0],
            ease: 'easeInOut',
            opacity: [0, 1],
            delay: stagger(300),
            duration: 800,
            autoplay:  onScroll()
        })
    });
    // onBeforeUnmount(()=>anim?.revert?.());
</script>

<style lang="scss" scoped>
    .category-advantages{
        &__title{
            margin-bottom: 6.4rem;
        }

        &__cards{
            @include grid(repeat(3, 1fr), 2rem);

            >*{
                &:first-child:last-child{
                    grid-column: 1/-1;
                }
            }
        }
    }

    .category-advantages-card{
        @include flex-col;
        min-height: 42rem;
        padding: 2.4rem;
        border-radius: 1.2rem;
        background-color: var(--c-surface-neutral-secondary);

        &__icon{
            margin-bottom: 4.8rem;
            width: fit-content;
            padding: 2rem;
            color: var(--c-text-accent);
            background: var(--c-surface-neutral-main-inverse);
            border-radius: .6rem;
            @include shadow('xs');

            --icon-size: 3.2rem;

            .image{
                width: var(--icon-size);
            }
        }

        &__title{
            margin-top: auto;
            margin-bottom: .8rem;
        }

        &__description{
            color: var(--c-text-secondary);
        }
    }

    @include mobile(1000px){
        .category-advantages{
            &__cards{
                @include grid(repeat(2, 1fr), 2rem);
            }
        }

        .category-advantages-card{
            &:first-child{
                grid-column: 1/-1;
            }

            min-height: auto;
        }
    }

    @include mobile(720px){
        .category-advantages{
            &__cards{
                @include grid(1fr, .8rem);
            }
        }
    }

    @include mobile(720px){
        .category-advantages{
            &__title{
                margin-bottom: 3.2rem;
            }
        }

        .category-advantages-card{
            padding: 1.6rem;

            &__icon{
                padding: 1.4rem;
                --icon-size: 1.8rem;
            }

            &__title{
                @include font-h3--mob
            }
        }
    }
</style>