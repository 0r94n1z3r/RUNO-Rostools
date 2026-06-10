<template>
    <div class="home">
        <Hero />
        <HomeStats />
        
        <DashesDivider/>
        <MaxOptimization />

        <DashesDivider />
        <InverseWrapper>
            <HomeMaterialsSlider />
        </InverseWrapper>

        <DashesDivider />
        <HomeSolutions />

        <DashesDivider />
        <HomeProductsPreview />
        
        <DashesDivider />
        <GenericInfo style="margin-bottom: 10rem;"/>
        
        <!-- <DashesDivider /> -->

        <InverseWrapper>
            <!-- <GenericReviews /> -->
            <DashesDivider />
            <HomeInnovation />
        </InverseWrapper>

        
        <DashesDivider />
        <Consultation />

        <!-- <DashesDivider />
        <NewsPreview /> -->

        <DashesDivider />
        <FAQ />
    </div>
</template>

<script setup>

</script>

<style lang="scss" scoped>
    .generic-reviews{
        margin-bottom: calc(-1 * var(--content-pad));
    }
</style>