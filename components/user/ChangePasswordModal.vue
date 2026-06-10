<template>
    <Modal ref="modalRef" unique-class="change-password-modal">
        <form class="change-password-modal__content">
            <p class="change-password-modal__title">Изменение пароля</p>
            <TextInput 
                v-model="password[0]"
                type="password"
                placeholder="Новый пароль*"
                no-label
            />
            <TextInput 
                v-model="password[1]"
                type="password"
                placeholder="Новый пароль еще раз*"
                no-label
            />
            <Err :="{err}"/>
            <Button 
                class="change-password-modal__button" 
                :="{loading}"
                @click="confirm"
            >
                Подтвердить
            </Button>
        </form>
    </Modal>
</template>

<script setup>
    const loading = ref();
    const err = ref();

    const password = ref(['','']);

    const confirm = async ()=>{
        loading.value = true;
        err.value = '';

        if(password.value[0] != password.value[1])err.value = 'Пароли не совпадают';
        if(!password.value[0] || !password.value[1])err.value = 'Введите пароль';

        if(err.value)return loading.value = false;

        try{
            const {error} = await useAPI(
                '/lk/users/profile',
                {
                    method: 'POST',
                    body: {
                        password: password.value[0] // nodone 
                    }
                }
            )

            if(error.value)throw new Error(error.value.data.message);

            modalRef.value.close();
            password.value = ['',''];
        }catch(error){
            err.value = error;
        }finally{
            loading.value = false;
        }

    }


//call
    const modalRef = ref();
    defineExpose({
        modal: modalRef
    })
</script>

<style lang="scss">
    .change-password-modal{
        .modal{
            width: 100%;
            --w: 48.2rem;
        }

        &__content{
            @include flex-col;
            gap: 2rem;
        }

        &__title{
            margin-bottom: 1.6rem;
            text-align: center;
            @include font-h2;
        }

        &__button{
            margin-top: .8rem;
            width: 100%!important;
        }

    }
</style>