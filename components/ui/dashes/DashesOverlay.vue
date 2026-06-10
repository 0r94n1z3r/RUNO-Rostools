<template>
    <div ref="containerRef" class="dashes-overlay">
        <PP5 class="p5" :sketch="sketch"/>
    </div>
</template>

<script setup>
    import { getDashes, DASH } from './dash';

    const containerRef = ref();
    const { y: scrollY } = useWindowScroll();

    const sketch = (p5) => {
        const dashes = [];

        class Dash {
            constructor(x){
                this.x = x;
            }

            getDashes(){
                return getDashes(
                    p5.height,
                    scrollY.value
                );
            }

            draw(){
                p5.push();
                    p5.stroke(DASH.stroke);
                    for(const i of this.getDashes()){
                        p5.line(this.x, i[0], this.x, i[1]);
                    }
                p5.pop();
            }
        }
        
        const handleResize = ()=>{
            dashes.length = 0;
            dashes.push(new Dash(.5));
            dashes.push(new Dash(p5.width-.5));
        }

        p5.setup = () => {
            const { w, h } = size();
            p5.createCanvas(w, h);
            handleResize();
        }

        p5.draw = ()=>{
            p5.clear();

            dashes.forEach(dash => {
                dash.draw();
            })

        }

        const size = () => {
            const r = containerRef.value.getBoundingClientRect();
            return { w: Math.max(1, r.width|0), h: Math.max(1, r.height|0) };
        };

        onResizeEnd(()=>{
            const { w, h } = size();
            p5.resizeCanvas(w, h);
            handleResize();
        })
    }
</script>

<style lang="scss" scoped>
    .dashes-overlay{
        pointer-events: none;
        position: fixed;
        top: 0;
        left: 0;
        right: 0;
        width: calc(100vw - var(--pad-o) * 4);
        margin: 0 auto;
        height: calc(100 * var(--vh));
        overflow: hidden;
        z-index: 1;
        mix-blend-mode: difference;

        .p5{
            width: 100%;
            height: 100%;
        }

        @include nav-mobile{
            display: none;
        }
    }
</style>