<template>
    <div 
        ref="animRef"
        class="tabs" 
    >
        <TabsControl 
            v-if="titles.length > 1"
            v-model="slide"
            :list="titles"
        />

        <div
            class="tabs-content"
            :class="{
                'tabs-content--bg': hasBackground
            }"
        >
            <SwiperWr
                v-model:slide="slide"
                slides-per-view="1"
                auto-height
                :allow-touch-move="false"
                :simulate-touch="false"
                space-between="20"

                @swiper="initMainSwiper"
            >
                <SwiperSlide v-for="(title, k) in titles" :key="title" ref="slideRefs">
                    <slot :name="`slot-${k}`"></slot>
                </SwiperSlide>
            </SwiperWr>
        </div>

    </div>
</template>

<script setup>
    import { animate, onScroll } from 'animejs';

    const props = defineProps({
        titles: Array,
        hasBackground: {
            type: Boolean,
            default: true
        }
    });

    const slideRefs = ref([])

//swiper
    const mainSlider = ref();

    const initMainSwiper = sw => mainSlider.value = sw;

    onMounted(() => {
        const observer = new MutationObserver(() => mainSlider.value.updateAutoHeight(200));

        mainSlider.value?.slides?.forEach(slide => observer.observe(slide, {
            childList: true,
            subtree: true,
            characterData: true
        }));
    });

// active
    const slide = ref(0);

// h
    const sizes = ref([])

    onMounted(() => {
        sizes.value = slideRefs.value.map(slideComp => {
            const el = slideComp?.$el || slideComp
            return useElementSize(el)
        })
    })

    watch(sizes, 
        () => mainSlider.value?.updateAutoHeight(0),
        {deep: true}
    )

//anim
    const animRef = ref(null);
    let anim;

    onMounted(()=>{
        if (!animRef.value?.isConnected) return;
        anim = animate(animRef.value, {
            autoplay:  onScroll(props.autoplay),
            ease: 'easeInOut',
            '--anim-1': {
                from: '0%',
                to: '100%',
                duration: 1000
            },
            '--anim-2': {
                from: '0%',
                to: '100%',
                duration: 1000,
                delay: 500
            },
        })
    });
    // onBeforeUnmount(()=>anim?.revert?.());


</script>

<style lang="scss" scoped>
    .tabs{
        --anim-1: 0%;
        --anim-2: 0%;
    }

    .tabs-content{
        --mt: 0;
        --padding: 3.2rem; 
        margin-top: var(--mt);

        &--bg{
            --mt: 2.4rem;
            background: var(--c-surface-neutral-secondary);
            padding: var(--padding);
            border-radius: 1.2rem;
            // mask-image: linear-gradient(to top, transparent 0 var(--anim-2), black var(--anim-2) 100%);
            clip-path: polygon(0 0, 100% 0, 100% var(--anim-2), 0 var(--anim-2));
        }

        &:first-child{
            --mt: 0!important;
        }

        @include mobile{
            --mt: 1.2rem;
            --padding: 1.6rem;
        }

    }

</style>