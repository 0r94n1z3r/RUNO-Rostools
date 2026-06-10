<template>
    <ConsultationModal
        ref="modalRef"
        title="Оформление заявки на ленточную пилу"
        :form-attrs="{
            extra: [`[ЗАПРОС ЛЕНТОЧНУЮ ПИЛУ]`, ...orderString].join('\n'),
            onSent: handleSent
        }"
    >
        <Card class="calc-modal__info">
            <div class="calc-modal__category">
                <Image 
                    :src="category.images?.[0].url"
                />
                <p>{{ category.title }}</p>
            </div>
            <div class="calc-modal__params">
                <div class="calc-modal-param">
                    <p class="calc-modal-param__title">Ширина пилы</p>
                    <p class="calc-modal-param__value">{{ props.property.name }} мм</p>
                </div>
                <div class="calc-modal-param">
                    <p class="calc-modal-param__title">Шаг зубьев</p>
                    <p class="calc-modal-param__value">{{ props.val.value }}</p>
                </div>
                <div class="calc-modal-param">
                    <p class="calc-modal-param__title">Длина пилы</p>
                    <p class="calc-modal-param__value">{{ props.len }} мм</p>
                </div>
            </div>
            <div class="calc-modal__hr"></div>
            <div class="calc-modal-param">
                <p class="calc-modal-param__title">Стоимость</p>
                <p class="calc-modal-param__value calc-modal-param__value--price">{{ pricify(total) }} ₽</p>
            </div>
        </Card>
    </ConsultationModal>
</template>

<script setup>
    const props = defineProps({
        property: null,
        val: null,
        len: Number,
        total: Number,
        category: Object,
    });

    const orderString = computed(()=>{
        const list = [];
        list.push(`Категория: ${props.category.title}`)
        list.push(`Ширина пилы: ${props.property.name} мм`);
        list.push(`Шаг зубьев: ${props.val.value}`);
        list.push(`Длина пилы: ${props.len} мм`);
        list.push(`Стоимость: ${pricify(props.total)} ₽`);
        return list
    })

    const handleSent = () => {
        modalRef.value.close();
        useNotifications().push({
            title: 'Спасибо за заявку!',
            text: 'Мы скоро свяжемся с вами'
        })
    }

//call
    const modalRef = ref();
    const call = ()=>{modalRef.value?.modal?.call()}
    defineExpose({
        modal: {call}
    })
</script>

<style lang="scss">
    .calc-modal{
        .modal{
            --w: 48.2rem;
        }

        &__info{
            margin-bottom: .8rem;
            &.card{
                --radius: .6rem;
            }
        }

        &__category{
            display: flex;
            align-items: center;
            margin-bottom: 1.6rem;
            gap: 1.6rem;

            .image{
                width: 6.4rem;
                background: var(--c-surface-neutral-main-inverse);
                border-radius: .4rem;
            }

            p{
                @include font-h4;
            }
        }

        &__params{
            @include grid(1fr 1fr 1fr, 1.6rem);

            @include mobile{
                @include grid(1fr, 1.6rem);
            }
        }

        &__hr{
            height: 1px;
            width: 100%;
            background-color: var(--c-border-neutral-main);
            margin: 1.6rem 0;
        }

        .consultation-form .textarea-input{
            --mh: 4lh;
        }
    }

    .calc-modal-param{
        &__title{
            @include font-c2;
            color: var(--c-text-secondary);
            margin-bottom: .4rem;
        }

        &__value{
            font-weight: normal;

            &--price{
                @include font-p2;
                font-weight: 500;
            }
        }
    }
</style>