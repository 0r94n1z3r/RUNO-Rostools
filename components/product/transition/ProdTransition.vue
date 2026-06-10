<template>
    <ClientOnly>
        <div 
            class="prod-transition"
            :class="[`prod-transition--${useProdTransition().state}`]"
        >
            <div class="prod-transition__block">
                <div ref="imgRef" class="prod-transition__img-wr content-wrapper-out">
                    <PPHeroImage :src="product?.images?.[0]?.url || product?.image || '/no-photo.svg'" />
                    <LogoLoader />
                </div>
            </div>
        </div>
    </ClientOnly>
</template>

<script setup>
    const x = computed(()=>useProdTransition().data.x + 'px');
    const y = computed(()=>useProdTransition().data.y + 'px');
    const width = computed(()=>useProdTransition().data.width + 'px');
    const height = computed(()=>useProdTransition().data.height + 'px');
    const product = computed(()=>useProdTransition().data.product);

    const imgRef = ref();
    const {height: imgHeight} = useElementSize(imgRef);
    const calculatedImgHeight = computed(()=>imgHeight.value + 'px');
</script>

<style lang="scss" scoped>
    .prod-transition{
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: calc(130 * var(--vh));
        z-index: 9;
        transition: .6s;

        pointer-events: none;
        *{
            pointer-events: none!important;
        }

        &__block{
            position: absolute;
            top: 0;
            left: 0;
            width: v-bind(width);
            height: v-bind(height);
            background: var(--c-white-secondary);
            transform: translate(v-bind(x), v-bind(y));
            pointer-events: all;
            border-radius: .6rem;
            overflow: hidden;
            @include flex-c;
            max-height: var(--100vh);
        }

        &__img-wr{
            @include flex-c;
        }

        @mixin transit{
            @include transition-bounce;
            transform: translate(0, 0);
            width: 100%;
            height: 100%;
        }

        &--idle{
            background: transparent;

            .prod-transition{
                &__block{
                    opacity: 0;
                }

                &__img{
                    scale: 1.2;
                }
            }
        }

        &--transit{
            .prod-transition{
                &__block{
                    @include transit()
                }
                
                &__img{
                    transition: .3s;
                }
            }
        }

        &--pre-fin{
            background:  var(--c-surface-neutral-secondary);
            .prod-transition{
                &__block{
                    @include transit();
                    transition: .3s;
                    height: v-bind(calculatedImgHeight);
                }
            }
        }

        &--fin{
            .prod-transition{
                &__block{
                    @include transit();
                    transition: .3s;
                    height: v-bind(calculatedImgHeight);
                    opacity: 0;
                }
            }
        }

        .logo-loader{
            --background: var(--c-brand-6);
            position: absolute;
            bottom: calc(.8rem + 3rem);
            margin: 0 auto;
        }
    }
</style>