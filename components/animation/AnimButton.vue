<template>
    <div 
        ref="animRef" 
        class="anim-button"
        :class="[
            `anim-button--${type}`,
            !switchState && !M().allowed  && 'anim-button--m-state-off'
        ]"
        :mounted="mounted || null"
        :m="!M().allowed || null"
    >
        <div class="anim-button__shade anim-button__shade--hor"></div>
        <div class="anim-button__shade anim-button__shade--vert"></div>
        <Button :="{...$attrs, ...props, onClick:()=>{}}" :square="isEmpty"><slot/></Button>
    </div>
</template>

<script setup>
    import { animate, onScroll } from 'animejs';


    const props = defineProps({
        autoplay: {
            type: [Object, String], // immediate
            default: {
                enter: 'bottom top',
                sync: 'play'
            }
        },
        delay: {
            type: [Number, String],
            default: 0
        },
        duration: {
            type: [Number, String],
            default: 1500
        },
        type: { // dark / light / accent
            type: String, 
            default: 'dark'
        },
        switchState: {
            type: Boolean,
            default: true,
        }
    })

    const mounted = ref(false);

    const animRef = ref();

    let anim;
    onMounted(()=>{
        M().mounted((state)=>{
            mounted.value = true;

            if(!state){
                anim = {};
                return;
            }

            const el = animRef.value;
            if(!el?.isConnected) return;

            anim = animate(el, {
                autoplay:  props.switchState && (props.autoplay == 'immediate' ? true : onScroll(props.switchState && props.autoplay)),
                duration: Number(props.duration),
                delay: Number(props.delay),
                '--shade-h0': '-100%',
                '--shade-h1': '200%',
                '--shade-v0': '-100%',
                '--shade-v1': '200%',

                '--btn': [
                    '100%',
                    '100%',
                    '100%',
                    '0%',
                ],

                keyframes: {
                    '25%': {
                        '--shade-h0': '-100%',
                        '--shade-h1': '200%',
                        '--shade-v0': '-100%',
                        '--shade-v1': '200%',
                    },
                    '50%': {
                        '--shade-h0': '0%',
                        '--shade-h1': '0%',
                        '--shade-v0': '-100%',
                        '--shade-v1': '200%',
                    },
                    '75%': {
                        '--shade-h0': '0%',
                        '--shade-h1': '0%',
                        '--shade-v0': '0%',
                        '--shade-v1': '0%',
                    },
                    '100%': {
                        '--shade-h0': '201%',
                        '--shade-h1': '-101%',
                        '--shade-v0': '201%',
                        '--shade-v1': '-101%',
                    },
                },
            })
        })
    })

    // onBeforeUnmount(()=>anim?.revert?.())

    //switchState
        watch(
            () => props.switchState,
            async (n) => {
                if(!M().allowed || !anim?.reverse)return;

                if(!n){
                    anim.speed = 2;
                    await anim.reverse();
                    anim.speed = 1;
                    return;
                }

                anim.play();
            }
        )

    //empty
        const slots = useSlots();
        const isEmpty = computed(()=>!slots.default); 
</script>

<style lang="scss" scoped>
    .anim-button{
        position: relative;
        width: fit-content;
        height: fit-content;

        :deep(.button){
            width: 100%;
        }

        &:not([mounted]){
            opacity: 0;
        }

        --brd: var(--c-surface-neutral-main);
        &--light{--brd: var(--c-border-neutral-main);}
        &--accent{--brd: var(--c-surface-accent-main);}
        &--transparent,
        &--transparent-dark{
            --brd: var(--c-border-neutral-high-inverse);
        }

        --shade-h0: -100%;
        --shade-h1: 200%;
        --shade-v0: -100%;
        --shade-v1: 200%;
        --btn: 100%;

        --overhang: .5rem;

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
                    background: var(--brd);
                }

                &::before{
                    top: 0;
                    transform: translateX(var(--shade-h0));
                }

                &::after{
                    bottom: 0;
                    transform: translateX(var(--shade-h1));
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
                    background: var(--brd);
                }

                &::before{
                    left: 0;
                    transform: translateY(var(--shade-v0));
                }
                
                &::after{
                    right: 0;
                    transform: translateY(var(--shade-v1));
                }
            }
        }

        :deep(.button){
            clip-path: polygon(0 var(--btn), 100% var(--btn), 100% 100%, 0 100%);
        }

        &[m]{
            --btn: 0%;
        }

        &--m-state-off{
            opacity: 0;
        }
    }
</style>