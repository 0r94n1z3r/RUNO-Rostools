<template>
    <div class="socials">
        <Button 
            v-for="i in list" type="transparent"
            transition-block 
            :icon-left="i.icon"
            :to="i.link"
        />
    </div>
</template>

<script setup>
    import {
        IconInstagram,
        IconTelegram,
        IconWhatsApp
    } from '#components'

    const list = [
        {
            icon: IconInstagram,
            // link: 'https://instagram.com/rostools' // notdone
        },
        {
            icon: IconTelegram,
            link: 'https://telegram.me/+7812575023'
        },
        {
            icon: IconWhatsApp,
            link: 'https://wa.me/78125755023'
        },
    ]
</script>

<style lang="scss" scoped>
    .socials{
        display: flex;
        gap: .8rem;
    } 
</style>