<template>
    <NewsCardPlaceholder v-show="info.loading"/>
    <NuxtLink v-show="!info.loading" :to="`/news/${info.name}`" class="news-card card-cover-container" transition-block>
        <CardCover :src="info?.preview_image"/>
        <p class="news-card__topic font-c2">{{ info.category }}</p>
        <h2 class="news-card__title font-h3">{{ info.title }}</h2>
        <p class="news-card__description" v-html="info.content"></p>
    </NuxtLink>
</template>

<script setup>
    const props = defineProps({
        info: Object
    });
</script>

<style lang="scss" scoped>
    .news-card{
        .news-card-cover{
            @include transition-bounce;
            will-change: transform;
        }

        &__topic{
            color: var(--c-text-secondary);
            margin-top: 2.4rem;
        }

        &__title{
            margin-top: .8rem;
            @include multiple-text-overflow(2);
            transition: .3s;
        }

        &__description{
            color: var(--c-text-secondary);
            margin-top: 1.2rem;
            @include multiple-text-overflow(3);

            :deep(){
                *{
                    margin: 0;
                    @include font-p3;
                }

                h1,
                h2,
                h3,
                br{
                    display: none;
                }
            }
        }

        @include hover{
            &:hover{
                .news-card__title{
                    color: var(--c-text-accent);
                }
            }
        }

        @include mobile{
            &__topic{
                @include font-c3;
            }

            &__title{
                @include font-h2--mob;
            }
        }
    }
</style>