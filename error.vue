<template>
    <NuxtLayout name="default" :="{mounted}">
        <InverseWrapper :key="'error'+mounted" class="error-page">
            <DashesDivider />

            <div class="error-page__wrapper content-wrapper">
                <DevOnly>
                    <div class="dev-only">
                        <h4>{{ error?.message}}</h4>
                        <br>
                        <pre v-html="error.stack"></pre>
                        <br>
                        {{ error }}
                    </div>
                </DevOnly> 

                <div class="error-page__content">
                    <SectionTitle
                        class="error-page__title" 
                        :bullit="`ошибка ${status}`"
                        inverse
                        title-component="h1"
                    >
                        <span v-html="text.title"></span>
                    </SectionTitle>

                    <div class="error-page__button-wr">
                        <AnimText>
                            <span v-html="text.text"></span>
                        </AnimText>
                        <AnimButton 
                            type="light"
                            :icon-left="IconArrowLeftLine"
                            @click="handleError"
                        >
                            На главную
                        </AnimButton>
                    </div>
                </div>
            </div>
        </InverseWrapper>
    </NuxtLayout>
</template>

<script setup>
    import { IconArrowLeftLine } from '#components';

    const props = defineProps({
        error: Object
    })

    const mounted = ref(false);
    onMounted(()=>{
        mounted.value = true;
    })

    const handleError = () => clearError({ redirect: '/' })

    const status = computed(()=>props.error.statusCode || 404);

    const text = computed(()=>(
        {
            404: {
                title: `<span nobr>К сожалению,</span> страница, которую <span nobr>вы ищете,</span> <span class="title-gray"><span nobr>не существует.</span></span>`,
                text: 'Проверьте правильность введённого адреса <span nobr>или воспользуйтесь</span> меню <span nobr>для навигации.</span>'
            },
            500: {
                title: `<span nobr>На сервере</span> что-то сломалось.`,
                text: 'Мы уже знаем <span nobr>о проблеме</span>, <span nobr>и активно</span> чиним. Пожалуйста, возвращайтесь <span nobr>к нам</span> попозже.'
            },
        }[status.value]
    ))

    onMounted(()=>{
        window?.scrollTo(0, 0);
        useProdTransition().state = 'idle';
        console.log('errorPage');
    })
</script>

<style lang="scss" scoped>
    .error-page{
        padding-top: 4rem;
        padding-bottom: var(--content-pad);
        min-height: var(--100vh);
        margin-bottom: calc(-1 * var(--content-pad));
        @include flex-col;

        &__wrapper{
            @include flex-col;
            gap: var(--content-pad);
            justify-content: end;
            height: 100%;
            flex-grow: 1;
        }

        &__content{
            @include flex-jtf;
            align-items: end;
            gap: 2.4rem;
        }

        &__title{
            max-width: 58.8rem;
            
            :deep(h1){
                @include font-h2;
            }
        }

        &__button-wr{
            max-width: 29rem;
            @include flex-col;
            gap: 2.4rem;

            .anim-button{
                width: 100%;
            }
        }

        @include mobile(840px){
            &__title{
                max-width: 100%;
            }

            &__content{
                @include flex-col;
                align-items: unset;
            }
        }
    }

    :deep(.stack){
        white-space: pre-wrap;
        display: block;
    }
</style>