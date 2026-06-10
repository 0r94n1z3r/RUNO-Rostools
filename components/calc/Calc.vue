<template>
    <div id="calculator" class="calc content-wrapper">
        <Card class="calc__card">
            <div class="calc__content">
                <SectionTitle
                    class="calc__title"
                    bullit="Калькулятор"
                >
                    Калькулятор стоимости ленточной пилы
                </SectionTitle>
                <!-- <AnimText class="calc__subtitle">
                    Для расчёта необходимо указать данные
                </AnimText> -->
                <div v-if="property" class="calc__inputs">
                    <div class="calc-input">
                        <p class="calc-input__title">Ширина пилы, мм</p>
                        <Dropdown
                            v-slot:="{close}"
                            class="calc-input__input" 
                            :title="property?.name"
                            style-type="transparent-light"
                            flaps="tight"
                        >
                            <DropdownItem 
                                v-for="item in data?.properties"
                                @click="property = item"
                                @close="close"
                            >
                                {{ item?.name }}
                            </DropdownItem>
                        </Dropdown>
                    </div>
                    <div class="calc-input">
                        <p class="calc-input__title">Шаг зубьев</p>
                        <Dropdown
                            v-slot:="{close}"
                            class="calc-input__input" 
                            :title="val?.value"
                            style-type="transparent-light"
                            flaps="tight"
                        >
                            <DropdownItem 
                                v-for="item in property?.values"
                                @click="val = item"
                                @close="close"
                            >
                                {{ item.value }}
                            </DropdownItem>
                        </Dropdown>
                    </div>
                    <div class="calc-input">
                        <p class="calc-input__title">Длина пилы, мм</p>
                        <TextInput
                            v-model="len"
                            :step="10"
                            min="730"
                            max="10800"
                            type="number"
                            style-type="transparent-light"
                        />
                    </div>
                    <div class="calc-input">
                        <p class="calc-input__title">Шов</p>
                        <div class="calc-input__text">
                            <p>
                                +120₽
                            </p>
                        </div>
                    </div>
                </div>
            </div>
            <Card
                type="white"
                class="calc-display calc__content"
            >
                <p class="calc-display__title">Стоимость пилы</p>
                <p class="calc-display__price">{{ pricify(totalPrice) }} ₽</p>
                <AnimButton type="accent" class="calc-display__button" @click="calcModal.modal.call()">Оформить заявку</AnimButton>
            </Card>
        </Card>
        <CalcModal 
            ref="calcModal"
            :="{
                category,
                property,
                val,
                total: totalPrice,
                len
            }"
        />
    </div>
</template>

<script setup>
    import { temp } from './media/calc/temp';

    const props = defineProps({
        category: Object
    });

    const calcModal = ref();

    // nodtone [API]
    const data = ref(temp(props.category?.id));
    console.log(data);

    const property = ref(data.value?.properties?.[0]);
    const val = ref(property.value?.values?.[0]);
    const len = ref(1000);

    watch(property, (n, o)=>{
        if(n != o)val.value = n.values[0];
    })

    const totalPrice = computed(()=>{
        return Math.ceil(val.value?.price * (len.value / 1000) + 120);
    })


</script>

<style lang="scss" scoped>
    .calc{
        &__card{
            @include grid(repeat(2, 1fr), 0);
        }

        &__content{
            padding: 2.4rem;
        }

        &__title{
            margin-bottom: 4.8rem;

            :deep(h2){
                @include font-h2;
            }
        }

        &__subtitle{
            @include font-p2;
            color: var(--c-text-secondary);
            margin-bottom: 4rem;
        }

        &__inputs{
            @include grid(repeat(2, 1fr), 2.4rem);
        }
    }

    .calc-input{
        &__title{
            font-weight: 500;
            margin-bottom: .8rem;
        }

        &__text{
            // @include font-p4;
            // color: var(--c-text-secondary);
            display: flex;
            align-items: center;
            min-height: 4.4rem;
        }

        .dropdown{
            width: 100%;
        }

        .text-input{
            @include font-p3;
        }
    }

    .calc-display{
        @include flex-col;
        justify-content: space-between;
        align-items: center;
        gap: 2rem;

        &__title{
            @include font-c2;
            color: var(--c-text-secondary);
        }

        &__price{
            @include font-h1;
            white-space: nowrap;
        }

        &__button{
            width: 100%;
        }
    }

    @include mobile(1000px){
        .calc{
            &__card{
                @include grid(repeat(1, 1fr), 0);
            }
        }
    }

    @include mobile{
        .calc{
            &__title{
                :deep(h2){
                    @include font-h1--mob;
                }
            }

            &__subtitle{
                @include font-p3;
            }

            &__card{
                --padding: var(--pad-i);
            }

            &__inputs{
                @include grid(repeat(1, 1fr), 2.4rem);
            }

            &__content{
                padding: 0;
            }
        }

        .calc-display{
            margin-top: var(--pad-i);
            padding: 2.4rem;
        }
    }



</style>