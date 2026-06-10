<template>
    <NuxtErrorBoundary @error="handleError">
        <Swiper
            :="{...$attrs, ...props}"
            :loop-prevents-sliding="false"
            @swiper="initSwiper"
        >
            <slot />
        </Swiper>
    </NuxtErrorBoundary>
</template>

<script setup>
    const emit = defineEmits(['swiper']);

    const props = defineProps({
        autoplay: [Object, Boolean],
        slideToSpeed: Number,
        slidesPerView: [Number, String],
        gap: String
    })
    

// init
    const swiper = ref();
    const initSwiper = sw => {
        swiper.value = sw;
        emit('swiper', sw);
    }

// raf
    let raf;
    onMounted(() => {
        const updateTime = () => {
            if(!swiper.value)return;

            timeLeft.value = swiper.value.autoplay?.timeLeft || 0;
            swSlide.value = swiper.value.realIndex;
            animating.value = swiper.value.animating;

            raf = requestAnimationFrame(updateTime)
        }
        updateTime()
    })
    onUnmounted(() => cancelAnimationFrame(raf))

// slide
    const swSlide = ref(0); // updates with swiper
    const manualSlide = defineModel('slide', 0); // updates manually

    watch(manualSlide, async(n,o)=>{
        if(manualSlide.value == swSlide.value)return;

        const diff = n - o;
        if (diff === 1) return swiper.value.slideNext()
        if (diff === -1) return swiper.value.slidePrev()

        swiper.value?.slideToLoop(n, props.slideToSpeed);
        swiper.value?.autoplay?.resume();
    })

    watch(swSlide, async(n,o)=>{
        manualSlide.value = n;
    })

// progress
    const timeLeft = ref(0);
    const progressCount = computed(()=>{
        if(!swiper.value?.autoplay || !props.autoplay?.delay)return 0;
        return 1 - timeLeft.value / props.autoplay.delay;
    })
    const timeoutProgress = defineModel('timeoutProgress', 0);
    watch(progressCount, (n)=>{timeoutProgress.value = n;})

//animating
    const animating = defineModel('animating', false);

// error
    const handleError = (e) => {
        console.log('swiper-err:', e);
    }

</script>

<style lang="scss">
    .swiper{
        .swiper-slide{
            &:not(:last-child){
                margin-right: var(--swiper-gap, v-bind(gap));
            }
        }
    }
</style>