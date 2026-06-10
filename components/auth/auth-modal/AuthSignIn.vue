<template>
    <div class="auth-sign-in">
        <p class="modal__title">Войти в аккаунт</p>
        <p class="modal__subtitle">
            Войдите в аккаунт чтобы продолжить покупки.<br/>
            Нет учетной записи? <a class="text-link-basic text-link-basic--rev" @click="emit('call', 'signup')">Зарегистрироваться</a>
        </p>
        <form class="auth-modal__form auth-sign-in__form">
            <TextInput
                :ref="e => inpRefs.push(e)"
                v-model="data.email"
                icon-size="20"
                placeholder="E-mail"
                :error="!!useUser().err"
                @keydown.enter="inpRefs[1].focus()"
                @focus="useUser().err = ''"
            />
            <TextInput
                :ref="e => inpRefs.push(e)"
                v-model="data.password"
                icon-size="20"
                type="password"
                placeholder="Пароль"
                :error="!!useUser().err"
                @keydown.enter="confirm"
                @focus="useUser().err = ''"
            />            
            <Err :err="useUser().err"/>
        </form>
        <Button 
            class="modal__fin-button"
            :loading="useUser().loading"
            @click="confirm"
        >
            Войти
        </Button>
        <a 
            class="modal__suggest text-link-basic text-link-basic--rev"
            @click="emit('call', 'recovery', 0)"
        >
            Забыли пароль?
        </a>
    </div>
</template>

<script setup>
    const props = defineProps({
        data: Object
    })

    const emit = defineEmits(['success', 'call']);

    const inpRefs = ref([]);

    const confirm = async ()=>{
        const res = await useUser().signIn({
            email: props.data.email,
            password: props.data.password
        });

        if(res)
            emit('success');
    }
</script>

<style lang="scss" scoped>
    .button{
        width: 100%;
    }
</style>