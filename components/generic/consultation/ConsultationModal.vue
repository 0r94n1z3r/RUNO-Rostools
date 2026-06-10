<template>
    <Modal ref="modalRef" unique-class="consultation-modal">
        <p class="consultation-modal__title">{{ title }}</p>
        <slot />
        <ConsultationForm
            :="formAttrs"
            type="light"
            autoplay="immediate"
            :native-sent="false"
        />
    </Modal>
</template>

<script setup>
    const props = defineProps({
        title: {
            type: String,
            default: 'Заказать консультацию'
        },
        formAttrs: Object
    });

//call
    const modalRef = ref();
    defineExpose({
        modal: modalRef
    })
</script>

<style lang="scss">
    .consultation-modal{
        &__title{
            margin-bottom: 2.4rem;
            text-align: center;
            @include font-h2;
        }
    }
</style>