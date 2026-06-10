<template>
    <Teleport to="body">
        <div 
            v-if="!released" 
            class="loading-blinder"
            :style="{opacity: preReleased?0:1}"
        >
            <div class="loading-blinder__container">
                <div 
                    class="
                        loading-blinder__blob 
                        loading-blinder__blob--outside
                    "
                    :style="{
                        left: `${x}px`,
                        top: `${y}px`,
                        opacity: x&&y?1:0
                    }"
                ></div>

                <div 
                    class="loading-blinder__mask"
                    :style="{
                        'mask-image': `url(${mask})`,
                        'webkit-mask-image': `url(${mask})`,
                        'mask-repeat': 'no-repeat',
                        'mask-size': 'contain',
                        'mask-position': 'center',
                    }"
                >

                    <div 
                        class="
                            loading-blinder__blob 
                            loading-blinder__blob--inside
                        "
                        :style="{
                            left: `${x}px`,
                            top: `${y}px`,
                            opacity: x&&y?1:0
                        }"
                    ></div>

                    <div class="loading-blinder__bar"></div>
                </div>
            </div>
        </div>
    </Teleport>
</template>

<script setup>
    import logo from '@/assets/icons/logo/logo.svg?raw'

    const mask = `data:image/svg+xml;utf8,${encodeURIComponent(logo)}`

    const released = ref();
    const preReleased = ref();
    let releaseStarted = false;

    const {x,y} = useMouse()

    const release = async () => {
        if (releaseStarted || released.value) {
            return;
        }
        releaseStarted = true;
        preReleased.value = true;
        await sleep(310);
        released.value = true;
    }

    const clearLoadingBlinder = () => {
        release();
    };

    const setupFallbackTimer = () => {
        if (!import.meta.client) {
            return null;
        }

        return setTimeout(() => {
            release();
        }, 4500);
    };

    const hardFallbackTimer = setupFallbackTimer();

    onBeforeUnmount(() => {
        if (hardFallbackTimer) {
            clearTimeout(hardFallbackTimer);
        }
    });

    const useViewportReady = (cb = () => {}, selector = 'img') => {
        if (typeof document === 'undefined') {
            cb();
            return;
        }

        const targets = new Set()
        const loaded = new Set()

        const io = useIntersectionObserver(
            [...document.querySelectorAll(selector)],
            entries => {
                entries.forEach(({ isIntersecting, target }) => {
                    if (!isIntersecting || targets.has(target)) return

                    targets.add(target)

                    if(target.complete){
                        loaded.add(target)
                    }else{
                    target.addEventListener(
                        'load',
                        () => {
                            loaded.add(target)
                            check()
                        },
                        { once: true }
                        )
                    }
                })

                check()
            }
        )

        const check = () => {
            if (targets.size && targets.size === loaded.size) {
                cb()
                io.stop()
            }
        }

        if (!targets.size) {
            cb()
        }
    }

    onMounted(() => {
        const finish = () => {
            release();
        };

        M().mounted(async () => {
            await sleep();
            useViewportReady(finish);
        });
    });

    const error = useError()
    watch(
        error,
        (n) => {
            if (!n)return;
            clearLoadingBlinder();
        },
        { immediate: true },
    )
</script>

<style lang="scss" scoped>
    .loading-blinder{
        position: fixed;
        @include all-directions(0);
        bottom: -30vh;
        z-index: 99999;
        background: var(--c-white);
        overflow: hidden;
        overscroll-behavior: contain;
        transition: .3s;

        &__container{
            position: relative;
            width: 100%;
            height: var(--100vh);

            gap: .8rem;
            
            @include flex-c;
            @include flex-col;
        }

        &__blob{
            position: absolute;
            width: 25vmin;
            height: 25vmin;
            border-radius: 50%;
            transform: translate(-50%, -50%);
            transition: .3s;
            transition-property: opacity;
            filter: blur(4rem);

            &--outside{
                background: var(--c-surface-neutral-secondary);
            }

            &--inside{
                background: var(--c-surface-accent-main);
            }

            @include mobile{
                display: none;

                width: 35vmin;
                height: 35vmin;
            }
        } 

        &__mask{
            background: var(--c-surface-neutral-secondary);
            width: 90%;
            max-width: 100rem;
            height: 100%;
        }

        &__bar{
            position: absolute;
            left: 0;
            top: 0;
            width: 20%;
            height: 100%;
            transform: skew(-15deg);
            background: var(--c-surface-accent-high);
            animation: loading .6s linear infinite;
            filter: blur(8rem);
        }

        @keyframes loading{
            0%{
                transform: skew(-15deg) translateX(-400%);
            }
            100%{
                transform: skew(-15deg) translateX(600%);
            }
        }
    }
</style>