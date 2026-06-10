<template>
    <Teleport 
        to="body"
    >
        <div 
            class="page-transition"
            :class="[
                `page-transition--${state}`,
            ]"
        >
            <div class="page-transition__container">
                <div 
                    v-for="i in blocks" 
                    class="page-transition-block"
                    :class="[
                        state == 'start' ? `page-transition-block--fade` : null
                    ]"
                    :style="{
                        width: i.width + 'px',
                        height: i.height + 'px',
                        left: i.x + 'px',
                        top: i.y + 'px',
                    }"
                >
                    <div class="page-transition-block__container">
                        <div class="page-transition-block__shade page-transition-block__shade--hor"></div>
                        <div class="page-transition-block__shade page-transition-block__shade--vert"></div>
                    </div>
                </div>
                <LogoLoader />
            </div>
        </div>
    </Teleport>
</template>

<script setup>
    import { engine } from 'animejs'

    const state = ref('idle');

    const blocks = ref([]); 

    let settleTimer = null;
    let forceFinishTimer = null;
    let finInProgress = false;
    let handleWindowSettled = () => {};

    const setBlocks = () =>
        blocks.value = [...document.querySelectorAll('[transition-block]')]
            .map(el => [el, el.getBoundingClientRect()])
            .filter(([, r]) => 
                r.bottom > 0 && r.right > 0 &&
                r.top < innerHeight && r.left < innerWidth)
            .map(([el, r]) => ({
                el,
                x: r.left,
                y: r.top,
                width: r.width,
                height: r.height
            }));

    onMounted(setBlocks);

    let isPageFinished = true;
    let isTimeoutFinished = true;

    const clearTimers = () => {
        if (settleTimer) {
            clearTimeout(settleTimer);
            settleTimer = null;
        }
        if (forceFinishTimer) {
            clearTimeout(forceFinishTimer);
            forceFinishTimer = null;
        }
    };

    const resetState = () => {
        clearTimers();
        finInProgress = false;
        state.value = 'idle';
        blocks.value = [];
        try {
            engine.resume();
        } catch {
        }

        if(R().name != 'Product') {
          useProdTransition().state = 'idle';
        }
    };

    onPageTransitionStart('page-transition', async (to, from) => {
        if(to.meta?.name == 'Product' || to?.path == from?.path)return;

        useProdTransition().state = 'idle';
        clearTimers();
        finInProgress = false;

        try {
            engine.pause();
        } catch {
        }

        setBlocks();
        await sleep();
        state.value = 'start';
        await sleep();
        
        isPageFinished = false;
        isTimeoutFinished = false;
        settleTimer = setTimeout(()=>{
            isTimeoutFinished = true;
            if(isPageFinished)fin();
        }, 300);

        forceFinishTimer = setTimeout(() => {
            fin();
        }, 1800);

        await sleep(200);
        return;
    });

    onPageTransitionFinish(() => {
        isPageFinished = true;
        if(isTimeoutFinished)fin();
    });

    const fin = async ()=>{
        if (finInProgress || state.value == 'idle') {
            return;
        }
        finInProgress = true;
        clearTimers();
        await sleep(100);
        state.value = 'fin';
        await sleep(300);
        resetState();
    }

    onMounted(() => {
        handleWindowSettled = () => {
            if (state.value != 'idle') {
                fin();
            }
        };

        window.addEventListener('pageshow', handleWindowSettled);
        window.addEventListener('load', handleWindowSettled);
    });

    onBeforeUnmount(() => {
        clearTimers();
        window.removeEventListener('pageshow', handleWindowSettled);
        window.removeEventListener('load', handleWindowSettled);
    });

    const error = useError()
    watch(
        error,
        (n) => {
            if (!n)return;
            fin()
        },
        { immediate: true },
    )
</script>

<style lang="scss" scoped>
    .page-transition{
        position: fixed;
        @include all-directions(0);
        pointer-events: none;
        z-index: 9;
        overflow: hidden;

        transition: .3s;
        transform: translateZ(0);
        will-change: height, opacity;
        height: 130vh;
        background: #fff;

        &--idle{
            height: 0;
            opacity: 0;
        }

        &--start{
            transition: height .3s, opacity 0s;
            
            .logo-loader{
                transition: 2s;
                // transform: translateY(calc(-50vh + 50% + 3.2rem));
            }
        }

        &--fin{
            height: 130vh;
            opacity: 0;
        }

        &__container{
            position: relative;
            left: 0;
            top: 0;
            width: 100vw;
            height: 100vh;
            @include flex-col;
            align-items: center;
        }

        .page-transition-block{
            position: absolute;

            --overhang: .5rem;
            --color: var(--c-brand-88);

            --shift: 0%;
            --trs: 0s;

            &--fade{
                --shift: -100%;
                --trs: .4s;
            }

            &__container{
                width: 100%;
                height: 100%;
                position: relative;
            }

            &__shade{
                position: absolute;
                pointer-events: none;
                overflow: hidden;

                &--hor{
                    height: 100%;
                    width: calc(100% + var(--overhang) * 2);
                    top: 0;
                    left: calc(-1 * var(--overhang));

                    &::before,
                    &::after
                    {
                        @include pseudo-absolute;
                        left: 0;
                        width: 100%;
                        height: .1rem;
                        background: var(--color);
                        transition: var(--trs);
                        transition-delay: .2s;
                    }

                    &::before{
                        top: 0;
                        transform: translateX(var(--shift));
                    }

                    &::after{
                        bottom: 0;
                        transform: translateX(calc(-1 * var(--shift)));
                    }
                }

                &--vert{
                    width: 100%;
                    height: calc(100% + var(--overhang) * 2);
                    left: 0;
                    top: calc(-1 * var(--overhang));

                    &::before,
                    &::after
                    {
                        @include pseudo-absolute;
                        top: 0;
                        height: 100%;
                        width: .1rem;
                        background: var(--color);
                        transition: var(--trs);
                        transition-delay: .2s;
                    }

                    &::before{
                        left: 0;
                        transform: translateY(var(--shift));
                    }
                    
                    &::after{
                        right: 0;
                        transform: translateY(calc(-1 * var(--shift)));
                    }
                }
            }
        }
    }

    .logo-loader{
        position: absolute;
        @include all-directions(0);
        margin: auto;
        // top: 50%;
        transform: translateY(-50%);
        height: min-content;
        // top: calc(var(--100vh) - 3.2rem - 3rem);
    }
</style>