<template>
    <div class="auth-sign-up">
        <p class="modal__title">Регистрация</p>
        <p class="modal__subtitle">
            Войдите в аккаунт чтобы продолжить покупки.<br/>
            Уже есть аккаунт? <a class="text-link-basic text-link-basic--rev" @click="emit('call', 'signin')">Войти</a>
        </p>
        <form class="auth-modal__form auth-sign-up__form">
            <TextInput
                :ref="e => inpRefs.push(e)"
                v-model="data.email"
                tooltip="E-mail в формате: name@instance.ru"
                icon-size="20"
                placeholder="E-mail"
                @keydown.enter="inpRefs[1].focus()"
            />
            <TextInput
                :ref="e => inpRefs.push(e)"
                v-model="data.password"
                icon-size="20"
                type="password"
                placeholder="Пароль"
                @keydown.enter="inpRefs[2].focus()"
            />
            <TextInput
                :ref="e => inpRefs.push(e)"
                v-model="data.password2"
                icon-size="20"
                type="password"
                placeholder="Пароль еще раз"
                @keydown.enter="confirm"
            />
            <Err :err="useUser().err"/>
            <div class="auth-sign-up__checkbox">
                <Checkbox v-model="data.rules"/>
                <p>
                    Соглашаюсь с 
                    <NuxtLink 
                        class="text-link-basic text-link-basic--rev" 
                        to="/pages/politika-obrabotki-personalnyh-dannyh" 
                        target="_blank" 
                    >
                        политикой обработки персональных данных
                    </NuxtLink>
                </p>
            </div>
        </form>
        <Button 
            :loading="useUser().loading"
            @click="confirm"
        >
            Зарегистрироваться
        </Button>
    </div>
</template>

<script setup>

    const props = defineProps({
        data: Object
    })

    const inpRefs = ref([]);

    const emit = defineEmits(['success', 'call']);

    const confirm = async ()=>{
        
        //errors handler
            useUser().err = null;

            if(!props.data.rules)useUser().err = "Пожалуйста, согласитесь с политикой обработки персональных данных, чтобы продолжить"
            
            if(props.data.password != props.data.password2)useUser().err = "Пароли не совпадают"
            
            if(!props.data.password)useUser().err = "Введите пароль"

            if(useUser().err)return;

        const email = (props.data.email || '').trim();
        const at = email.indexOf('@');
        const first_name = (at > 0 ? email.slice(0, at) : email) || '-';

        const res = await useUser().signUp({
            email,
            password: props.data.password,
            first_name,
        });

        if(res){
            emit('success');
            setTimeout(()=>useUser().registrationSuccessModal.call(), 151);
        }
    }

</script>

<style lang="scss" scoped>
    .auth-sign-up{
        &__form{
            
            margin-bottom: 2.4rem;
        }

        &__checkbox{
            display: flex;
            @include font-p4;

            p{
                margin-top: .4rem;
            }
        }

        .button{
            width: 100%;
        }
    }
</style>