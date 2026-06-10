<template>
    <div class="tabs-control">
        <SwiperWr
            v-model:slide="navSlide"
            slides-per-view="auto"
            free-mode
        >
            <SwiperSlide v-for="(title, k) in list" :key="title" style="width: max-content">
                <div 
                    class="tabs-control__block"
                    :class="{
                        'tabs-control__block--active': model == k
                    }"
                    @click="handleClick(k)"
                >
                    {{ title }}
                </div>
            </SwiperSlide>
        </SwiperWr>
    </div>
</template>

<script setup>
    const props = defineProps({
        list: Array
    })

    const model = defineModel(0);
    const emits = defineEmits(['clicked']);

    const navSlide = ref(0);
    watch(model, (n)=>{ navSlide.value = n; })
    
    const handleClick = (k) => {
        model.value = k; 
        emits('clicked', k);
    }
</script>

<style lang="scss" scoped>
    .tabs-control{
        background: var(--c-surface-neutral-secondary);
        padding: 0 .8rem;
        border-radius: 1.2rem;
        width: fit-content;
        max-width: 100%;
        user-select: none;

        clip-path: polygon(0 0, var(--anim-1) 0, var(--anim-1) 100%, 0 100%);

        .swiper-slide{
            padding: .8rem 0;

            &:not(:first-child){
                padding-left: .2rem;
            }

            &:not(:last-child){
                padding-right: .2rem;
            }
        }

        &__block{
            font-weight: 500;
            height: 4.4rem;
            padding: 0 2rem;
            @include flex-c;
            cursor: pointer;
            transition: .3s;
            border-radius: .6rem;

            @include hover{
                &:hover{
                    background: var(--c-surface-neutral-low);
                }
            }

            &:active{
                transition: .01s;
                background: var(--c-surface-neutral-med);
            }

            &--active{
                background: var(--c-surface-neutral-main-inverse);
                @include shadow('xs');
                pointer-events: none;
            }

            &:not(&--active){
                color: var(--c-text-secondary);
            }
        }

        @include mobile{
            padding: 0;
            background: transparent;
            margin-left: calc(var(--pad) * -1);
            max-width: unset;
            width: 100vw;

            .swiper-slide{
                &:first-child{
                    padding-left: var(--pad);
                }

                &:last-child{
                    padding-right: var(--pad);
                }
            }

            &__block{
                padding: 0 1.6rem;

                &--active{
                    background: var(--c-surface-neutral-secondary);
                    box-shadow: none;
                }
            }
        }
    }
</style>