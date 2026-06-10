<template>
    <BasicPage class="user">
        <div class="user__grid content-wrapper">
            <div class="user__hero">
                <Breadcrumbs :list="[{title: 'Профиль'}]" transition-block/>
                <SectionTitle transition-block>
                    <span class="title-gray">Добрый день, </span><br/>
                    {{getName()}}
                </SectionTitle>
            </div>
            <UserPageCard 
                title="Мои заявки"
                to="/orders"
            />
            <UserPageCard 
                title="Корзина"
                :num="useCart().length"
                to="/cart"
            />
            <UserPageCard 
                title="Избранное"
                :num="useFavorites().list?.length"
                to="/favorites"
            />
            <UserPageCard 
                class="user-form"
                :class="{'user-form--form': isForm}"
                title="Информация"
            >
                <template #title>
                    <Button
                        :type="isForm?'accent':'transparent-light'"
                        :icon-left="isForm?IconCheckLine:IconEditLine"
                        @click="switchForm"
                    />
                </template>
                <div class="user-form__container">
                    <div class="user-form__item" @click="focus(0)">
                        <p class="user-form__label">ФИО</p>
                        <p class="user-form__value user-form__preview">{{ useUser().info?.first_name || "-"}}</p>
                        <TextInput 
                            :ref="e => inputsRefs[0] = e"
                            v-model="useUser().info.first_name" 
                            class="user-form__input" 
                            style-type="transparent-light" 
                            :has-clear="false"
                        />
                    </div>
                    <div class="user-form__item" @click="focus(1)">
                        <p class="user-form__label">Дата рождения</p>
                        <p class="user-form__value user-form__preview">{{ useUser().info?.birthday ? dayjs(useUser().info?.birthday).format('DD.MM.YYYY') : '-'}}</p>
                        <ClientOnly v-if="useUser().info">
                            <DateInput 
                                :ref="e => inputsRefs[1] = e"
                                v-model="useUser().info.birthday"
                                class="user-form__input"
                                :text-input-props="{'style-type': 'transparent-light'}"
                            />
                        </ClientOnly>
                    </div>
                    <div class="user-form__item" @click="focus(2)">
                        <p class="user-form__label">Телефон</p>
                        <p class="user-form__value user-form__preview">{{ useUser().info?.tel || '-'}}</p>
                        <TextInput 
                            :ref="e => inputsRefs[2] = e"
                            v-model="useUser().info.tel" 
                            class="user-form__input" 
                            style-type="transparent-light" 
                            :has-clear="false"
                            :mask="GLOBAL_PhoneMask"
                        />
                    </div>
                    <div class="user-form__item" @click="focus(3)">
                        <p class="user-form__label">E-mail</p>
                        <p class="user-form__value user-form__preview">{{ useUser().info?.email || '-' }}</p>
                        <TextInput 
                            :ref="e => inputsRefs[3] = e"
                            v-model="useUser().info.email" 
                            class="user-form__input" 
                            style-type="transparent-light" 
                            :has-clear="false"
                        />
                    </div>
                    <div class="user-form__password">
                        <div class="user-form__item">
                            <p class="user-form__label">Пароль</p>
                            <p class="user-form__value">••••••••••••</p>
                        </div>
                        <Button 
                            type="transparent-light"
                            @click="passwordModalRef?.modal?.call()"
                        >
                            Сменить
                        </Button>
                    </div>
                </div>
            </UserPageCard>
            <Button
                class="user__logout"
                type="light"
                transition-block
                :icon-left="IconLogoutBoxLine"
                @click="useUser().exit()"
            >
                Выйти
            </Button>
        </div>
        <DashesDivider />
        <ChangePasswordModal 
            ref="passwordModalRef"
        />
    </BasicPage>
</template>

<script setup>
    import { IconCheckLine, IconEditLine, IconLogoutBoxLine } from '#components';

    const dayjs = useDayjs();

    definePageMeta({
        name: 'User',
        private: true,
        nav: 'User'
    })

    const passwordModalRef = ref(null);

    //form
        const isForm = ref(false);

        const switchForm = () => {
            isForm.value = !isForm.value;

            if(!isForm.value){
                confirm();
            }
        }

        const inputsRefs = ref([]);

        const focus = async (n) => {
            if(!isForm.value)switchForm();
            await sleep();
            inputsRefs.value[n].focus();
        }

    // name
        const getName = () => {
            if(!useUser().info?.first_name)return useUser().info?.email;
            const n = useUser().info.first_name.split(' ');

            if(n.length == 1) return n[0];
            return n[1]
        }

    //fin
        const loading = ref(false);
        const err = ref(null);

        const confirm = async ()=>{
            loading.value = true;
            err.value = '';

            const toSend = {
                first_name: useUser().info?.first_name,
                birthday: useUser().info?.birthday && dayjs(useUser().info?.birthday).format('YYYY-MM-DD'),
                tel: useUser().info?.tel,
                email: useUser().info?.email,
            } 

            try{
                const {error} = await useAPI(
                    '/lk/users/profile',
                    {
                        method: 'POST',
                        body: toSend
                    }
                )

                if(error.value)throw new Error(error.value.data.message);

            }catch(error){
                err.value = error;
            }finally{
                loading.value = false;
            }
        }

</script>

<style lang="scss" scoped>
    .user{
        margin-bottom: calc(-1 * var(--content-pad));

        &__hero{
            min-height: 16rem;

            .breadcrumbs{
                margin-bottom: 3.2rem;
            }
        }

        &__grid{
            display: grid;
            grid-template-columns: repeat(2, 1fr);
            gap: 2rem;
        }

        .user-form{
            grid-row: 2 / span 2;
            --h: auto;

            &__container{
                @include flex-col;
                gap: 1.2rem;
            }

            &__label{
                @include font-c3;
                color: var(--c-text-disabled);
            }

            &__value{
                @include font-p2;
                min-height: 4.4rem;
                display: flex;
                align-items: center;
            }

            &__password{
                display: flex;
                align-items: end;
                gap: .8rem;
            }

            &:not(&--form){
                .user-form__input{
                    display: none;
                }
            }

            &--form{
                .user-form__preview{
                    display: none;
                }
            }
        }


        &__logout{
            width: 100%;
            grid-column: 1 / -1;
        }

        @include mobile(1000px){
            &__grid{
                grid-template-columns: 1fr;
            }

            .user-form{
                grid-row: unset;
                &__container{
                    margin-top: 6.4rem;
                }
            }
        }

        @include mobile(){
            &__grid{
                gap: 1.2rem;
            }
        }

        

        
    }
</style>