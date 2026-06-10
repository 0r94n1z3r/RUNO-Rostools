<template>
    <Card 
        v-if="!useUser().info"
        class="ci-annoy"
        type="dark"
    >
        <h3>Оформляйте заказы быстрее с личным кабинетом!</h3>
        <p>Авторизуйтесь, чтобы отслеживать свои заказы, сохранять историю покупок и ускорить процесс оформления.</p>
        <div class="ci-annoy__buttons">
            <Button
                type="transparent"
                @click="useUser().callAuth('signup')"
            >
                Зарегистрироваться
            </Button>
            <Button
                type="light"
                @click="useUser().callAuth()"
            >
                Войти
            </Button>
        </div>
    </Card>
</template>

<script setup>
import Button from '~/components/ui/Button.vue';


</script>

<style lang="scss" scoped>
    .ci-annoy{
        h3{
            margin-bottom: 1.2rem;

            @include mobile{
                @include font-h2--mob;
            }
        }

        p{
            margin-bottom: 2.3rem;
        }

        &__buttons{
            @include flex-col;
            gap: .8rem;
        }

        .button{
            width: 100%;
        }
    }
</style>