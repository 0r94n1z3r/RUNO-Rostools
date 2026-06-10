<template>
    <div class="pp-hero">
        <div class="content-wrapper-out">
            <div class="pp-hero__content">
                <div class="pp-hero__top">
                    <Breadcrumbs
                        class="desk-visible"
                        :list="breadcrumbs"
                        transition-block
                    />
                    <div class="pp-hero-top-buttons">
                        <Button
                            :icon-left="IconArrowLeftLine"
                            type="light"
                            class="pp-hero-top-buttons__back mob-visible"
                            transition-block
                            @click="handleBack"
                        >
                            Назад
                        </Button>
                        <div class="pp-hero-top-buttons__right">
                            <ProdCardStatus transition-block :="{info}" class="mob-visible"/>
                            <!-- <Button 
                                v-if="info.model"
                                square 
                                class="mob-visible"
                                type="light"
                                transition-block
                                @click="modal3DRef.modal.call()"
                            >
                                <Icon360Degree/>
                            </Button> -->
                        </div>
                    </div>
                    <div class="pp-hero__title">
                        <AnimText v-if="info?.title" component="h1" autoplay="immediate" transition-block>{{ info.title }}</AnimText>
                    </div>
                    <div class="pp-hero__description">
                        <AnimText v-if="info?.short_description" autoplay="immediate" transition-block>{{ info.short_description }}</AnimText>
                    </div>
                </div> 

                <div class="pp-hero__anchor">
                    <PPSlider 
                        v-model="slide"
                        :="{images}"
                        @fullscreen="sliderModalRef.call($event);"
                    />
                </div>
                
                <div class="pp-hero__bottom">
                    <div class="pp-hero__stats">
                        <div v-for="stat in stats" class="pp-hero-stat">
                            <AnimText class="pp-hero-stat__title" :delay="200" :duration="400" transition-block>{{stat.title}}</AnimText>
                            <AnimText class="pp-hero-stat__value" :delay="200" :duration="400" transition-block>{{stat.value}}</AnimText>
                        </div>
                    </div>
                    <div class="pp-hero__thumbs-wr">
                        <Button 
                            v-if="images.length > 1"
                            class="mob-visible"
                            type="light"
                            :icon-left="IconArrowLeftSLine"
                            transition-block
                            @click="slide--"
                        />
                        <PPThumbs 
                            v-model="slide"
                            :list="images"
                            :has360="info.model"
                            @call360="modal3DRef.modal.call()"
                        />
                        <Button
                            v-if="images.length > 1"
                            class="mob-visible"
                            type="light"
                            :icon-left="IconArrowRightSLine"
                            transition-block
                            @click="slide++"
                        />
                    </div>
                </div>

            </div>
        </div>

        <PPHero3D
            v-if="info.model"
            ref="modal3DRef"
            :="{info}"
        />

        <PPSliderFullscreen 
            ref="sliderModalRef"
            v-model="slide"
            :="{images}"
        />
    </div>
</template>

<script setup>
    import { IconArrowLeftLine, IconArrowLeftSLine, IconArrowRightSLine } from "#components";

    const props = defineProps({
        info: Object,
        breadcrumbs: Array,
        to: { type: [String, Object], default: undefined },
    });

    const slide = ref(0);

    const modal3DRef = ref();

    const sliderModalRef = ref();

    const images = computed(() => {
        const list = props.info?.images;
        return Array.isArray(list) && list.length > 0 ? list : [{ url: '/no-photo.svg' }];
    });

//back
    const handleBack = () => {
        const historyBack = R().getHistory()?.back;
        const backPath = historyBack ? R().resolve(historyBack)?.path : null;
        const toPath = props.to ? R().resolve(props.to)?.path : null;
        if (backPath && toPath && backPath === toPath) {
            R().back();
            return;
        }
        const list = props.breadcrumbs;
        if (!Array.isArray(list) || list.length < 2) {
            R().push('/catalog');
            return;
        }
        const prev = list[list.length - 2];
        const target = prev?.to ?? prev?.href;
        if (target) {
            R().push(target);
            return;
        }
        R().push('/catalog');
    }

//stats
    const stats = computed(()=>{
        if(!props.info)return [];

        const attrs = props.info.attributes || props.info?.primary_attributes || [];
        if (!Array.isArray(attrs)) {
            return [];
        }

        const res = attrs.map(e => ({
            title: e.property?.title,
            value: e.value,
        }));

        return res.slice(0, 3);
    })

</script>

<style lang="scss" scoped>
    .pp-hero{
        background: var(--c-surface-neutral-secondary);
        overflow: hidden;

        &__content{
            @include flex-c;
            position: relative;
        }

        &__anchor{
            width: 100%;
            position: relative;
            @include flex-c;
        }

        &__swiper-ssr{
            width: 100%;
            @include flex-c;
        }

        img{
            display: block;
            width: 100%;
            height: 100%;
            object-fit: contain;
        }

        &__top{
            position: absolute;
            left: 0;
            top: calc(var(--header-height, 9.4rem) + 3.2rem);
            @include flex-col;
            gap: 2.4rem;
            z-index: 5;
            width: 100%;
        }

        .pp-hero-top-buttons{
            @include flex-jtf;
            gap: .8rem;
            
            &__right{
                @include flex-jtf;
                gap: .8rem;

                :deep(.icon){
                    --icon-size: 2.4rem;
                }
            }

            &__back{
                --pad-x: 1.6rem;
            }
        }

        &__title{
            h1{
                @include font-h2;
                position: relative;
            }
            margin-bottom: -1.2rem;
            width: max-content;
            max-width: 100%;
        }

        &__description{
            max-width: 34rem;
        }

        @mixin blr{
            padding: .8rem 1.2rem;
            margin: -.8rem -1.2rem;
            border-radius: .6rem;
            position: relative;
            background: var(--c-surface-neutral-high-inverse);
            @include blur-background(.6rem, 0px);

            &>*{
                position: relative;
                z-index: 2;
            }
        }

        &__title,
        &__description{
            @include blr;
        }

        &__bottom{
            bottom: var(--pad-o);
            position: absolute;
            left: 0;
            @include flex-col;
            gap: 2.4rem;
            z-index: 5;
            width: 100%;
        }

        &__stats{
            @include flex-jtf;
            gap: 6.4rem;
            width: fit-content;
            max-width: 100%;
        }

        .pp-hero-stat{
            @include blr;
        
            &__title{
                color: var(--c-text-secondary);
                margin-bottom: 1.6rem;
            }

            &__value{
                @include font-c1;
            }
        }

        @include mobile(750px){
            &__content{
                @include flex-col;
                padding-top: calc(var(--pad-o) + 7rem + 1.2rem);
            }

            &__top{
                top: unset;
                position: relative;
            }

            &__title{
                max-width: 100%;
                h1{
                    @include font-h1--mob;
                }
            }

            &__description{
                @include font-p4;
                max-width: 100%;
            }

            &__bottom{
                bottom: 1.2rem;
                gap: 1.6rem;
                width: 100%;
            }

            &__stats{
                gap: .8rem
            }

            .pp-hero-stat{
                &__title{
                    margin-bottom: .8rem;
                    @include font-p5;
                }

                &__value{
                    @include font-c3;
                }
            }

            &__thumbs-wr{
                @include flex-c;
                gap: .4rem;

                .button{
                    flex-shrink: 0;
                }

                @include mobile(750px){
                    .pp-thumbs{
                        width: calc(100% - 9.8rem);
                    }
                }
            }

            :deep(.pp-thumbs){
                --w: 4.4rem;
                --swiper-gap: .4rem;

                .pp-thumb--360{
                    --icon-size: 2.4rem;
                }
            }
        }
    }

    @include mob-display(750px);
</style>