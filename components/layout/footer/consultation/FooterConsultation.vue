<template>
    <div class="footer-consultation content-wrapper">
        <div class="footer-consultation__content">
            <SectionTitle class="footer-consultation__title" bullit="Консультация" inverse>
                <span class="title-gray">Начните внедрение</span> передовых технологий <span nobr>уже сегодня</span>
            </SectionTitle>
            <AnimText class="footer-consultation__description" transition-block>
                <span nobr>Мы всегда</span> готовы ответить <span nobr>на ваши</span> вопросы <span nobr>и предоставить</span> консультацию. 
                Оставьте свои контактные данные, <span nobr>и наш специалист</span> свяжется <span nobr>с вами</span> <span nobr>в ближайшее</span> время.
            </AnimText>
            <!-- <Socials class="desk-visible"/> -->
        </div>
        <ConsultationForm id="consultation-form"/>
    </div>
</template>

<script setup>

</script>

<style lang="scss" scoped>
    .footer-consultation{
        @include grid(1fr 1fr, 2rem);

        &__content{
            @include flex-col;
        }
        
        &__title{
            margin-bottom: 2.4rem;

            :deep(h2){
                @include font-h2;
            }
        }

        &__description{
            color: var(--c-text-inverse-secondary);
            margin-bottom: 2.4rem;
        }

        .socials{
            margin-top: auto;
        }

        @include mobile(560px){
            grid-template-columns: 1fr;
            gap: 0;

            :deep(h2){
                @include font-h1--mob;
            }

            :deep(.textarea-input){
                --mh: 12rem;
            } 
        }

        @include mob-display;

        #consultation-form{
            padding-top: 20vh;
            margin-top: -20vh;
        }
    }
</style>