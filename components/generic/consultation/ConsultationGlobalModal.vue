<template>
    <ConsultationModal ref="modalRef">
    
    </ConsultationModal>
</template>

<script setup>
    const modalRef = ref();
    onMounted(()=>{
        useModals().consultation = {
            call: modalRef.value?.modal?.call
        }
    })
</script>

<style lang="scss" scoped>

</style>