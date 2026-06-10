<template>
    <BasicPage
        class="contacts-page"
        title="Контакты"
        :breadcrumbs="{title: 'Контакты'}"
    >
        <div class="content-wrapper">
            <ContactsCards 
                :list="generalList"
            />
        </div>

        <!-- <DashesDivider /> -->

        <div v-if="false" class="content-wrapper-out header-state-dark">
            <div class="contacts-socials content-wrapper-in">
                <SectionTitle 
                    inverse
                    class="contacts-socials__title"
                    bullit="Социальные сети"
                >
                    Следите за нашими обновлениями <span nobr>в социальных</span> сетях
                </SectionTitle>
                <AnimText class="contacts-socials__description" transition-block>Будьте <span nobr>в курсе</span> последних новостей, акций <span nobr>и обновлений</span> оборудования. Подписывайтесь <span nobr>на наши</span> страницы <span nobr>в социальных</span> сетях <span nobr>и оставайтесь</span> <span nobr>на связи</span> <span nobr>с REALREZ</span>!</AnimText>
                <ContactsCards 
                    type="transparent-dark"
                    :list="socialsList"
                />
            </div>
        </div>

        <DashesDivider />

        <div class="contacts-socials-map">
            <iframe
                :src="
                    `https://yandex.ru/map-widget/v1/?scroll=false&ll=${useRegions().current.addresses?.[0]?.lon}%2C${useRegions().current.addresses?.[0]?.lat}&pt=${useRegions().current.addresses?.[0]?.lon}%2C${useRegions().current.addresses?.[0]?.lat}&z=16`
                "
            ></iframe>
        </div>


    </BasicPage>
</template>

<script setup>
    // const generalList = computed(()=>useRegions().list.map( i => [
    //     {
    //         title: `Адрес [${i.title}]`,
    //         value: i.addresses?.[0]?.address,
    //         to: `https://yandex.ru/maps/?whatshere[point]=${i.addresses?.[0]?.lon},${i.addresses?.[0]?.lat}&whatshere[zoom]=18`
    //     },
    //     {
    //         title: `Телефон [${i.title}]`,
    //         value: i.addresses?.[0]?.tel,
    //         to: `tel:${i.addresses?.[0]?.tel}`
    //     },
    //     {
    //         title: `Email [${i.title}]`,
    //         value: 'info@rostools.ru',
    //         to: 'mailto:info@rostools.ru'
    //     },
    // ]).flat())

    const generalList = ref([
        {
            title: `Адрес [Ленинградская Область]`,
            value: 'Ленинградская область, м.р-н Гатчинский, с.п. Веревское, тер. Ивановка 2, дом 6А',
            to: `https://yandex.ru/maps/?whatshere[point]=${30.165831},${59.594617}&whatshere[zoom]=18`
        },
        ...useRegions().list.map( i => (
            {
                title: `Адрес [${i.title}]`,
                value: i.addresses?.[0]?.address,
                to: `https://yandex.ru/maps/?whatshere[point]=${i.addresses?.[0]?.lon},${i.addresses?.[0]?.lat}&whatshere[zoom]=18`
            }
        )),
        {
            title: `Email`,
            value: 'info@rostools.ru',
            to: 'mailto:info@rostools.ru'
        },
        {
            title: `Телефон<br/>[По будням с 9:00 до 17:30]`,
            value: '8 (800) 302-94-18',
            to: `tel:88003029418`
        }
    ])

    const socialsList = ref([
        {
            title: 'Соц сети',
            value: 'WhatsApp',
            to: '' // notdone
        },
        {
            title: 'Соц сети',
            value: 'Instagram',
            to: '' // notdone
        },
        {
            title: 'Соц сети',
            value: 'Telegram',
            to: '' // notdone
        },
    ])
</script>

<style lang="scss" scoped>
    .contacts-page{
        --title-mb: 6.4rem;

        @include mobile{
            --title-mb: 3.2rem;
        }

        .contacts-socials{
            background: var(--c-surface-neutral-main);
            color: var(--c-text-inverse);
            @include padding-y(9.6rem);
            border-radius: 1.2rem;
        
            &__title{
                margin-bottom: 2.4rem;
            }

            &__description{
                margin-bottom: 4.8rem;
                max-width: 59rem;
                color: var(--c-text-inverse-secondary);
            }
        }

        .contacts-socials-map{
            height: calc(60 * var(--vh));
            width: 100vw;
            position: relative;

            iframe{
                width: 100%;
                height: 100%;
            }
        }
    }
</style>