<template>
    <div class="home-innovation">
        <MediaContentContainer 
            :video="Vid"
        >
            <SectionTitle class="home-innovation__title" bullit="Более 10 лет инноваций и надёжности" inverse>
                Лазерное оборудование, которое помогает бизнесу расти <span nobr>и оставаться</span> конкурентоспособным.
            </SectionTitle>

            <div class="home-innovation__blocks">
                <div v-for="(i,k) in list" class="home-innovation-block">
                    <AnimText class="home-innovation-block__title" :delay="300 * k" transition-block>{{ i.title }}</AnimText>
                    <AnimText class="home-innovation-block__description" :delay="300 * k" transition-block>{{ i.description }}</AnimText>
                </div>
            </div>
        </MediaContentContainer>
    </div>
</template>

<script setup>
    import Vid from "./vid.webm"

    const list = [
        {
            title: "Инновации",
            description: "Используем комплектующие и оснастку топовых производителей. Оптоволоконные источники от мировых лидеров индустрии."
        },
        {
            title: "Качество",
            description: "Каждый компонент оборудования проходит строгий контроль качества, чтобы соответствовать самым высоким стандартам."
        },
        {
            title: "Поддержка",
            description: "Наши технические специалисты на связи с вами 24/7. В штате компании наладчики и инженеры с большим опытом."
        },
    ]
</script>

<style lang="scss" scoped>
    .home-innovation{
        padding-bottom: var(--content-pad);
        color: var(--c-text-inverse);

        &__title{
            margin-bottom: 4rem;

            :deep(h2){
                @include font-h2;
            }

            @include mobile(800px){
                :deep(h2){
                    @include font-h1--mob;
                }
            }
            
            @include mobile{
                :deep(h2){
                    @include font-h2--mob;
                }
            }
        }

        &__blocks{
            display: grid;
            grid-template-columns: repeat(3, 1fr);
            gap: 2rem;
        }
    }

    .home-innovation-block{
        padding-top: 2rem;
        border-top: .1rem solid var(--c-white-40);

        &__title{
            @include font-p2;
            font-weight: 600;
            margin-bottom: .8rem;
            margin-top: auto;
        }
    }

    @include mobile{
        .home-innovation{
            &__title{
                margin-bottom: 3.2rem;
            }

            &__blocks{
                grid-template-columns: 1fr;
                gap: 1.6rem;
            }
        }

        .home-innovation-block{
            padding-top: 1.6rem;

            &__title{
                @include font-p3;
            }

            &__description{
                color: var(--c-text-inverse-secondary);
            }
        }
    }
</style>