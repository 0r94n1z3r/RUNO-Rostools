<template>
    <div class="about-history content-wrapper">
        <div class="about-history__container">
            <SectionTitle
                class="about-history__title"
                bullit="История"
            />
            <!-- <span nobr>От стартапа</span> <span nobr>до лидера</span> отрасли -->
            <div class="about-history__description">
                <AnimText>
                    <span class="about-history-span">REALREZ - разработчик и производитель промышленного оборудования для обработки металла.</span>
                    Мы выпускаем лазерные станки для резки, сварки и очистки, гибочные станки, ленточнопильные станки и ленточные полотна. Каждое направление развивается на базе собственных инженерных компетенций и с учётом реальных требований производства.
                </AnimText>
                <AnimText>
                    Компания основана более 10 лет назад как инженерная фирма по решениям для резки металла. Со временем портфель продукции был расширен, и сегодня REALREZ закрывает ключевые задачи металлообработки: раскрой листа и сортового проката, формовку, сварку и финишную очистку поверхностей. Оборудование REALREZ работает на предприятиях в России и за рубежом, в таких отраслях, как машиностроение, автомобилестроение, судостроение, металлоконструкции, авиастроение и других.
                </AnimText>
                <AnimText>
                    Основные направления REALREZ:<br>
                    <ul>
                        <li><span>•</span><p>Лазерные станки: резка, сварка, очистка металлов.</p></li>
                        <li><span>•</span><p>Гибочные станки: формовка листового металла.</p></li>
                        <li><span>•</span><p>Ленточнопильные станки: раскрой сортового и трубного проката.</p></li>
                        <li><span>•</span><p>Ленточные полотна: расходная оснастка для ленточнопильных станков.</p></li>
                    </ul>
                </AnimText>
                <AnimText>
                    Станки REALREZ - это оборудование, построенное на балансе производительности, точности и ресурса. Мы сопровождаем клиента от подбора станка под конкретные задачи до сервисной поддержки на всём сроке эксплуатации.
                </AnimText>


                
            </div>
            <div class="about-history__stats">
                <div class="about-history-stat">
                    <AnimText class="about-history-stat__title" :duration="400">700+</AnimText>
                    <AnimText class="about-history-stat__value" :duration="400">довольных клиентов</AnimText>
                </div>
                <div class="about-history-stat">
                    <AnimText class="about-history-stat__title" :duration="400">10+</AnimText>
                    <AnimText class="about-history-stat__value" :duration="400">лет на рынке</AnimText>
                </div>
                <div class="about-history-stat">
                    <AnimText class="about-history-stat__title" :duration="400">40+</AnimText>
                    <AnimText class="about-history-stat__value" :duration="400">станков продукции в наличии</AnimText>
                </div> 
            </div>
        </div>
    </div>
</template>

<script setup>

</script>

<style lang="scss" scoped>
    .about-history{
        // --gap: 6.4rem;
        --gap: 2rem;

        &__container{
            @include flex-col;
            gap: var(--gap);
            max-width: 80rem;
            margin: 0 auto;
        }

        &__description{
            p{
                @include font-h3;
                color: var(--c-text-disabled);

                :deep(.about-history-span){
                    color: var(--c-text-default);
                }

                &:not(:last-child){
                    margin-bottom: 2rem;
                }  
            }

            li{
                display: flex;

                span{
                    margin-right: 1.6rem;
                }
            }
        }        
    }

    .about-history-stat{
        @include flex-col;
        gap: 1.6rem;
        padding: 3.2rem 0;

        &:not(:last-child){
            border-bottom: .1rem solid var(--c-border-neutral-main);
        }

        &__title{
            @include font-h2;
            color: var(--c-text-accent);
        }

        &__value{
            @include font-p2;
        }
    }

    @include mobile{
        .about-history{
            --gap: 3.2rem;

            &__description{
                p{
                    @include font-h3--mob;
                }
            }
        }
    }
</style>