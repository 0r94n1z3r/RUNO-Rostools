<template>
    <div class="subcategories-tile content-grid">
        <NuxtLink 
            v-for="(i,k) in list"
            :to="`/catalog/${i.name}`" 
            class="subcategories-tile-card card-cover-container"
            transition-block
        >
            <CardCover :src="i.images?.[0]?.url || '/no-photo.svg'" loose/>
            <p class="subcategories-tile-card__id font-c2">0{{ k+1 }}</p>
            <h2 class="subcategories-tile-card__title font-h3">{{ i.title }}</h2>
        </NuxtLink>
    </div>
</template>

<script setup>
    const props = defineProps({
        parentId: Number,
    });

    const list = computed(()=>useCategories().subCategories(props.parentId) || []);
</script>

<style lang="scss" scoped>
    .subcategories-tile{
        .subcategories-tile-card {
            @include flex-col;
            --gap: 2.4rem;
            padding-bottom: var(--gap);

            :deep(.card-cover){
                --cover-scale: .7;
                --cover-scale-hov: .65;
                --cover-scale-act: .7;
                background: var(--c-surface-neutral-secondary);
            }

            &__id{
                color: var(--c-text-secondary);
                margin-top: var(--gap);
                margin-bottom: calc(var(--gap) / 2);
            }

            @include mobile{
                --gap: .8rem;
                padding-bottom: .8rem;
                h2{
                    @include font-h2--mob;
                }
            }
        }
    }
</style>