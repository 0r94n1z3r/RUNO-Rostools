<template>
    <BasicPage 
        class="content-page"
        :title="page?.title"
        :breadcrumbs="{title: page?.title}"
    >
        <!-- <SEOHead :="seo[useRegions().current?.subdomain || 'null']"/> -->
        <div class="content-wrapper">
            <div class="content-page__content">
                <ParsedHTML :html="page?.content"/>
            </div>
        </div>
    </BasicPage>
</template>

<script setup>
    const contentpageId = computed(()=>R().params.contentpageId)
    const page = computed(()=>useStatic().contentPages?.page(contentpageId.value, 'name'))

    //seo
        // const seo = computed(()=>{
        //     switch(contentpageId.value) {
        //         case '1-o-kompanii': return {
        //             null: {'title': 'О компании | Stankobox', 'description': 'Узнайте больше о Stankobox: опыт на рынке промышленного оборудования, миссия, ценности и преимущества для наших клиентов.'},
        //             msk: {'title': 'О компании | Stankobox Москва', 'description': 'Узнайте о Stankobox в Москве: опыт, миссия, ценности и преимущества. Предлагаем надёжные решения для любого производства.'},
        //             spb: {'title': 'О компании | Stankobox Санкт-Петербург', 'description': 'Узнайте о Stankobox в Санкт-Петербурге: опыт на рынке, ценности и преимущества сотрудничества. Индивидуальный подход к каждому клиенту.'}
        //         };
        //         case '2-servis': return {
        //             null: {'title': 'Сервис и обслуживание | Stankobox', 'description': 'Профессиональный сервис и обслуживание станков: ремонт, гарантийное и постгарантийное сопровождение. Обеспечиваем бесперебойную работу оборудования.'},
        //             msk: {'title': 'Сервис и обслуживание станков в Москве | Stankobox', 'description': 'Профессиональный сервис и обслуживание станков. Ремонт, гарантийное и постгарантийное сопровождение в Москве для бесперебойной работы оборудования.'},
        //             spb: {'title': 'Сервис и обслуживание станков | Stankobox (Санкт-Петербург) | Stankobox', 'description': 'Профессиональный сервис и ремонт станков в Санкт-Петербурге. Гарантийное и постгарантийное обслуживание для бесперебойной работы оборудования.'}
        //         };
        //         case '3-oplata-i-lizing': return {
        //             null: {'title': 'Оплата и лизинг | Stankobox', 'description': 'Узнайте о доступных способах оплаты и лизинговых программах. Гибкие условия покупки промышленного оборудования для вашего удобства.'},
        //             msk: {'title': 'Оплата и лизинг | Stankobox Москва', 'description': 'Узнайте о способах оплаты и лизинговых программах в Москве. Гибкие условия покупки промышленного оборудования.'},
        //             spb: {'title': 'Оплата и лизинг | Stankobox (Санкт-Петербург)', 'description': 'Узнайте о способах оплаты и лизинговых программах в Санкт-Петербурге. Гибкие условия покупки промышленного оборудования.'}
        //         };
        //         case '4-dostavka': return {
        //             null: {'title': 'Доставка | Stankobox', 'description': 'Подробная информация о вариантах и сроках доставки станков и оборудования по всей России и странам СНГ. Заботимся о том, чтобы ваш заказ пришел вовремя и в целости.'},
        //             msk: {'title': 'Доставка станков в Москве | Stankobox', 'description': 'Подробная информация о вариантах и сроках доставки станков в Москве и по всей России. Обеспечиваем своевременную поставку и сохранность оборудования.'},
        //             spb: {'title': 'Доставка станков в Санкт-Петербурге | Stankobox', 'description': 'Подробная информация о вариантах и сроках доставки станков в СПб и по всей России. Надёжная логистика и оперативная доставка.'}
        //         };
        //         case '5-kontakty': return {
        //             null: {'title': 'Контакты | Stankobox', 'description': 'Свяжитесь с нами для консультаций и заказов. Телефоны, адрес и другие способы связи для быстрого решения любых вопросов.'},
        //             msk: {'title': 'Контакты | Stankobox Москва', 'description': 'Свяжитесь с офисом Stankobox в Москве для консультаций и заказов. Телефоны, адрес и другие способы связи.'},
        //             spb: {'title': 'Контакты | Stankobox Санкт-Петербург', 'description': 'Свяжитесь с нами для консультаций и заказов. Адрес, телефоны и другие способы связи офиса в Санкт-Петербурге.'}
        //         };
        //     }
        // });

    //404 handler
        if(import.meta.server && !page.value){
            const event = useRequestEvent()
            throw Error404(event);
        }
</script>

<style lang="scss" scoped>
    .content-page{
        --title-mb: 6.4rem;

        &__content{
            max-width: 80rem;
        }

        @include mobile{
            --title-mb: 3.2rem;
        }
    }
</style>