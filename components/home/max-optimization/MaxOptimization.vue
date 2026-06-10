<template>
    <div class="max-optimization">
        <div class="content-wrapper max-optimization__wrapper">
            <div class="max-optimization__content">
                <SectionTitle
                    class="max-optimization__title"
                    bullit="Максимальная оптимизация"
                >
                    <span class="title-gray">Скорость <span nobr>и эстетичность</span></span> ваш новый стандарт
                </SectionTitle>
                <AnimText class="max-optimization__description">
                    Сократите затраты, увеличьте производительность <span nobr>и достигайте</span> высоких результатов <span nobr>с нашими</span> лазерными станками REALREZ.
                </AnimText>
            
                <div class="max-optimization__image mob-visible">
                    <img src="./image.webp" :ratio="1"/>
                </div>

                <div class="max-optimization__list">
                    <div v-for="i in list" class="max-optimization__list-item">
                        <AnimText component="h3" transition-block>{{ i.title }}</AnimText> 
                        <AnimText transition-block>{{ i.value }}</AnimText> 
                    </div>
                </div>
            </div>
            <div class="max-optimization__image desk-visible">
                <img src="./image.webp" :ratio="1"/>
            </div>
        </div>
    </div>
</template>

<script setup>
    const list = [
        {
            title: 'Металл не ведет',
            // value: 'Благодаря высокой точности обработки и минимизации отходов.'
        },
        {
            title: 'Российское ПО',
            // value: 'Благодаря высокой точности обработки и минимизации отходов.'
        },
        {
            title: 'Топовый источник по доступной цене',
            // value: 'Гарантированная долговечность и надёжность станков.'
        },   
    ]
</script>

<style lang="scss" scoped>
    .max-optimization{
        overflow: hidden;
        padding-bottom: 20rem;
        margin-bottom: -20rem;

        &__wrapper{
            display: flex;
            align-items: end;
        }

        &__content{
            width: 100%;
            max-width: 72rem;
        }

        &__title{
            margin-bottom: 1.2rem;
        }

        &__description{
            @include font-p2;
            color: var(--c-text-secondary);
            max-width: 52rem;
        }

        &__list{
            margin-top: 6.4rem;
            max-width: 58.8rem;
        }

        &__list-item{
            // padding: 2.4rem 0;
            padding: 1.2rem 0;
            @include flex-col;
            gap: 1.2rem;
            border-top: .1rem solid var(--c-border-neutral-low);
        }

        &__image{
            width: 48.8rem;
            height: 62.2rem;
            @include flex-c;
            position: relative;
            flex-shrink: 0;

            img{
                position: absolute;
                display: block;
                width: 110.4rem;
                bottom: -13.1rem;
                z-index: 1;
            }
        }

        @include nav-mobile{
            &__image{
                width: 28rem;
            }
        }
        
        @include mobile(880px){
            overflow: hidden;
    
            &__list{
                margin-top: 0;
            }

            &__image{
                width: 100%;
                height: 43.7rem;

                img{
                    width: 55rem;
                    height: 55rem;
                    bottom: 0;
                }
            }
        }

        @include mob-display(880px);
        
        @include mobile{
            &__title{
                @include font-h1--mob;
            }

            &__description{
                @include font-p3;
            }

            &__list-item{
                h3{
                    @include font-h2--mob;
                }

                p{
                    max-width: 93%;
                }
            }
        }

    }
</style>
