<template>
    <div class="pp-hero-image">
        <ParallaxWrapper :="{...$attrs}">
            <img :src="imgSrc" alt="" />
        </ParallaxWrapper>
    </div>
</template>

<script setup>
    const props = defineProps({
        src: [Object, String],
    });

    const imgSrc = computed(() => {
        const s = props.src;
        if (typeof s === 'string' && s.length) {
            return s;
        }
        if (s && typeof s === 'object' && 'url' in s && typeof s.url === 'string') {
            return s.url;
        }
        return '/no-photo.svg';
    });
</script>

<style lang="scss" scoped>
    .pp-hero-image{
        width: 100%;
        max-height: var(--100vh);
        min-height: calc(90 * var(--vh));
        @include padding-y(var(--content-pad));
        @include flex-c;

        img{
            display: block;
            // height: 100%;
            max-width: 70rem;
            max-height: 70rem;
            margin: 0 auto;
            border-radius: 2.4rem;
        }
        
        @include desktop{
            transform: translateY(6%);
        }

        @include mobile(750px){
            min-height: calc(50 * var(--vh));

            img{
                max-width: 90%;
            }
        }

        @include mobile{
            height: auto;
            margin: 4rem 0;
            max-height: unset;
            padding-top: 0;

            img{
                height: auto;
            }
        }
    }
</style>