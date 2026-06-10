<template>
    <div id="edu-form" class="edu-form content-wrapper">
        <SectionTitle 
            class="edu-form__title"
            bullit="Записаться на обучение"
        >
            Присоединяйтесь <span nobr>к программе</span> обучения <span nobr>и освоите</span> оборудование REALREZ
        </SectionTitle>
        <AnimText class="edu-form__text" transition-block>
            Готовы начать обучение и повысить квалификацию ваших сотрудников? Свяжитесь с нами, чтобы узнать больше о наших курсах и записаться на удобное для вас время.
        </AnimText>
        <ConsultationForm
            type="light"
            extra="[ЗАПРОС НА ОБУЧЕНИЕ]"
            has-region
        />
    </div>
</template>

<script setup>

</script>

<style lang="scss" scoped>
    .edu-form{
        --title-mb: 1.6rem;
        --text-mb: 3.2rem;

        &.content-wrapper{
            overflow: unset;
        }

        padding-top: calc((var(--header-height) + var(--pad-o)));
        margin-top: calc(-1 * (var(--header-height) + var(--pad-o)));

        &__title{
            margin-bottom: var(--title-mb);
        }

        &__text{
            max-width: 59rem;
            margin: 0 auto;
            margin-bottom: var(--text-mb);
        }

        @include desktop{
            --title-mb: 2.4rem;
            --text-mb: 6.4rem;

            &__title,
            &__text{
                text-align: center;
            }

            &__text{
                @include font-p2;
            }

            :deep(.bullit){
                margin-left: auto;
                margin-right: auto;
            }
        }

        .consultation-form{
            max-width: 59rem;
            margin: 0 auto;
        }
    }
</style>