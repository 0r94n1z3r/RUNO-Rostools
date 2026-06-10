<template>
    <component 
        :is="component" 
        ref="string"
        :key="$slots.default()?.map(k => k.children)?.join('')"
        class="anim-text"
        :class="{
            'anim-text--fin': isFin,
            'anim-text--m-state-off': !switchState && !M().allowed 
        }"
        :mounted="mounted || null"
    >
        <slot/>
    </component>
</template>

<script setup>
    import { animate, text, onScroll } from 'animejs';

    const emit = defineEmits(['reset', 'fin']);

    const mounted = ref(false);

    const props = defineProps({
        component: {type: String, default: 'p'},
        autoplay: {
            type: [Object, String], // immediate
            default: {
                enter: 'bottom top-=15vh',
                sync: 'play',
            }
        },
        delay: {
            type: [Number, String],
            default: 0
        },
        duration: {
            type: [Number, String],
            default: 1000
        },
        switchState: {
            type: Boolean,
            default: true,
        },
        debug: Boolean
    })

    const string = ref(null);

    const type = computed(()=>{
        switch(props.component){
            case 'p': return {key: 'chars', opacity: .1};
            default: return {key: 'chars', opacity: .5};
        }
    })

    let anim;

    const splitCache = new WeakMap();

    const getSplit = (el) => {
        if (splitCache.has(el)) return splitCache.get(el);

        const result = text.split(el, {
            words: { wrap: 'visible'},
            chars: { wrap: 'visible'},
            accessible: true,
            includeSpaces: true
        });

        splitCache.set(el, result);
        return result;
    };

    const init = (immediate = (props.autoplay == 'immediate')) => {
        if (anim) return anim;

        isFin.value = false;

        if (!mounted.value) return;
        if (!string.value?.isConnected) return;

        let parsedString;

        try {
            parsedString = getSplit(string.value);
        } catch (e) {
            console.warn('[AnimText] split failed', e);
            isFin.value = true;
            anim = {};
            return anim;
        }

        const chars = parsedString?.[type.value.key];

        if (!chars?.length) {
            isFin.value = true;
            anim = {};
            return anim;
        }

        const rootColor = getComputedStyle(string.value).color;

        const charColors = new Array(chars.length);
        for (let i = 0; i < chars.length; i++) {
            charColors[i] = getComputedStyle(chars[i]).color;

            chars[i].style.webkitTextStrokeColor = rootColor;
            chars[i].style.webkitTextStrokeWidth = "0px";
            chars[i].style.color = "rgba(0,0,0,0)";
            chars[i].style.opacity = 0;
        }

        const len = chars.length;
        const timePerChar = 20; // ms per char (tweak this!)
        const duration = Math.min(
            1000, // max cap 
            Math.max(300, chars.length * 20)
        );

        const available = Math.max(duration - 1, 0);

        const stepA = (available * 0.8) / Math.max(len - 1, 1);
        const stepB = (available * 0.1) / Math.max(len - 1, 1);

        const delayA = new Array(len);
        const delayB = new Array(len);

        for (let i = 0; i < len; i++) {
            delayA[i] = i * stepA;
            delayB[i] = i * stepB;
        }

        anim = animate(chars, {
            autoplay:
                props.switchState &&
                (immediate || onScroll({ ...props.autoplay, repeat: false })),

            fill: 'both',
            composite: 'replace',

            keyframes: [
                { delay: Number(props.delay) },

                {
                    '-webkit-text-stroke-width': '0',
                    color: 'rgba(0,0,0,0)',
                    delay: (el, i) => delayA[i],
                    ease: 'steps(1)',
                    opacity: type.value.opacity,
                },

                {
                    '-webkit-text-stroke-width': '.1rem',
                    color: 'rgba(0,0,0,0)',
                    scale: 0.9,
                    ease: 'steps(1)',
                    delay: (el, i) => delayB[i],
                },

                {
                    '-webkit-text-stroke-width': '0',
                    color: (el, i) => charColors[i],
                    opacity: 1,
                    scale: 1,
                    ease: 'steps(1)',
                    delay: (el, i) => delayB[i],
                }
            ],

            onComplete: () => {
                emit('fin');
                isFin.value = true;
                if (reset.value) reset.value = false;
            }
        });

        if (!props.switchState) anim.revert?.();

        return anim;
    };

    const isFin = ref();

    onMounted(()=>{
        M().mounted((state)=>{
            mounted.value = true;

            if(!state){
                anim = {};
                return;
            }

            init();
        })
    })

    watch(()=>R().fullPath, ()=>{
        if(M().allowed)init();
    });

//reset
    const reset = defineModel('reset');

    watch(reset, async (n) => {
        if(!M().allowed || !anim?.reverse)return;
        if(!n)return;
        anim.speed = 3;
        await anim.reverse();
        mounted.value = false;
        emit('reset');
        mounted.value = true;
        init();
    })

//switchState
    // onBeforeUnmount(()=>anim?.revert?.());

    watch(
        () => props.switchState,
        async (n) => {
            if(!M().allowed || !anim?.reverse)return;

            if(!n){
                anim.speed = 2;
                await anim.reverse();
                anim.speed = 1;
                isFin.value = false;
                return;
            }

            // await sleep(Number(props.duration) / 50  );
            anim.play();
        }
    )


</script>

<style lang="scss">
    .anim-text{
        &>p{
            position: relative;
            z-index: 1;
        }
    }
</style>

<style lang="scss" scoped>
    .anim-text{
        position: relative;
        z-index: 1;

        &:not([mounted]){opacity: 0;}

        &--fin{
            :deep(span[data-char]){
                color: inherit!important;
            }
        }

        &--m-state-off{
            opacity: 0;
        }
    }
</style>