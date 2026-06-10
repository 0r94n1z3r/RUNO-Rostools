<template>
    <div class="education">
        <PageBanner 
            bullit="услуги по обучению"
            title="Обучение и поддержка от REALREZ" 
            description="Пройдите обучение на наших аппаратах лазерной сварки и получите полное руководство по их эффективному использованию. Обучение включает как теоретическую, так и практическую части, обеспечивая уверенную работу с оборудованием."
            :image="img"
        >
            <AnimButton
                type="light"
                transition-block
                @click="scrollToQuery('#edu-form')"
            >  
                Записаться на обучение
            </AnimButton>
        </PageBanner>

        <DashesDivider />
        <EduAbout />

        <DashesDivider />
        <EduAdvantages />

        <DashesDivider /> 
        <EduForm />

        <GenericBlocks />
    </div>
</template>

<script setup>
    
    import img from '@/components/education/data/image.webp';

</script>

<style lang="scss" scoped>

</style>