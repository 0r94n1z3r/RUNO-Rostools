<template>
    <div class="auth-recover">
        <h5 class="modal__title">Создать новый пароль</h5>
        <p class="modal__subtitle">
            Пожалуйста, введите новый пароль. Он должен быть надёжным и&nbsp;содержать не&nbsp;менее 8&nbsp;символов.
        </p>
        <form class="auth-modal__form">
            <TextInput
                :ref="e => inpRefs.push(e)"
                v-model="data.password"
                icon-size="20"
                type="password"
                placeholder="Новый пароль"
                @keydown.enter="inpRefs[1].focus()"
            />
            <TextInput
                :ref="e => inpRefs.push(e)"
                v-model="data.password2"
                icon-size="20"
                type="password"
                placeholder="Новый пароль еще раз"
                @keydown.enter="confirm"
            />
            <Err :err="useUser().err" />
        </form>
        <Button
            class="modal__fin-button"
            :loading="useUser().loading"
            @click="confirm"
        >
            Подтвердить
        </Button>
    </div>
</template>

<script setup>
    const props = defineProps({
        data: Object
    })

    const emit = defineEmits(['success']);

    const inpRefs = ref([]);

    const confirm = async ()=>{
        useUser().loading = false;
        useUser().err = false;

        if(!props.data.password || !props.data.password2 || props.data.password != props.data.password2){
            err.value = 'Пароли не совпадают';
            return;
        }

        const res = await useUser().recover(
            1,
            {
                code: R().query.code,
                password: props.data.password
            }
        )

        if(res){
            emit('success');
            setTimeout(()=>useUser().recoverSuccessModal.call(), 151);
        }
    }
    
</script>

<style lang="scss" scoped>

</style>