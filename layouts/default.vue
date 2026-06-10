<template>
    <div class="page">
        <LoadingBlinder />
        
        <SEOHead />
        <DashesOverlay />
        
        <Header />

        <div class="page__content">
            <slot class="" />
        </div>

        <Footer />

        <!-- global modals -->
            <AuthModal/>
            <RegistrationSuccessModal/>
            <AuthRecoverSuccessModal/>
            <ConsultationGlobalModal/>

        <!-- <CookiesAnnoy/> -->

        <ProdTransition />
        <PageTransition />

        <Notifications />

    </div>
</template>

<script setup>
    import { engine } from 'animejs'

//stores
    Init();

//anime
    engine.precision = 1;
    engine.fps = 60;

</script>

<style lang="scss" scoped>
    .page{
        &__content{
            min-height: var(--100vh);
        }
    }
</style>