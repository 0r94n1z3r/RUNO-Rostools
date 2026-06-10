<template>
    <div class="solutions-card" transition-block>
        <div class="solutions-card__image">
            <div class="solutions-card__image-wr">
                <ParallaxWrapper>
                    <img :src="normalizeAssetSrc(info?.images[1]?.url)" />
                    <!-- <img :src="info.imageM" class="mob-visible" /> -->
                </ParallaxWrapper>
            </div>
        </div>
        <div class="solutions-card__content">
            <AnimText component="h3"><span transition-block v-html="info.title"></span></AnimText>
            <AnimText v-if="info.hero_description"><span transition-block v-html="info.hero_description"></span></AnimText>
            <div class="solutions-card__tags">
                <AnimText 
                    v-for="(i, n) in useCategories().subCategories(props.info.id)"
                    class="solution-card-tag"
                    :delay="100 * n"
                >
                    <NuxtLink 
                        class="solution-card-tag__link text-link-basic text-link-basic--u text-link-basic--rev"
                        :to="'/catalog/' + i.name"
                    >
                        {{ useCategories().getShort(i.id) || i.title }}
                    </NuxtLink>
                    <span>•</span>
                </AnimText>
            </div>
            <AnimButton
                class="solutions-card__button"
                :to="'/catalog/' + info.name"
                transition-block
            >
                Подробнее
            </AnimButton>
        </div>
        <p class="solutions-card__number">
            0{{ k+1 }}
        </p>
    </div>
</template>

<script setup>
    const props = defineProps({
        info: Object,
        k: Number
    });
</script>

<style lang="scss" scoped>

    .solutions-card{
        --card-pad: 3.2rem;

        border-radius: 1.2rem;
        background: var(--c-surface-neutral-secondary);
        position: relative;
        @include flex-col;
        overflow: hidden;

        &__image{
            width: 100%;
            padding-bottom: 100%;
            position: relative;
            margin-bottom: -11.5rem;
            @include flex-c;
            flex-shrink: 0;
        }

        &__image-wr{
            top: 50%;
            left: 50%;
            transform: translate(-50%, -55%);
            position: absolute;
            --w: 140%;
            width: var(--w);
            height: var(--w);

            .parallax-wrapper{
                width: 100%;
                height: 100%;
            }

            img{
                width: 60%;
                height: 60%;
                object-fit: contain;

                @include mobile{
                    width: 75%;
                    height: 75%;
                }
            }
        }

        &__content{
            @include flex-col;
            gap: 1.2rem;
            position: relative;
            margin-top: auto;
            padding: var(--card-pad);
            width: 100%;

            &::before{
                @include pseudo-absolute;
                @include all-directions(0);
                background-image: linear-gradient(to bottom, transparent 0%, var(--c-surface-neutral-secondary) 14%);
                pointer-events: none;
            }

            p{
                color: var(--c-text-secondary);
            }
        }

        &__button{
            width: 100%;
            margin-top: 1.2rem;
        }

        &__number{
            @include font-c1;
            position: absolute;
            top: var(--card-pad);
            left: var(--card-pad);
        }

        &__tags{
            position: relative;
            display: flex;
            flex-wrap: wrap;
            z-index: 1;
        }

        @include mobile(1000px - 1px){
            --card-pad: 2.4rem;

            border-radius: .6rem;

            &__image-wr{
                --w: 100%;
                margin-top: -4rem;
            }

            &__content{
                h3{
                    @include font-h2--mob;
                }
            }

            &__button{
                margin-top: .4rem;
            }
        }
    }

    .solution-card-tag{
        color: var(--text-default);

        span{
            content: '•';
            color: var(--c-text-accent);
            margin: 0 .8rem;
        }

        &:last-child span{
            display: none;
        }
    }

    // @include mob-display(1000px - 1px)
</style>