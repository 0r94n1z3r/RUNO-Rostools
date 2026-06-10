<template>
    <Modal ref="modalRef" unique-class="pp-hero-3d">
        <model-viewer
            :src="normalizeAssetSrc(info.model)"
            alt="3D model"
            camera-controls
            shadow-intensity="1"
            shadow-softness="0.3"
            auto-rotate
            environment-image="/3d/l2.webp"
        >
        </model-viewer>
    </Modal>
</template>

<script setup>
    onMounted(async () => {
        try {
            await import('@google/model-viewer');
        } catch (e) {
            console.warn('[PPHero3D] model-viewer failed to load', e);
        }
    });

    const props = defineProps({
        info: Object
    });

    //call
        const modalRef = ref();

        defineExpose({
            modal: modalRef
        });
</script>

<style lang="scss">
    .pp-hero-3d{
        .modal{
            padding: 0;
            width: 100vw;
            height: calc(var(--100vh) - var(--pad-o) * 2)
        }

        model-viewer{
            width: 100%;
            height: 100%;
        }
    }
</style>