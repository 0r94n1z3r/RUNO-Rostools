<template>
    <div>
        <div 
            id="hero" 
            class="hero"
            :class="{'header-state-dark': gradLine>15}"
            :m="!M().allowed || null"
        >
            <div class="hero__scroll-container">
                <div class="hero__content-container">
                    <div class="hero__background" :style="{'pointer-events': gradLine>=50 ? 'all' : 'none'}">
                        <div class="hero-block-1">
                            <div class="hero-block-1__content">
                                <AnimText autoplay="immediate" component="h1" :transition-block="gradLine>=50 || null">Наше оборудование<br/>решает ваши ключевые задачи</AnimText>
                                <AnimButton 
                                    autoplay="immediate" 
                                    type="light" 
                                    delay="1000" 
                                    :transition-block="gradLine>=50 || null" 
                                    @click="goToSolutions"
                                >
                                    Подробнее о продуктах
                                </AnimButton>
                            </div>
                        </div>
                        <div class="hero__background-img hero__scalable">
                            <img  src="./hero.webp" />
                        </div>
                    </div>
                    <div class="hero-block-2 hero__scalable" :style="{'pointer-events': gradLine<50 ? 'all' : 'none'}">
                        <DashesDivider 
                            static
                            :colors="{
                                cross: '#000',
                                dash: '#E3E3E3'
                            }"
                        />
                        <div class="hero-block-2__content content-wrapper">
                            <AnimText class="hero-block-2__title" :autoplay="textAutoplay" component="h2" :transition-block="gradLine<50 || null">
                                Доступные решения для обработки металла
                            </AnimText>
                            <div 
                                class="hero-block-2__description"
                                :class="{'desk-visible': M().allowed}"
                            >
                                <AnimText :autoplay="textAutoplay" :delay="500" :transition-block="gradLine<50 || null">
                                    <span nobr>Мы реализуем</span> большие <span nobr>и мощные</span> металлообрабатывающие станки, 
                                    используемые <span nobr>в промышленном</span> производстве, готовы предложить удобную 
                                    <span nobr>и эффективную</span> технику <span nobr>для мелкосерийного</span> производства 
                                    <span nobr>и мастерских</span>. <span nobr>На всё</span> оборудование, приобретаемое 
                                    <span nobr>у нас</span>, распространяется гарантия <span nobr>и в</span> случае необходимости 
                                    полное техническое сервисное обслуживание, наладка станков <span nobr>и агрегатов</span> 
                                    непосредственно <span nobr>на месте</span>.
                                </AnimText>
                                <AnimButton 
                                    :autoplay="textAutoplay" 
                                    :delay="500"
                                    :transition-block="gradLine<50 || null"
                                    @click="goToSolutions"
                                >
                                    Подробнее
                                </AnimButton>
                            </div>
                        </div>
                        <HeroSVG id="hero-graphic" class="hero-block-2__graphic"/>
                    </div>
                </div>
            </div>
        </div>
        <div v-if="M().allowed" class="hero-mobile-text mob-visible content-wrapper">
            <AnimText :autoplay="textAutoplay" :delay="500" :transition-block="gradLine<50 || null">
                <span nobr>Мы реализуем</span> большие <span nobr>и мощные</span> металлообрабатывающие станки, 
                используемые <span nobr>в промышленном</span> производстве, готовы предложить удобную 
                <span nobr>и эффективную</span> технику <span nobr>для мелкосерийного</span> производства 
                <span nobr>и мастерских</span>. <span nobr>На всё</span> оборудование, приобретаемое 
                <span nobr>у нас</span>, распространяется гарантия <span nobr>и в</span> случае необходимости 
                полное техническое сервисное обслуживание, наладка станков <span nobr>и агрегатов</span> 
                непосредственно <span nobr>на месте</span>.
            </AnimText>
            <AnimButton 
                :autoplay="textAutoplay" 
                :delay="500"
                :transition-block="gradLine<50 || null"
                @click="goToSolutions"
            >
                Подробнее
            </AnimButton>
        </div>
    </div>
</template>

<script setup>
    import { onScroll, animate, svg, stagger,} from "animejs";
    import HeroSVG from "./hero.svg?component";

    const zoom = ref(1.5);
    const heights = 2;
    const gradLine = ref(100);

    const reverseZoom = computed(()=>1 / zoom.value);

    const anims = [];
    onMounted(()=>{ // notdone сделать composable
        M().mounted(async (state)=>{
            if(!state){
                zoom.value = 0;
                return;
            }
            if (!document.querySelector('#hero')?.isConnected) return;

            await sleep();

            anims[0] = animate(zoom, {
                value: [zoom.value, 1],
                autoplay: onScroll({
                    target: '#hero',
                    enter: 'top top',
                    leave: 'bottom bottom',
                    sync: .35,
                })
            })

            anims[1] = animate(gradLine, {
                value: [100, 0],
                ease: 'linear',
                autoplay: onScroll({
                    target: '#hero',
                    enter: 'bottom bottom-=50rem',
                    leave: 'bottom bottom',
                    sync: .35,
                })
            })

            const drawable = document.querySelector('#hero-graphic path');
            if (drawable?.isConnected) {
                anims[2] = animate(svg.createDrawable('#hero-graphic path'), {
                    draw: ['0 0', '0 1'],
                    delay: stagger(20),
                    autoplay: onScroll({
                        target: '#hero',
                        enter: 'bottom bottom-=60rem',
                        leave: 'bottom bottom',
                        sync: .35,
                    })
                })
            }
        }, 'hero')
    });

    // onBeforeUnmount(()=>{ anims.forEach(a=>a?.revert?.()); })

    const textAutoplay = {
        target: '#hero',
        enter: 'bottom bottom-=70vh',
        sync: 'play'
    }

    const scroll = () => {
        window.scrollTo({
            top: window.scrollY + window.innerHeight,
            behavior: 'smooth'
        });
    }

    const goToSolutions = () => {
        scrollToQuery('#home-solutions')
    }

</script>

<style lang="scss" scoped>
    .hero{
        --h: v-bind(heights);

        --image-w: 198rem;
        --image-shift: -31.1rem;
        --graphic-w: calc(var(--image-w) - 124rem);
        --graphic-shift: calc(var(--image-shift) + 35.7rem);
        --graphic-transform: translateX(-0.6rem) scaleX(0.995);

        height: calc(var(--h) * 100 * var(--vh));
        position: relative;
        z-index: 2;

        &__scalable{
            transform: scale(v-bind(zoom));
            transform-origin: 50% 100%;
        }
        
        &__scroll-container{
            position: sticky;
            left: 0;
            top: 0;
            width: 100vw;
            height: calc(100 * var(--vh));
            overflow: hidden;
            @include flex-c;
        }

        &__content-container{
            position: absolute;
            height: 100%;
            width: var(--image-w);
            @include flex-c;

            &::before,
            &::after{
                @include pseudo-absolute;
                width: 2rem;
                height: 100%;
                top: 0;
                background: linear-gradient(90deg, #fff 5%, transparent 100%);
                z-index: 3;
            }

            &::before{
                left: -.1rem;
            }

            &::after{
                right: -.1rem;
                transform: scaleX(-1);
            }
        }

        &__background{
            position: absolute;
            height: 100%;
            width: var(--image-w);
            clip-path: polygon(0 0, 100% 0, 100% calc(v-bind(gradLine) * 1%), 0 calc(v-bind(gradLine) * 1%));
            overflow: hidden;
            z-index: 2;
            
            img {
                position: absolute;
                bottom: var(--image-shift);
                width: 100%;
            }
        }

        &__background-img{
            position: absolute;
            height: 100%;
            width: var(--image-w);
            overflow: hidden;
            top: 0;
            left: 0;
        }
    }

    .hero-block-1{
        position: relative;
        height: 100%;
        z-index: 2;
        clip-path: polygon(0 0, 100% 0, 100% calc(v-bind(gradLine) * 1%), 0 calc(v-bind(gradLine) * 1%));
        padding-top: 10%;

        &::before{
            @include pseudo-absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 50%;
            background: linear-gradient(180deg, black 0%, transparent 100%);
            opacity: .5;
            z-index: -1;
        }

        &__content{
            @include flex-col;
            gap: 3.2rem;
            align-items: center;
            width: calc(100vw - var(--pad) * 2);
            margin: 0 auto;
            height: 100%;
        }

        h1{
            color: var(--c-white);
            text-align: center;
            max-width: 84rem;
        }
    }

    .hero-block-2{
        position: relative;
        width: 100vw;
        height: calc(100 * var(--vh));
        z-index: 1;
        @include flex-col;
        justify-content: end;
        align-items: center;

        clip-path: polygon(0 calc(v-bind(gradLine) * 1%), 100% calc(v-bind(gradLine) * 1%), 100% 100%, 0 100%);
        overflow: hidden;

        &__graphic{
            width: var(--graphic-w);
            padding-bottom: var(--graphic-shift);
            transform: var(--graphic-transform);
            will-change: transform;
        }

        &__content{
            display: flex;
            gap: 4.4rem;
            padding-bottom: 6.4rem;
            margin-bottom: -1rem;
        }

        &__title{
            width: 57rem;
            flex-shrink: 0;
        }

        &__description{
            padding-top: 2rem;
            @include flex-col;
            gap: 3rem;
            font-size: 1.7rem;
            line-height: 2.2rem;
        }

        :deep(.dashes-divider){
            mix-blend-mode: normal;
        }
    }

    .hero-mobile-text{
        @include flex-col;
        gap: var(--pad);
        margin-bottom: 3.2rem;
        
        .anim-button{
            width: 100%;
        }
    }

    @include mob-display();

    @include nav-mobile{
        .hero{
            --image-w: 190vw;
            --image-shift: -26.9vw;
            --graphic-w: calc(var(--image-w) - 118.8vw);
            --graphic-shift: calc(var(--image-shift) + 34.2vw);
            --graphic-transform: translateX(-0.5vw) scaleX(0.99);
        }

        .hero-block-2{
            &__content{
                @include flex-col;
                gap: 0;
            }

            &__title{
                width: 100%;
            }
        }
    }

    @include mobile(880px){
        .hero{
            &__scalable{
                transform: none!important;
            }
            
            --image-w: calc(256vw - var(--pad) * 2);
            --image-shift: -26vw;
            --graphic-w: calc(var(--image-w) - 156.4vw);
            --graphic-shift: calc(var(--image-shift) + 45.1vw);
            --graphic-transform: translateX(-0.7vw) scaleX(0.99);
        }

        .hero-block-1{
            padding-top: 20rem;

            :deep(h1){
                @include font-h1--mob;
            }
        }

        .hero-block-2{
            &__graphic{
                margin: 0 auto;
            }

            &__title{
                @include font-h1--mob;
            }

            &__description{
                gap: 2rem;
                @include font-p3
            }
        }
    }

    @include mobile{
        .hero{
            --image-w: calc(256vw - var(--pad) * 2);
            --image-shift: 0vw;
            --graphic-w: calc(100vw - var(--pad) * 2);
            --graphic-shift: 44.9vw;
            --graphic-transform: translateX(-0.9vw) scaleX(0.99);
            margin-bottom: calc(-1 * var(--graphic-shift) + 4.8rem);
        }

        .hero-block-2{
            &__graphic{
                max-width: calc(120rem + var(--pad) * 2);
            }

            :deep(.anim-button){
                width: 100%;
            }
        }
    }

    @media (max-height: 210vw) and (max-width: $mobile){
        .hero{
            --image-shift: -34vw;
            --graphic-shift: 10.9vw;
        }
    }

    :deep(.dashes-divider){
        transform: scale(v-bind(reverseZoom));
    }

    [m]{
        height: auto;

        .hero{
            &__scroll-container,
            &__content-container,
            &__background{
                position: relative;
                top: unset;
                left: unset;
            }

            &__scroll-container{
                height: auto;
            }

            &__content-container{
                flex-direction: column;
            }

            &__scalable{
                transform: none;
                pointer-events: all!important;
            }

            &__background{
                clip-path: none;
                height: var(--100vh);
                pointer-events: all!important;
            }
        }

        .hero-block-1{
            height: var(--100vh);
        }

        .hero-block-2{
            height: auto;
        }

        .hero-block-1,
        .hero-block-2{
            clip-path: none;
        }
    }
</style>