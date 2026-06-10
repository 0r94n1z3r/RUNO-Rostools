<template>
    <div class="footer-content content-wrapper">
        <!-- <Socials class="mob-visible"/> -->
        <div class="footer-content__cell">
            <div class="footer-content__address">
                <div class="footer-content__title" transition-block>Телефон</div>
                <a class="footer-content__big-link text-link-basic" :href="`tel:88003029418`" transition-block><span nobr>8 (800) 302-94-18</span></a>
                <div class="footer-content__title" transition-block>Email</div>
                <a class="footer-content__big-link text-link-basic" href="mailto:info@rostools.ru" transition-block><span nobr>info@rostools.ru</span></a>
            </div>
            <div class="footer-content__address">
                <div class="footer-content__title" transition-block>Адрес [Ленинградская Область]</div>
                <a 
                    class="footer-content__big-link text-link-basic" 
                    transition-block
                    :href="`https://yandex.ru/maps/?whatshere[point]=${30.165831},${59.594617}&whatshere[zoom]=18`"
                    target="_blank"
                >
                    Ленинградская область, м.р-н Гатчинский, с.п. Веревское, тер. Ивановка 2, дом 6А
                </a>
            </div>
            <div v-for="i in useRegions().list" class="footer-content__address">
                <div class="footer-content__title" transition-block>Адрес [{{ i.title }}]</div>
                <a 
                    class="footer-content__big-link text-link-basic" 
                    transition-block
                    :href="`https://yandex.ru/maps/?whatshere[point]=${i.addresses?.[0]?.lon},${i.addresses?.[0]?.lat}&whatshere[zoom]=18`"
                    target="_blank"
                >
                    {{ i.addresses?.[0]?.address }}
                </a>
            </div>
        </div>
        <div class="footer-content__nav">
            <div class="footer-content__cell">
                <div class="footer-content__title" transition-block>Меню</div>
                <div class="footer-content__links">
                    <NuxtLink v-for="i in useStatic().navLinks" class="text-link-basic" :to="i.to" transition-block>{{ i.title }}</NuxtLink>
                    <NuxtLink class="text-link-basic" to="/politika-obrabotki-personalnyh-dannyh">Политика обработки персональных данных</NuxtLink>
                </div>
            </div>
            <div class="footer-content__cell">
                <div class="footer-content__title" transition-block>Оборудование</div>
                <div class="footer-content__links">
                    <NuxtLink v-for="i in useCategories().mainCategories" class="text-link-basic" :to="`/catalog/${i.name}`" transition-block>{{ i.title }}</NuxtLink>
                </div>    
            </div>
        </div>
    </div>
</template>

<script setup>

</script>

<style lang="scss" scoped>
    .footer-content{
        @include grid(1fr 1fr, 2rem);

        &__title{
            margin-bottom: 1.2rem;
            @include font-c3;
            color: var(--c-text-inverse-secondary);
        }

        &__big-link{
            display: block;
            @include font-h3;
            margin-bottom: 2rem;
        }

        &__links{
            @include flex-col;
            gap: .8rem;

            a{
                width: fit-content;
                max-width: 20rem;
            }
        }

        &__nav{
            @include grid(1fr 1fr, 2rem);
        }

        &__address{
            margin-bottom: 5.6rem;
        }

        @include mobile(680px){
            @include flex-col;
            gap: 3.2rem;
            flex-direction: column-reverse;
        }

        @include mobile{
            &__big-link{
                @include font-h2--mob;
            }
        }
    }

    @include mob-display;
</style>