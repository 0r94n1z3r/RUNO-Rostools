<template>
    <div class="footer-legal content-wrapper">
        <Logo to="/"/>
        <div class="footer-legal__text">
            <p>Copyright © 2026 Realrez. Все права защищены.</p>
        </div>
        <div class="footer-legal__devs">
            <p class="footer-legal__dev">Developed by <a href="https://runova.tech/" class="text-link-basic" target="_blank"><LogoRunova class="runova"/></a></p>
            <p class="footer-legal__dev">Design by <a href="https://bankai.agency/" class="text-link-basic" target="_blank"><LogoBankai class="bankai"/></a></p>
        </div>
    </div>
</template>

<script setup>
    import LogoBankai from "@/assets/icons/bankai.svg?component";
    import LogoRunova from "@/assets/icons/runova.svg?component";
</script>

<style lang="scss" scoped>
    .footer-legal{
        @include padding-y(4.4rem);
        margin-top: calc(-1 * var(--content-pad));
        display: flex;
        justify-content: space-between;
        align-items: center;
        gap: 1.6rem;
        position: relative;
        z-index: 1;

        p{
            @include font-p4;
            color: var(--c-text-inverse-secondary);
        }


        .logo{
            width: 8.6rem;
        }

        &__devs{
            @include flex-col;
            gap: .6rem;
        }

        &__dev{
            display: flex;
            align-items: center;
            gap: .8rem;

            .runova,
            .bankai{
                --icon-size: auto;
                height: 2rem;
            }

            .runova{
                transform: translateY(-.3rem);
            }
        }

        @include mobile(750px){
            flex-direction: column;
            align-items: flex-start;
            gap: 2rem;
        }

        @include mobile{
            margin-top: 0;
        }
    }
</style>
