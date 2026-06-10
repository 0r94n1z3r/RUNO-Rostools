<template>
    <div class="edu-advantages content-wrapper">
        <SectionTitle 
            bullit="преимущества обучения"
        >
            Наши передовые решения для вашего бизнеса
        </SectionTitle>

        <div class="edu-advantages__cards">
            <Card v-for="i in list" class="edu-advantage-card" transition-block>
                <div class="edu-advantage-card__icon">
                    <Icon :icon="i.icon"/>
                </div>
                <div class="edu-advantage-card__content">
                    <AnimText class="edu-advantage-card__title">{{ i.title }}</AnimText>
                    <AnimText class="edu-advantage-card__text">{{ i.text }}</AnimText>
                </div>
            </Card>
        </div>
    </div>
</template>

<script setup>
    import { 
        IconLeafFill,
        IconPencilRuler2Fill,
        IconTimerFlashFill
    } from "#components";

    const list = ref([
        {
            title: "Гибкость программы",
            text: "Обучение может быть адаптировано под специфические требования вашего производства",
            icon: IconLeafFill
        },
        {
            title: "Практическая направленность",
            text: "Ваши сотрудники получат не только теоретические знания, но и практический опыт работы с реальным оборудованием",
            icon: IconPencilRuler2Fill
        },
        {
            title: "Поддержка специалистов",
            text: "Наши инженеры будут сопровождать вас на всех этапах — от настройки до работы на оборудовании.",
            icon: IconTimerFlashFill
        },
    ])
</script>

<style lang="scss" scoped>
    .edu-advantages{
        --title-margin: 6.4rem;
        --icon-size: 4rem;
        --icon-pad: 2rem;

        &__cards{
            margin-top: var(--title-margin);
            @include grid(repeat(3, 1fr), 2rem);
        }
    }

    .edu-advantage-card{
        gap: 4.8rem;
        
        @include flex-col;

        &__icon{
            padding: var(--icon-pad);
            color: var(--c-text-accent);
            background: var(--c-surface-neutral-main-inverse);
            border-radius: .6rem;
            @include shadow('xs');
            width: fit-content;

            .icon{
                --icon-size: var(--icon-size);
            }
        }

        &__content{
            margin-top: auto;
        }

        &__title{
            @include font-h3;
            margin-bottom: .8rem;
        }

        &__text{
            color: var(--c-text-secondary);
        }

        @include desktop(980px){
            height: 42rem;
        }
    }

    @include mobile(980px){
        .edu-advantages{
            --title-margin: 3.2rem;
            --icon-size: 2.4rem;
            --icon-pad: 1.4rem;

            &__cards{
                @include grid(1fr, .8rem)
            }
        }

        .edu-advantage-card{
            &__title{
                @include font-h3--mob;
            }
        }
    }
</style>