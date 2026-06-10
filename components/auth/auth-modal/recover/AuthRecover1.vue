<template>
    <div class="auth-recover">
        <p class="modal__title">Восстановление пароля</p>
        <p class="modal__subtitle">
            Проверьте вашу почту и перейдите по ссылке,<br> 
            которую мы отправили на <span class="text-link-basic text-link-basic--rev">{{data.email}}</span>, <br>
            для сброса и восстановления пароля. 
        </p>
        <p class="auth-recover__subtext">
            Не получили e-mail? <br>
            <a 
                class="auth-recover__countdown-wr text-link-basic text-link-basic--rev" 
                :disabled="countdown || null"
                @click="again"
            >
                Отправить еще раз
                <Countdown
                    v-if="countdown"
                    v-slot="{ minutes, seconds }"
                    class="auth-recover__countdown"
                    :time="30 * 1000"
                    :transform="transformSlotProps"
                    @end="countdown = false"
                >
                    через {{minutes}}:{{ seconds }}
                </Countdown>
            </a>
        </p>
        <div class="auth-modal__btns">
            <Button @click="useUser().authModal.close()">Хорошо</Button>
        </div>
    </div>
</template>

<script setup>
    const props = defineProps({
        data: Object
    })

    const transformSlotProps = (props) => {
        const formattedProps = {};

        Object.entries(props).forEach(([key, value]) => {
            formattedProps[key] = (parseInt(value)) < 10 ? `0${value}` : String(value);
        });

        return formattedProps;
    }

//countdown
    const countdown = ref(true);

    const loading = ref(false);

    const again = async ()=>{
        countdown.value = true;
        loading.value = true;

        const res = await useUser().recover(
            0,
            {
                email: props.data.email,
            }
        );

        loading.value = true;
    }

</script>

<style lang="scss" scoped>
    .auth-recover{
        &__subtext{
            text-align: center;
            margin-bottom: 2.4rem;
        }

        &__countdown-wr{
            &[disabled]{
                pointer-events: none;
                opacity: .6;
            }
        }

        &__countdown{
            display: inline;
        }
    }
</style>