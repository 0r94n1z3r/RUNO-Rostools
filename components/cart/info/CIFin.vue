<template>
    <div class="ci-fin">
        <Button :loading="loading" @click="confirm">
            Оформить заявку
        </Button>
        <p class="ci-fin__disclaimer" transition-block>
            Нажимая на кнопку, вы соглашаетесь 
            <span nobr>
                с
                <NuxtLink 
                    class="text-link-basic text-link-basic--rev" 
                    to="/politika-obrabotki-personalnyh-dannyh" 
                    target="_blank" 
                >
                    политикой обработки персональных данных
                </NuxtLink>
            </span>
        </p>
        <Err :="{err}"/>
    </div>
</template>

<script setup>
    const props = defineProps({
        data: Object,
        attachments: Array
    });

    const loading = ref();
    const err = ref();

    const confirm = async () => {
        err.value = '';
        loading.value = true;

        if(!props.data.first_name){
            err.value = "Заполните ФИО";
        }

        if(!props.data.tel && !err.value){
            err.value = "Заполните телефон";
        }

        if(!props.data.email && !err.value){
            err.value = "Заполните email";
        }

        if(err.value){
            loading.value = false;
            return;
        }

        try {
            const formData = new FormData();

            Object.entries(props.data).forEach(([key, value]) =>{
                formData.append(key, value)
            })

            useCart().list.forEach((e, i) => {
                formData.append(`products[${i}][product_id]`, e.id)
                formData.append(`products[${i}][count]`, e.count)
            })

            props.attachments.forEach(e => {
                formData.append('attachments[]', e)
            })

            const fetched = await useAPI(
                    useUser()?.info?
                    `/lk/orders/from_products`:
                    `/lk/order_without_account`,
                {
                    method: 'POST',
                    body: formData,
                    cache: 'no-cache'
                },
            );

            if(fetched.error.value){
                throw new Error(fetched.error.value?.data?.error || fetched.error.value?.data?.message);
            }

            await sleep();
        
            if(useUser()?.info){
                navigateTo("/orders");
                if(props.data.email == useUser()?.info?.email)updateUser();
            }else{
                navigateTo(`/order/${fetched.data.value.code}`);
            }

            useCart().clean();

            
        } catch (error) {
            err.value = error?.message
            console.log(err);
        } finally {
            loading.value = false;
        }
    }

    const updateUser = ()=>{
        useAPI(
            '/lk/users/profile',
            {
                method: 'POST',
                body: {
                    tel: props.data.tel,
                    first_name: props.data.first_name
                }
            }
        )

        useUser().info.tel = props.data.tel
        useUser().info.first_name = props.data.first_name
    }
</script>

<style lang="scss" scoped>
    .ci-fin{
        @include flex-col;
        gap: .8rem;

        .button{
            width: 100%;
        }

        &__disclaimer{
            @include font-p4;
        }
    }
</style>