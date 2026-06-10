<template>
    <Card class="ci-form">
        <p class="ci-form__title">Контактные данные</p>
        <form>
            <TextInput v-model="data.first_name" placeholder="ФИО*" style-type="transparent-light"/>
            <TextInput v-model="data.tel" placeholder="Номер телефона*" style-type="transparent-light" :mask="GLOBAL_PhoneMask"/>
            <TextInput v-model="data.email" placeholder="Почта*" style-type="transparent-light"/>
            <TextareaInput v-model="data.comment" placeholder="Сообщение" style-type="transparent-light"/>
            <FileInput v-model="attachments"/>
        </form>
    </Card>
</template>

<script setup>
    const data = defineModel('data', {});
    const attachments = defineModel('attachments', []);
</script>

<style lang="scss" scoped>
    .ci-form{
        .ci-form__title{
            margin-bottom: 2rem;
            font-weight: 500;
        }

        form{
            @include flex-col;
            gap: 1rem;

            .textarea-input{
                --mh: 12rem;
            }
        }
    }
</style>