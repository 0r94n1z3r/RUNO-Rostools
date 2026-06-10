<template>
    <div class="auth-recover">
        <ModalIcon 
            :icon="IconCloseLine"
            type="error"
        />
        <h5 class="modal__title">Восстановление пароля</h5>
        <p class="modal__subtitle">Код восстановления устарел</p>
        <Button
            class="modal__fin-button"
            @click="emit('call', 'recovery', 0)"
        >
            Попробовать заново
        </Button>
    </div>
</template>

<script setup>
    import { IconCloseLine } from '#components';

    const emit = defineEmits(['call']);
    
</script>

<style lang="scss" scoped>
    .auth-recover{
        text-align: center;
        @include flex-col;
        align-items: center;
    }

    .modal__fin-button{
        margin-top: 0;
    }
</style>