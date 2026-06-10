<template>
    <div 
        ref="animRef" 
        class="
            media-content-container 
            content-wrapper-out
        "
        :class="[
            `media-content-container--${direction}`
        ]"
    >
        <div class="media-content-container__wrapper">
            <div class="media-content-container__media-wr">
                <img v-if="backupSrc" class="media-content-container__media-backup" :src="backupSrcSafe" alt="">
                <ParallaxWrapper>
                    <img v-if="srcSafe" class="media-content-container__media" :src="srcSafe" alt="">
                    <video 
                        v-else-if="video" 
                        class="media-content-container__media" 
                        :src="video" 
                        autoplay 
                        loop 
                        muted 
                        playsinline
                        preload="auto"
                    ></video>
                </ParallaxWrapper>
            </div>

            <div class="media-content-container__content content-wrapper-in">
                <slot/>
            </div>
        </div>
    </div>
</template>

<script setup>
    import { animate, onScroll } from 'animejs';
    import { normalizeAssetSrc } from '@/helpers/normalizeAssetSrc.js';

    const requestURL = useRequestURL();

    const props = defineProps({
        src: [String, Object],
        backupSrc: [String, Object],
        video: [String, Object],
        direction: {
            type: String,
            default: 'vertical'    
        }
    })

    const strSrc = (v) => (typeof v === 'string' ? v : '');
    const srcSafe = computed(() => normalizeAssetSrc(strSrc(props.src), requestURL.origin));
    const backupSrcSafe = computed(() =>
        normalizeAssetSrc(strSrc(props.backupSrc), requestURL.origin),
    );

//anim
    const animValue = ref(0);
    const animRef = ref();
    
    let anim;
    onMounted(()=>{
        if (!animRef.value?.isConnected) return;
        anim = animate(animValue, {
            value: [0, 1],
            duration: 3000,
            autoplay:  onScroll({
                target: animRef.value
            }),
        })
    });
    // onBeforeUnmount(()=>anim?.revert?.());
    
</script>

<style lang="scss" scoped>
    .media-content-container{
        --h: 88rem;

        --angle: 180deg;
        --rads: 0 0 1.2rem 1.2rem;
        --transparent-shift: 20%;

        min-height: var(--h);
        height: 0;

        position: relative;
        z-index: 2;

        &--horizontal{
            --angle: -90deg;
            --rads: 1.2rem 0 0 1.2rem;
        }
        
        &__wrapper{
            position: relative;
            width: 100%;
            height: 100%;

            &::before{
                @include pseudo-absolute;
                @include all-directions(0);
                background: linear-gradient(var(--angle), rgba(0, 0, 0, 0) var(--transparent-shift), rgba(0, 0, 0, 1) 100%);
                z-index: 2;
                opacity: v-bind(animValue);
                border-radius: var(--rads);
            }
        }

        &__media-wr{
            position: absolute;
            width: 100%;
            height: 100%;
            left: 0;
            top: 0;
            overflow: hidden;
            border-radius: 1.2rem;
        }

        &__media-backup{
            position: absolute;
            position: absolute;
            width: 100%;
            height: 100%;
            left: 0;
            top: 0;
            object-fit: cover;
            filter: blur(2rem);
            scale: 1.1;
        }

        &__media{
            width: 100%;
            height: 100%;
            object-fit: cover;
            pointer-events: none;
            user-select: none;
            position: relative;
            z-index: 1;
        }

        &__content{
            position: relative;
            @include flex-col;
            justify-content: end;
            min-height: 100%;
            @include padding-y(6.4rem);
            z-index: 3;
        }

        @include mobile{
            --transparent-shift: 10%;
        
            &__content{
                @include padding-y(2.4rem);
            }
        }
    }
</style>