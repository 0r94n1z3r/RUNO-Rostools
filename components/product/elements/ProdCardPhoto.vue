<template>
    <div class="prod-card-photo">
        <ScaleSlider
            v-model:slide="slide"
            :images="images.slice(0, 5)"
            arrows
            pagination
        />
    </div>
</template>

<script setup>
    const props = defineProps({
        hasParallax: {
            type: Boolean,
            default: true
        },
        info: Object
    });

    const images = computed(()=>{
        const l = props.info?.images?.map(e => e.url) || [];
        if(!l?.length) l.$props('/no-photo.svg');
        return l;
    })

    const slide = ref(0);
</script>

<style lang="scss" scoped>
    .prod-card-photo{
        background: var(--c-surface-neutral-secondary);
        border-radius: 1.2rem;
        overflow: hidden;

        padding-bottom: 100%;
        position: relative;

        .scale-slider{
            position: absolute;
            left: 0;
            top: 0;
            width: 100%;
            height: 100%;
        }

        :deep(){
            .scale-slider{
                &__img{
                    padding: 17%;
                    object-fit: contain;
                }
            }

            .swiper-pagination-bullet{
                --swiper-pagination-bullet-inactive-color: var(--c-surface-neutral-med);
            }
        }
    }
</style>