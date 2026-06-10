<template>
    <Card class="pp-video">
        <div 
            class="video-wr"
            :class="{'video-wr--shorts': info?.video_review.includes('shorts')}" 
        >
            <iframe 
                v-if="info?.video_review?.includes('youtube.com/')"
                :src="ytsrc()"
                :title="product.title + 'видеообзор'" 
                frameborder="0" 
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" 
                referrerpolicy="strict-origin-when-cross-origin" 
                allowfullscreen
            ></iframe>
            <iframe 
                v-if="info?.video_review?.includes('rutube.ru')"
                :src="rtsrc()" 
                frameBorder="0" 
                allow="clipboard-write; autoplay" 
                webkitAllowFullScreen 
                mozallowfullscreen 
                allowFullScreen
            ></iframe>
        </div>
    </Card>
</template>

<script setup>
    const props = defineProps({
        info: Object
    });

    const ytsrc = () => 
        'https://www.youtube.com/embed/' + new URL(props.info.video_review).searchParams.get('v')

    const rtsrc = () => 
        `https://rutube.ru/play/embed/${props.info.video_review.match(/(?:video|shorts|video)\/([a-zA-Z0-9]+)/)[1]}`
    
</script>

<style lang="scss" scoped>
    .pp-video{
        max-width: 80rem;
        margin: 0 auto;

        @include mobile{
            --padding: 0;
        }

        .video-wr{
            position: relative;
            width: 100%;
            padding-top: 56.25%;
            border-radius: .8rem;
            overflow: hidden;

            &--shorts{
                width: 32%;

                @include mobile{
                    width: 100%;
                    padding-top: 180%;
                }
            }

            iframe{
                position: absolute;
                top: 0;
                display: block;
                width: 100%;
                height: 100%;
            }
        }
    }
</style>