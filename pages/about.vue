<template>
    <div class="about">
        <PageBanner 
            title="REALREZ — лидер в области инновационных решений для лазерной обработки металлов" 
            description="Компания REALREZ разрабатывает и производит передовые лазерные станки для резки, сварки и очистки металлов. Наши технологии помогают предприятиям по всему миру повышать эффективность, качество и производительность производства."
            :image="img"
        >
            <!-- notdone -->
            <!-- <AnimButton
                type="light" 
                transition-block
            >  
                Ознакомиться с каталогом
            </AnimButton> -->
        </PageBanner>

        <DashesDivider />
        <AboutHistory />

        <DashesDivider />
        <Partners />

        
        <!-- <GenericBlocks>
            <template #pre>
                <InverseWrapper class="about-innovation">
                    <HomeInnovation />
                    <DashesDivider />
                </InverseWrapper>
            </template>
        </GenericBlocks> -->
    </div>
</template>

<script setup>
    import img from '@/components/about/data/image.webp';
import HomeInnovation from '~/components/home/home-innovtion/HomeInnovation.vue';
</script>

<style lang="scss" scoped>
    .about-innovation{
        .home-innovation{
            padding-top: var(--content-pad);
            padding-bottom: 0;
        }

        .dashes-divider{
            margin-bottom: calc(-1 * var(--content-pad));
        }
    }
</style>