<template>
    <div class="news-card-cover">
        <div class="news-card-cover__container">
            <ParallaxWrapper :z-shift="100">
                <img :src="info.images[0].url" :alt="info.title" class="news-card-cover__img">
            </ParallaxWrapper>
        </div>
    </div>
</template>

<script setup>
    const props = defineProps({
        info: Object
    });
</script>

<style lang="scss" scoped>
    .news-card-cover{
        width: 100%;
        padding-bottom: 100%;
        overflow: hidden;
        border-radius: .6rem;
        display: block;
        position: relative;

        &__container{
            position: absolute;
            left: 0;
            top: 0;
            width: 100%;
            height: 100%;

            img{
                display: block;
                width: 100%;
                height: 100%;
                object-fit: cover;
                scale: 1.2;
                @include transition-bounce;
            }
        }
    }
</style>