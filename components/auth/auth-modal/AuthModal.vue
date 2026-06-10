<template>
    <Modal :ref="r => useUser().authModal = r" unique-class="auth-modal" @close="closeHandler" @call="callHandler">
        <component 
            :is="component"
            :="{data}" 
            @success="successHandler"
            @call="callHandler"
        />
    </Modal>
</template>

<script setup>
    import { 
        AuthSignIn, 
        AuthSignUp,
        AuthRecover0,
        AuthRecover1,
        AuthRecoverFin,
        AuthRecoverFail,
    } from "#components";

//component
    const component = ref(AuthSignIn);

//data
    const data = ref({
        email: '',
        password: '',
        password2: '',
        code: '',
        rules: false,
        spam: true
    })

    const closeHandler = ()=>{
        setTimeout(()=>{
            useUser().err = '';
            component.value = AuthSignIn;
        }, 151)
    }

    const successHandler = ()=>{
        data.value.email = '';
        data.value.password = '';
        data.value.password2 = '';
        data.value.name = '';
        data.value.code = '';
        data.value.rules = false;
        data.value.spam = true;
        useUser().authModal.close();
    }

//recovery
    const recovery = (id)=>{
        useUser().err = '';
        const arr = [AuthRecover0, AuthRecover1, AuthRecoverFin, AuthRecoverFail]
        component.value = arr[id];
    }

    onMounted(()=>{
        if(R().query.code){
            useUser().authModal.call();
            recovery(2);
        }
    })

//callHandler
    const callHandler = (type, id)=>{
        useUser().err = '';
        switch(type){
            case 'signup':
                component.value = AuthSignUp;
                break;
            case 'recovery':
                recovery(id);
                break;
            default:
                component.value = AuthSignIn;
        }
    }


</script>

<style lang="scss">
    .auth-modal{
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
            }

            &__fin-button{
                width: 100%;
                margin-top: 2rem;
            }

            &__suggest{
                margin-top: 1rem;
                display: block;
            }
        }

        &__form{
            @include flex-col;
            gap: 1rem;

            .text-input{
                &__input{
                    @include padding-y(1.1rem);
                }
            }
        } 

        &__btns{
            margin-top: 2.4rem;
            @include flex-col;
            gap: 2.4rem;

            .button{
                width: 100%;
            }
        }

        &__hr{
            width: 100%;
            position: relative;
            height: 1.8rem;

            &::before,
            &::after{
                @include pseudo-absolute;
                @include all-directions(0);
                margin: auto;
            }

            
            &::before{
                width: 100%;
                height: 1px;
                background: var(--black-10);
            }

            &::after{
                content: 'или';
                color: var(--black-40);
                background: var(--white);
                width: max-content;
                height: max-content;
                padding: 0 .8rem;
            }
        }
    }
</style>