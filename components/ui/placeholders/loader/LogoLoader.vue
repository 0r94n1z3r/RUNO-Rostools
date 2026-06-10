<template>
    <div class="logo-loader">
        <div 
            class="logo-loader__container"
            :style="{
                'mask-image': `url(${mask})`,
                'webkit-mask-image': `url(${mask})`,
                'mask-repeat': 'no-repeat',
                'mask-size': 'contain',
                'mask-position': 'center',
            }"
        >
            <div class="logo-loader__bar"></div>
        </div>
    </div>
</template>

<script setup>
    import logo from '@/assets/icons/logo/logo.svg?raw'
    const mask = `data:image/svg+xml;utf8,${encodeURIComponent(logo)}`
</script>

<style lang="scss" scoped>
    .logo-loader{
        --background: var(--c-surface-neutral-secondary);
        --bar: var(--c-brand-100);
        width: fit-content;

        &__container{
            background: var(--background);
            width: 15rem;
            height: 3rem;
            position: relative;
        }
        

        &__bar{
            position: absolute;
            left: 0;
            top: 0;
            width: 20%;
            height: 100%;
            transform: skew(-15deg);
            background: var(--bar);
            animation: loading .6s linear infinite;
            filter: blur(2rem);
        }

        @keyframes loading{
            0%{
                transform: skew(-15deg) translateX(-400%);
            }
            100%{
                transform: skew(-15deg) translateX(600%);
            }
        }

    }
</style>