<template>
    <div class="calc-advantages content-wrapper-out" >
        <div class="calc-advantages__container content-wrapper-in" transition-block>
            <SectionTitle
                class="calc-advantages__title"
                bullit="Преимущества"
                inverse
            >
                Почему стоит приобрести инструмент в ООО "Инструментальная система ПТК"? 
            </SectionTitle>
            <AnimText transition-block>
                Пилы твердосплавные <span nobr>в СПб</span> продаёт наша компания. RealRez – это разработчик <span nobr>и производитель</span>, 
                <span nobr>на заводе</span> используют новые машины <span nobr>для стыковой</span> сварки, сваривающие ленточные полотна оплавлением IDEAL. 
                Такое оплавление делает пилы износостойкими <span nobr>и увеличивает</span> срок службы на 30%.
            </AnimText>
            <AnimText transition-block>
                Доставка товаров <span nobr>по Санкт-Петербургу</span> <span nobr>и в область</span> реализуется курьерами <span nobr>ООО "Инструментальная система ПТК"</span>. 
                <span nobr>Для отправки</span> товаров <span nobr>в другие</span> регионы мы выбираем надёжных транспортировщиков.
            </AnimText>
            <AnimText transition-block>
                Консультанты компании помогут выбрать пилы ленточные твердосплавные, расскажут <span nobr>о нюансах</span> <span nobr>и преимуществах</span> <span nobr>их использования</span>. 
                <span nobr>Для консультации</span> нужно заполнить форму обратной связи на этой странице <span nobr>или позвонить</span> <span nobr>по контактному</span> телефону. 
            </AnimText>
        </div>
    </div>
</template>

<script setup>

</script>

<style lang="scss" scoped>
    .calc-advantages{
        color: var(--c-text-inverse);

        &__container{
            background: var(--c-surface-accent-main);
            border-radius: 1.2rem;
            @include padding-y(var(--pad-i));
            @include flex-col;
            gap: 2.4rem;
        }

        &__title{
            max-width: 84rem;

            :deep(h2){
                @include font-h2;
            }
        }

        p{
            @include font-p2;
        }

        @include mobile{
            &__title{
                :deep(h2){
                    @include font-h2--mob;
                }
            }

            p{
                @include font-p3;
            }
        }
    }
</style>