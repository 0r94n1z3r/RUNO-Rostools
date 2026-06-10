<template>
    <div class="generic-blocks">
        <!-- <DashesDivider v-if="list.includes('reviews')"/> -->

        <slot name="pre"/>

        <!-- <GenericReviews v-if="list.includes('reviews')"/> -->

        <DashesDivider v-if="list.includes('consultation')" />
        <Consultation v-if="list.includes('consultation')" />

        <!-- <DashesDivider v-if="list.includes('news')"/>
        <NewsPreview v-if="list.includes('news')"/> -->
    </div>
</template>

<script setup>
    const props = defineProps({
        list: {
            type: Array,
            default: () => ['reviews', 'consultation', 'news']
        }
    });
</script>

<style lang="scss" scoped>

</style>