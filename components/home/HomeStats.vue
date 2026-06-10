<template>
    <div class="home-stats content-wrapper">
        <div 
            v-for="(stat, k) in stats"
            class="home-stats__cell"
            transition-block
        >
            <p class="home-stats__title">
                {{ stat.title }}
            </p>
            <AnimText 
                class="home-stats__value" 
                :delay="k*150"
                :duration="300"
            >
                {{ stat.value }}
            </AnimText>
        </div>
    </div>
</template>

<script setup>
    const stats = [
        {
            title: 'Опыт и доверие',
            value: '10+ лет на рынке'
        },
        {
            title: 'Качественная реализация',
            value: '500+ проектов'
        },
        {
            title: 'Оборудования в эксплуатации',
            value: '1000+ единиц'
        },
        {
            title: 'Всегда на связи',
            value: '24/7 поддержка'
        },
        {
            title: 'Крупные корпоративные партнёры',
            value: '200+ клиентов'
        },
        {
            title: 'Контроль на всех этапах производства',
            value: 'Строго по регламенту'
        },
        {
            title: 'Гарантия',
            value: 'ДО 24 МЕСЯЦЕВ'
        },
        {
            title: 'Отправка товара',
            value: 'По всей территории рф'
        }
    ]



</script>

<style lang="scss" scoped>
    .home-stats{
        display: grid;
        grid-template-columns: repeat(4, 1fr);
        grid-auto-rows: 14.4rem;

        &__cell{
            padding: 1.6rem;
            position: relative;
            @include flex-col;

            &::after{
                @include pseudo-absolute;
                @include all-directions(-.05rem);
                background-image: 
                    linear-gradient(to right, var(--c-border-neutral-main) 66%, transparent 34%), 
                    linear-gradient(to right, var(--c-border-neutral-main) 66%, transparent 34%), 
                    linear-gradient(to bottom, var(--c-border-neutral-main) 66%, transparent 34%), 
                    linear-gradient(to bottom, var(--c-border-neutral-main) 66%, transparent 34%);
                background-position: left top, left bottom, left top, right top;
                background-repeat: repeat-x, repeat-x, repeat-y, repeat-y;
                background-size: 1.5rem .1rem, 1.5rem .1rem, .1rem 1.5rem, .1rem 1.5rem;
                pointer-events: none;
            }
        }

        &__title{
            @include font-p3;
            color: var(--c-text-secondary);
        }

        &__value{
            @include font-c1;
            margin-top: auto;
        }

        @include mobile(640px){
            grid-template-columns: repeat(2, 1fr);
            grid-auto-rows: 11.2rem;
        }

        @include mobile{
            &__cell{
                padding: 1.2rem;
            }

            &__title{
                @include font-p4;
            }

            &__value{
                @include font-c3;
            }
        }

    }
</style>
