<template>
    <div v-if="titles.length" class="pp-info">
        <DashesDivider />
        <div class="content-wrapper">
            <Tabs
                class="desk-visible"
                :="{titles}"
                :has-background="false"
            >
                <template #slot-0>
                    <ClientOnly>
                        <AnimText v-if="hasDescription" class="font-h3" transition-block component="div">
                            <ParsedHTML class="pp-info__description" :html="info?.description"></ParsedHTML>
                        </AnimText>
                    </ClientOnly>
                </template>
                <template #slot-1>
                    <PPAttributes :="{info}"/>
                </template>
                <template #slot-2>
                    <PPVideo :="{info}"/>
                </template>
            </Tabs>
            <div class="pp-info__mob mob-visible" transition-block>
                <Collapsable v-if="hasDescription" title="Описание">
                    <ParsedHTML class="pp-info__description" :html="info?.description"></ParsedHTML>
                </Collapsable>

                <Collapsable v-if="hasAttributes" title="Характеристики">
                    <PPAttributes :="{info}"/>
                </Collapsable>
                
                <Collapsable v-if="hasVideo" title="Видеообзор">
                    <PPVideo :="{info}"/>
                </Collapsable>
            </div>
        </div>
    </div>
</template>

<script setup>
    const props = defineProps({
        info: Object
    });

    const hasDescription = computed(() => props.info?.description)

    const hasAttributes = computed(() => props.info?.attributes?.length || props.info?.dimensions?.length)

    const hasVideo = computed(() => props.info?.video_review)

    const titles = computed(()=>{
        const res = [];
        if(hasDescription.value)res.push('Описание');
        if(hasAttributes.value)res.push('Характеристики');
        if(hasVideo.value)res.push('Видеообзор');
        return res;
    })
</script>

<style lang="scss" scoped>
    :deep(.tabs){
        .tabs-control{
            margin-left: auto;
            margin-right: auto;
        }

        .tabs-title{
            margin: 0 auto;
        }

        .tabs-content{
            --mt: 2.4rem;
        }
    }

    @include mob-display;

    .pp-info{
        &__mob{
            @include flex-col;
            gap: .8rem;

            :deep(.data-table){
                padding: 0;
                width: 100%;
            }

            :deep(.collapsable){
                position: relative;

                .collapsable__control{
                    position: absolute;
                    top: var(--padding);
                    right: var(--padding);
                }
            }
        }

        &__description{
            max-width: 80rem;
            margin: 0 auto;

            &>*:not(:last-child){
                margin-bottom: 1.6rem;
            }
        }

        @include mobile{
            margin-top: calc(-0.5 * var(--content-pad));
        }
    }

</style>