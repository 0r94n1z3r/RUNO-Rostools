<template>
    <MediaContentContainer
        class="calc-recommendations"
        :src="image"
        :backup-src="image"
    >
        <SectionTitle
            class="calc-recommendations__title"
            bullit="Рекомендации"
            inverse
        >
            Рекомендации по использованию ленточных пил
        </SectionTitle>
        <div class="calc-recommendations__content">
            <AnimText transition-block>Получите доступ к полным рекомендациям и таблицам режимов резания для наших ленточных пил</AnimText>
            <!-- notdone -->
            <AnimButton type="accent" transition-block>Подробнее</AnimButton>
        </div>
    </MediaContentContainer>
</template>

<script setup>
    import image from './media/full.webp';
</script>

<style lang="scss" scoped>
    .calc-recommendations{
        &__title{
            max-width: 90rem;
        }

        &__content{
            @include flex-jtf;
            align-items: center;
            gap: 2.4rem;
            color: var(--c-text-inverse);
            margin-top: 2.4rem;

            p{
                @include font-h4;
                max-width: 70rem;
            }

            @include mobile(650px){
                flex-direction: column;

                .anim-button{
                    width: 100%;
                }

                p{
                    @include font-p2;
                }
            }
        }
    }
</style>