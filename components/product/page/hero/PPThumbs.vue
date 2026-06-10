<template>
    <div v-if="has360 || (list?.length > 1)" class="pp-thumbs">
        <SwiperWr 
            v-model:slide="innerSlide"
            class="pp-thumbs__slider"
            slides-per-view="auto"
        >
            <SwiperSlide
                v-if="has360"
                style="width: fit-content"
                transition-block
            >
                <div 
                    class="pp-thumb pp-thumb--360"
                    @click="emit('call360')"
                >
                    <div class="pp-thumb__content">
                        <Icon360Degree size="48"/>
                    </div>
                </div>
            </SwiperSlide>
            <SwiperSlide 
                v-for="(i,k) in list" 
                :key="i?.url ?? k"
                style="width: fit-content"
                transition-block
            >
                <div 
                    class="pp-thumb"
                    :class="{'pp-thumb--active': k == slide}"
                    @click="slide = k"
                >
                    <div class="pp-thumb__content">
                        <Image 
                            :src="i.url"
                            :ratio="1"
                        />
                    </div>
                </div>
            </SwiperSlide>
        </SwiperWr>
    </div>
</template>

<script setup>
    const props = defineProps({
        list: Array,
        has360: null
    });

    const emit = defineEmits(['call360']);

    const slide = defineModel();
    const innerSlide = ref(0);

    watch(slide, (n)=>{
        innerSlide.value = n
    })
</script>

<style lang="scss" scoped>
    .pp-thumbs{
        --w: 8rem;
        --swiper-gap: .8rem;

        :deep(.pp-thumbs__ssr){
            display: flex;
            flex-direction: row;
            gap: var(--swiper-gap);
            width: 100%;
            overflow-x: auto;
        }

        @include mobile{
            width: 100%;
        }
    }

    .pp-thumb{
        width: var(--w);
        height: var(--w);
        user-select: none;

        &__content{
            cursor: pointer;
            background: var(--c-surface-neutral-main-inverse);
            border-radius: .6rem;
            overflow: hidden;
            transition: .3s;
            opacity: .5;
            border: .1rem solid var(--c-border-neutral-main);
            @include flex-c;
            height: 100%;
            width: 100%;

            .image{
                width: 100%;
            }

            &>*{
                @include transition-bounce;
                will-change: transform;
            }
        }

        @include hover{
            &:hover{
                .pp-thumb{
                    &__content{
                        opacity: 1;
                        border-color: var(--c-border-accent-high);

                        &>*{
                            scale: 1.1;
                        }
                    }
                } 
            }
        }

        &:active{
            .pp-thumb{
                &__content{
                    &>*{
                        scale: 0.95;
                    }
                }
            }
        }

        &--active{
            .pp-thumb{
                &__content{
                    opacity: 1!important;
                    border-color: var(--c-border-accent-main)!important;
                }
            }
        }

        &--360{
            .pp-thumb{
                &__content{
                    opacity: 1;
                }
            }
        }
    }
</style>