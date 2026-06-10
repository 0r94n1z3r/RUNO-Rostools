<template>
    <div class="dashes-divider">
        <div ref="containerRef" class="dashes-divider__container" transition-block>
            <PP5 class="p5" :sketch="sketch"/>
        </div>
    </div>
</template>

<script setup>
    import { getDashes, DASH } from './dash';
    import { onScroll, animate } from "animejs";
    
    const props = defineProps({
        autoplay: {
            type: [Object, String], // immediate
            default: {
                enter: 'end-=15vh start',
                leave: 'start+=15vh end',
                sync: 'play reverse',
            }
        },
        static: Boolean,
        colors: {
            type: Object,
            default: () => ({
                // dash: '#fff',
                cross: '#fff'
            })
        }
    });

    const containerRef = ref();

    const crossSize = 16;
    const crossSizeCSS = `${crossSize/10}rem`;

    const anim = {
        dashes: 0,
        crosses: 0
    }

    let animInstance;
    onMounted(()=>{
        if(props.static){
            anim.dashes = 1;
            anim.crosses = 1;
            return;
        }
        if (!containerRef.value?.isConnected) return;

        animInstance = animate(anim, {
            duration: 1500,
            ease: 'inOut',
            autoplay: props.autoplay == 'immediate' ? 
                    true : 
                    onScroll({
                        ...props.autoplay,
                        target: containerRef.value,
                    }),
            dashes: [0, 1],
            crosses: [0, 1],
        })
    });
    // onBeforeUnmount(()=>animInstance?.revert?.());

    const sketch = (p5) => {
        class Dash {
            getSection(){
                return p5.width - crossSize - 15
            }

            getDashes(){
                return getDashes(
                    this.getSection()
                );
            }

            draw(){
                p5.push()
                    p5.stroke(props.colors.dash || DASH.stroke);

                    const y = p5.height/2 + .5;
                    const mid = [(anim.dashes/2)*this.getSection(), (1-anim.dashes/2)*this.getSection()];

                    if(anim.dashes > 0){
                        for(const i of this.getDashes()){
                            if(i[0] >= mid[0] && i[1] <= mid[1]) continue;
                            p5.line(i[0]+crossSize/2, y, i[1]+crossSize/2, y);
                        }
                    }
                p5.pop();
            }
        }

        const dash = new Dash();

        const crosses = [];

        class Cross {
            constructor(x, v){
                this.x = x;
                this.v = v;
            }

            draw(){
                p5.push()
                    p5.angleMode(p5.DEGREES);
                    p5.rectMode(p5.CENTER);

                    const half = crossSize/2;

                    p5.translate(this.x + half -.5, 2 + half);

                    p5.noStroke();

                    p5.rotate(360 * 2 * anim.crosses * this.v);

                    p5.fill(props.colors.cross);
                    p5.rect(0, 0, 2, crossSize);
                    p5.rect(0, 0, crossSize, 2);

                    p5.erase();
                    p5.rect(0, 0, 4, 4);
                    p5.noErase();
                p5.pop();
            }
        }

        const handleResize = ()=>{
            crosses.length = 0;
            crosses.push(new Cross(.5, 1));
            crosses.push(new Cross(p5.width-.5 - crossSize, -1));
        }

        p5.setup = () => {
            const { w, h } = size();
            p5.createCanvas(w, h);
            handleResize();
        }

        let fc = 0;

        p5.draw = ()=>{
            p5.clear();
            dash.draw();

            fc++;

            for(const i of crosses){
                i.draw();
            }
        }

        const size = () => {
            const r = containerRef.value?.getBoundingClientRect();
            return { w: Math.max(1, r?.width|0), h: Math.max(1, r?.height|0) };
        };

        const calculateSize = ()=>{
            const { w, h } = size();
            p5.resizeCanvas(w, h);
            handleResize();
        }

        onResizeEnd(calculateSize);
        M().mounted(calculateSize);
    }
</script>

<style lang="scss" scoped>
    .dashes-divider{
        --cross-size: v-bind(crossSizeCSS);

        padding: var(--content-pad) 0;
        width: calc(100vw - var(--pad-o) * 4 + var(--cross-size, 1.6rem));
        margin: 0 auto;
        mix-blend-mode: difference;
        pointer-events: none;
        
        &__container{
            height: calc(var(--cross-size, 1.6rem) + .2rem);
            width: 100%;
        }

        @include nav-mobile{
            padding: calc(var(--content-pad) / 2) 0;

            &__container{
                display: none;
            }
        }
    }
</style>