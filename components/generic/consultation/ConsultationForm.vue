<template>
    <div 
        class="consultation-form"
        :class="[
            sent && 'consultation-form--sent',
            `consultation-form--${type}`
        ]"
    >
        <form class="consultation-form__form">
            <TextInput 
                v-model="data.person"
                class="consultation-form__input" 
                placeholder="Ваше имя" 
                :style-type="styles.input"
                transition-block
            />
            <TextInput 
                v-model="data.email" 
                class="consultation-form__input" 
                placeholder="Email" 
                :style-type="styles.input"
                transition-block
            />
            <TextInput 
                v-model="data.tel" 
                class="consultation-form__input" 
                placeholder="Номер телефона" 
                :style-type="styles.input"
                transition-block
                :mask="GLOBAL_PhoneMask"
            />
            <DropdownInput 
                v-if="hasRegion"
            
                v-model="region"
                v-model:text="regionText"

                class="consultation-form__input"
                
                placeholder="Регион"
                title-key="region"
                :list="regions"
            />
            <TextareaInput 
                v-model="data.client_text" 
                class="consultation-form__input" 
                placeholder="Сообщение" 
                :style-type="styles.input"
                transition-block
            />

            <Err :="{err}"/>
            <AnimButton 
                class="consultation-form__button" 
                :type="styles.button" 
                :switch-state="!sent"
                :loading="loading"
                transition-block
                :autoplay="autoplay"
                @click="confirm"
            >
                Отправить
            </AnimButton>
            <AnimText class="consultation-form__disclaimer" transition-block :switch-state="!sent" :autoplay="autoplay">
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
            </AnimText>
        </form>

        <ClientOnly>
            <form class="consultation-form__fin">
                <AnimText key="con-form-1" component="h2" :switch-state="sent" debug>Спасибо за обращение!</AnimText>
                <AnimText key="con-form-2" :switch-state="sent" delay="300">Мы свяжемся с вами в ближайшее время</AnimText>
                <AnimButton 
                    class="consultation-form__button" 
                    :type="styles.button" 
                    transition-block
                    :switch-state="sent"
                    @click="sent = false"
                >
                    Отправить еще раз
                </AnimButton>
            </form>
        </ClientOnly>
    </div>
</template>

<script setup>
    import { Mask } from "maska"
    import regions from "@/components/education/data/regions.json"

    const props = defineProps({
        type: { // light / dark
            type: String,
            default: "dark",
        },
        extra: String,
        nativeSent: {
            type: Boolean,
            default: true
        },
        autoplay: [Object, String],
        hasRegion: Boolean
    });

    const emit = defineEmits(['sent']);

    const data = ref({
        person: useUser().info?.first_name || "",
        tel: useUser().info?.tel || "",
        email: useUser().info?.email || "",
        client_text: '',
        type_id: 1,
    });

    const styles = computed(() => ({
        'light': {
            input: 'transparent-light',
            button: 'dark'
        },
        'dark': {
            input: 'transparent-dark',
            button: 'accent'
        }
    }[props.type]));

    //regions 
        const region = ref(null);
        const regionText = ref();

//send
    const sent = ref(false);

    const err = ref('');
    const loading = ref();

    const confirm = async ()=>{
        err.value = '';
        loading.value = true;

        if(
            !(GLOBAL_PhoneMask.mask.some(m =>
                new Mask({mask: m}).completed(data.value.tel)
            ))
        )err.value = "Заполните телефон";

        if(!data.value.person)err.value = "Заполните Имя";

        if(!validateEmail(data.value.email))err.value = "Неправильный email";
        
        if(err.value){
            loading.value = false;
            return;
        }

        const toSend = unlink(data.value);

        toSend.client_text = (props.extra?props.extra+`\n\n`:'') + toSend.client_text 

        if(region.value?.region || regionText.value) toSend.client_text += `\n\nРегион: ${region.value?.region || regionText.value}` 

        const formData = new FormData();


        Object.entries(toSend).forEach(([key, value]) =>{
            formData.append(key, value)
        })

        try{
            const fetched = await useAPI(
                "/feedbacks/feedback", 
                {
                    method: "POST",
                    body: formData
                }
            )

            if(fetched.error.value){
                throw new Error(fetched.error?.value?.data?.message);
            }

            if(props.nativeSent){
                sent.value = true;
            }

            emit('sent');

        }catch(error) {
            err.value = error.message;
        }finally{
            loading.value = false;
        }
    }
</script>

<style lang="scss" scoped>
    .consultation-form{
        position: relative;

        &__form{
            @include grid(1fr 1fr, 1rem);
            padding-top: calc(var(--header-height) + var(--pad-o));
            margin-top: calc(-1 * (var(--header-height) + var(--pad-o)));
            scroll-margin-left: 0; 
            
            &>*{
                @include transition-bounce;
            }
        }

        &__fin{
            position: absolute;
            @include flex-col;
            @include flex-c;
            gap: .8rem;
            @include all-directions(0);

            .consultation-form__button{
                margin-top: 2rem;
                width: fit-content;
            }
        }

        &--sent{
            .consultation-form{
                &__input{
                    &:nth-child(2n){
                        @include hidden-hor(5rem);
                    }
                    &:nth-child(2n+1){
                        @include hidden-hor(-5rem);
                    }
                }
            }
        }

        &:not(&--sent){
            .consultation-form__fin{
                pointer-events: none;
                // &>*{
                //     @include hidden(-1rem);
                // }
            }

            .consultation-form{
                &__input{
                    transition-delay: 1s;
                }
            }
        }

        &__disclaimer{
            @include font-p4;
            max-width: 35rem;
        }

        &--light{
            .consultation-form__disclaimer{
                color: var(--c-text-secondary);
            }
        }

        &--dark{
            .consultation-form__disclaimer{
                color: var(--c-text-inverse-secondary);
            
                .text-link-basic{
                    --color: var(--c-text-inverse);
                    --color-hov: var(--c-surface-accent-main);
                }
            }
        }

        :not(:nth-child(-n + 2)){
            grid-column: 1/-1;
        }

        .textarea-input{
            --mh: 17rem;
        }

        &__button{
            width: 100%;
        }

        :deep(h2){
            @include font-h2;
        }

        @include mobile(1000px){
            .textarea-input{
                --mh: 32rem;
            }
        }

        @include mobile{
            grid-template-columns: 1fr;
        }
    }
</style>