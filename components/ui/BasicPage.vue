<template>
    <div
        class="basic-page"
        :class="{'basic-page--flex': $slots?.side}"
    >
        <DashesDivider />
        <div class="content-wrapper basic-page__wrapper">
            <div class="basic-page__title">
                <Breadcrumbs v-if="breadcrumbs" :="breadcrumbs" transition-block/>
                <div class="basic-page__title-text">
                    <AnimText v-if="title" immediate component="h1" delay="200" transition-block>{{title}}</AnimText>
                    <slot name="title"/>
                </div>
                <AnimText v-if="description" immediate delay="200" transition-block>{{description}}</AnimText>
            </div>
            <slot name="side"/>
        </div>
        <slot />
    </div>
</template>

<script setup>

    const props = defineProps({
        breadcrumbs: Object,
        title: String,
        description: String,
    });

</script>

<style lang="scss" scoped>
    .basic-page{
        --title-mx-w: 100%;
        --title-mb: 0;
    
        padding-top: 4rem!important;

        &--flex{
            .basic-page{
                &__title{
                    width: 100%;
                }

                &__wrapper{
                    display: flex;
                    align-items: start;
                    gap: 2.4rem;
                }
            }
        }
        
        &__title{
            max-width: var(--title-mx-w);
            margin-bottom: var(--title-mb);
            min-width: 0;
            overflow: hidden;

            &>*{
                width: fit-content;
            }
        }

        &__title-text{
            width: 100%;
            @include flex-jtf;
            align-items: start;
            gap: 1.2rem;
        }

        .breadcrumbs{
            margin-bottom: 3.2rem;
        }

        p{
            margin-top: 1.2rem;
            @include font-p2;
        }

        @include mobile{
            h1{
                @include font-h1--mob;
            }

            p{
                margin-top: 1.2rem;
                @include font-p3;
            }
        }

    }
</style>