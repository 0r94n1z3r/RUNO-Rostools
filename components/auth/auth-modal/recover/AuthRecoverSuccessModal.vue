<template>
    <Modal :ref="r => useUser().recoverSuccessModal = r" unique-class="auth-recover-success-modal">
        <ModalIcon :icon="IconShieldCheckFill"/>
        <h2 class="modal__title">Пароль изменен!</h2>
        <p class="modal__subtitle">Теперь вы можете авторизовываться используя новый пароль</p>
        <Button class="modal__fin-button"  @click="useUser().recoverSuccessModal.close()">Отлично!</Button>
    </Modal>
</template>

<script setup>
    import { IconShieldCheckFill } from '#components';
    const emit  = defineEmits(['success']);
</script>

<style lang="scss">
    .auth-recover-success-modal{
        .modal{
            --w: 68.6rem;

            &__title{
                margin-bottom: 1.6rem;
                text-align: center;
                @include font-h2;
            }

            &__subtitle{
                margin: 0 auto 3.2rem;
                color: var(--c-text-secondary);
                text-align: center;
                @include font-p2;
                max-width: 37.4rem;
            }

            &__fin-button{
                width: 100%;
            }
        }
    }
</style>