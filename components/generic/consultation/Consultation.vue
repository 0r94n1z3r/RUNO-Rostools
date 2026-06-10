<template>
    <div class="consultation header-state-dark">
        <MediaContentContainer 
            :src="img"
            :backup-src="img"
            direction="horizontal"
        >
            <SectionTitle class="consultation__title" bullit="Консультация" inverse>
                <span nobr>Не уверены</span>, какое оборудование лучше всего всего <span nobr>для вас подойдёт</span>?
            </SectionTitle>
            <AnimText class="consultation__description" transition-block>
                Наши специалисты готовы помочь <span nobr>вам выбрать</span> оптимальное решение. 
                Оставьте заявку <span nobr>на консультацию</span>, <span nobr>и мы поможем</span> <span nobr>вам сделать</span> правильный выбор <span nobr>для ваших</span> задач.
            </AnimText>
            <div class="consultation__button-wr">
                <AnimButton
                    type="light" 
                    class="consultation__button" 
                    transition-block
                    @click="scrollToQuery('#consultation-form')"
                >
                    Оставить заявку
                </AnimButton>
            </div>
        </MediaContentContainer>
    </div>
</template>

<script setup>
    import img from './image.webp'
</script>

<style lang="scss" scoped>
    .consultation{
        @include flex-col;

        .media-content-container{
            --h: 60rem;

            :deep(.media-content-container__media){
                left: unset;
                right: 0;
                object-fit: unset;
                width: unset;
                top: 0;
                position: absolute;
                transform: scale(1.1);
            }
        }

        &__title{
            margin-bottom: 2.4rem;
            max-width: 73.1rem;
            color: var(--c-text-inverse);
        }

        &__description{
            max-width: 62rem;
            margin-bottom: 2.4rem;
            color: var(--c-text-inverse-secondary);
        }

        &__button-wr{
            @include desktop{
                margin-top: 1.2rem;
                flex-grow: 1;
            }
        }

        &__button{
            width: 100%;
            max-width: 54rem;
        }

        @include mobile(900px){
            .media-content-container{
                --transparent-shift: 10%;
            }
        }

        @include mobile(670px){
            .media-content-container{
                --transparent-shift: 0%;

                :deep(.media-content-container__media){
                    right: -12rem;
                }
            }

            &__title{
                :deep(h2){
                    @include font-h1--mob;
                }
            }

            &__description{
                margin-top: auto;
                color: var(--c-text-inverse);
            }

            &__button{
                margin-top: 0;
                width: 100%;
            }
        }
    }
</style>