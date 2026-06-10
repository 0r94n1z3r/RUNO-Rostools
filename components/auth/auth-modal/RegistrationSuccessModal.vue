<template>
    <Modal :ref="r => useUser().registrationSuccessModal = r" unique-class="registration-success-modal">
        <ModalIcon :icon="IconCheckboxCircleFill"/>
        <h2 class="modal__title">Спасибо!</h2>
        <p class="modal__subtitle">Регистрация завершена</p>
        <Button class="modal__fin-button" @click="useUser().registrationSuccessModal.close()">Отлично!</Button>
    </Modal>
</template>

<script setup>
    import { IconCheckboxCircleFill } from '#components';
</script>

<style lang="scss">
    .registration-success-modal{
        .modal{
            --w: 68.6rem;

            &__title{
                margin-bottom: 1.6rem;
                text-align: center;
                @include font-h2;
            }

            &__subtitle{
                margin-bottom: 3.2rem;
                color: var(--c-text-secondary);
                text-align: center;
                @include font-p2;
            }

            &__fin-button{
                width: 100%;
            }
        }
    }
</style>