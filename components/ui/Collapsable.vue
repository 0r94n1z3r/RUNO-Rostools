<template>
    <div 
        class="collapsable"
        :class="{'collapsable--opened': open}"
    >
        <div class="collapsable__container">
            <h2 class="collapsable__title font-h4" @click="open = !open">{{ title }}</h2>
            <div class="collapsable__content">
                <div ref="fakeRef" class="collapsable__fake"><slot/></div>
                <slot/>
            </div>
        </div>
        <Button v-if="hasButton" class="collapsable__control" @click="open = !open"/>
    </div>
</template> 

<script setup>
    const props = defineProps({
        title: String,
        isOpen: Boolean,
        hasButton: {
            type: Boolean,
            default: true
        }
    });

    const fakeRef = ref(null);

    const open = ref(props.isOpen);

    const height = ref();

    const recalculateHeight = () => {
        height.value = fakeRef.value.offsetHeight + 'px';
    }
    onMounted(recalculateHeight);
    watch(open, recalculateHeight);
    useResizeObserver(fakeRef, recalculateHeight);

</script>

<style lang="scss" scoped>
    .collapsable{
        --padding: 2.4rem;
        --gap: 3.2rem;
        --title-pad: .6rem;

        width: 100%;
        padding: var(--padding);
        background: var(--c-surface-neutral-secondary);
        border-radius: .6rem;
        display: flex;
        gap: var(--gap);

        &__container{
            width: 100%;
        }

        &__title{
            padding: var(--title-pad) 0;
            cursor: pointer;
        }

        &__content{
            padding-top: var(--padding);
            height: v-bind(height);
            @include transition-bounce;
            position: relative;
            overflow: hidden;
        }

        &__fake{
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            opacity: 0;
            pointer-events: none;
            padding-top: var(--padding);
        }

        &__control{
            &::after,
            &::before{
                @include pseudo-absolute;
                height: .1rem;
                width: .7rem;
                background: var(--c-icon-inverse);
                @include transition-bounce;
                transform: rotate(1turn);
            }
        }

        &:not(&--opened){
            .collapsable{
                &__content{
                    opacity: 0;
                    height: 0;
                    margin-top: calc(-1 * var(--padding));
                    pointer-events: none;
                }
            }

            .button{
                &::after{
                    transform: rotate(0);
                }

                &::before{
                    transform: rotate(.25turn);
                }
            }
        }

        @include mobile{
            --padding: 1.6rem;
            --gap: 2.4rem;
            --title-pad: .4rem; 

            &__title{
                @include font-p3;
                font-weight: 500;
            }

            .button{
                --mh: 3.2rem;
            }
        }

    }
</style>