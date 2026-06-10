<template>
    <div class="auth-recover">
        <p class="modal__title">Восстановление пароля</p>

        <p class="modal__subtitle">
            Введите ваш&nbsp;почтовый адрес, мы&nbsp;вышлем вам&nbsp;ссылку для&nbsp;восстановления пароля.
            <a class="text-link-basic text-link-basic--rev" @click="emit('call', 'signin')">Вспомнили пароль?</a>
        </p>

        <form class="auth-recover__form">
            <TextInput
                v-model="data.email"
                tooltip="E-mail в формате: name@instance.ru"
                icon-size="20"
                placeholder="E-mail"
                no-label
                @keydown.enter="confirm"
            />
        </form>
        <Err :err="useUser().err"/>
        <Button 
            class="modal__fin-button"
            :loading="useUser().loading"
            :disabled="!data.email"
            @click="confirm"
        >
            Получить ссылку
        </Button>
    </div>
</template>

<script setup>
    const props = defineProps({
        data: Object
    })

    const emit = defineEmits(['call']);

    const confirm = async ()=>{
        const res = await useUser().recover(
            0,
            {
                email: props.data.email,
            }
        );

        if(res)
            emit('call','recovery', 1);
    }
</script>

<style lang="scss" scoped>

</style>