<template>
    <div class="edu-about content-wrapper">
        <SectionTitle
            class="edu-about__title"
            bullit="О курсе"
        >
            Профессиональное обучение <span nobr>для работы</span> <span nobr>с лазерными</span> аппаратами сварки
        </SectionTitle>
        <AnimText class="edu-about__description" transition-block>
            Этот курс обучения по лазерной сварке, рассчитанный на 240 минут, охватывает все аспекты работы с оборудованием — от настройки параметров до практических упражнений с тестовой сваркой. Программа включает следующие этапы:
        </AnimText>

        <div 
            class="edu-about__list"
            @mouseenter="floating = true"
            @mouseleave="floating = false"
        >
            <NuxtLink 
                v-for="(i,k) in list" 
                class="edu-about-link" 
                :to="''/*i.url*/" 
                style="cursor: default"
                transition-block
                @mouseenter="()=>{
                    activeItem = i;
                    i.hover = true;
                }"
                @mouseleave="i.hover = false"
            >
                <AnimText class="edu-about-link__num" duration="200">{{numerify(k + 1)}}</AnimText>
                <div class="edu-about-link__content">
                    <AnimText class="edu-about-link__title">{{ i.title }}</AnimText>
                    <AnimText class="edu-about-link__text">{{ i.description }}</AnimText>
                    <img 
                        v-if="i.image?.url"
                        class="edu-about-link__img edu-about__img mob-visible"
                        :src="normalizeAssetSrc(i.image?.url)"
                    />
                </div>
                <!-- <Button
                    class="edu-about-link__button desk-visible"
                    type="transparent-dark"
                    :icon-left="IconArrowRightUpLine"
                    :hover="i.hover"
                /> -->
            </NuxtLink>
        </div>

        <!-- <div 
            class="edu-about-floater desk-visible"
            :class="{'edu-about-floater--floating': floating && activeItem.image?.url}"
            :style="{
                top: `${y}px`,
                left: `${x}px`
            }"
        >
            <Image 
                class="edu-about__img"
                :src="activeItem.image?.url"
                :ratio="280/204"
                fit="cover"
            />
        </div> -->
    </div>
</template>

<script setup>
    import img from './data/image.webp';
    import { IconArrowRightUpLine } from '#components'

    const numerify = (num) => num.toString().padStart(2, '0');
    
    // notdone [API]
    const {data: list} = await useAPI('/education');
    const activeItem = ref(list.value[0]);

    const floating = ref();
    
    const {x,y} = usePointer();
    
</script>

<style lang="scss" scoped>
    .edu-about{

        &__description{
            margin-top: 2.4rem;
            margin-bottom: 6.4rem;
            max-width: 69.2rem;
        }

        &__list{
            border-radius: 1.2rem;
            overflow: hidden;
        }

        &__img{
            border-radius: .6rem;
            object-fit: cover;
            overflow: hidden;
        }
    }

    .edu-about-link{
        --gap: 3.2rem;

        display: flex;
        align-items: center;
        color: var(--c-text-inverse);
        background: var(--c-surface-neutral-main);
        padding: var(--gap);
        gap: var(--gap);
        width: 100%;

        &__num{
            @include font-h3;
            width: 12.8rem;
            white-space: nowrap;
        }

        &__content{
            max-width: 60rem;
        }

        &__button{
            margin-left: auto;
        }

        &__title{
            @include font-h4;
            margin-bottom: 1.2rem;
        }

        &:not(:last-child){
            border-bottom: .1rem solid var(--c-border-neutral-med-inverse);
        }
    }

    .edu-about-floater{
        position: fixed;
        top: 0;
        left: 0;
        transform: translate(calc(-100% - 3.2rem), -50%);
        width: 28rem;
        pointer-events: none;
        z-index: 5;

        &:not(&--floating){
            opacity: 0
        }
    }

    @include desktop{
        .edu-about{
            &__description{
                @include font-p2;
            }
        }
        
        .edu-about-link{
            &__text{
                @include font-p2;
            }
        }
    }

    @include mob-display;

    @include mobile{
        .edu-about{
            &__description{
                margin-bottom: 3.2rem;
            }
        }

        .edu-about-link{
            --gap: 2.4rem;
            @include flex-col;
            align-items: start;

            &__num{
                width: auto;
                margin-bottom: 2.4rem;
                @include font-h4;
            }

            &__title{
                @include font-h3--mob;
                margin-bottom: 1.2rem;
            }

            &__img{
                margin-top: 1.6rem;
                width: 100%;
                height: 20.4rem;
            }
        }
    }
</style>