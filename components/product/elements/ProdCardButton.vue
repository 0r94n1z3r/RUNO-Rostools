<template>
    <div 
        class="prod-card-button"
        :class="{'prod-card-button--shift': number}"
    >
        <Button
            type="accent"
            :icon-left="IconShoppingCart2Line"
            :="$attrs"
            @click="add"
        >
            В корзину
        </Button>
        <div class="prod-card-button__button-wr">
            <div
                v-if="hasCounter"
                class="prod-card-button__button"
            >
                <Button
                    :icon-left="IconSubtractLine"
                    type="transparent-light"
                    @click="subtract"
                />
                <input
                    v-model="number"
                    class="prod-card-button__counter"
                    type="number"
                    inputmode="numeric"
                    @change="changeNumber"
                />
                <Button
                    :icon-left="IconAddLine"
                    type="transparent-light"
                    @click="add"
                />
            </div>
            <Button
                v-else
                class="prod-card-button__remove-button"
                :icon-left="IconDeleteBin5Line"
                type="light"
                @click="remove"
            />
            <Button
                v-if="toCart"
                :icon-left="IconShoppingCart2Line"
                :type="iconButtonType"
                to="/cart"
            />
        </div>
    </div>
</template>

<script setup>
    import { IconShoppingCart2Line, IconSubtractLine, IconAddLine, IconDeleteBin5Line } from '#components';

    const props = defineProps({
        info: Object,
        iconButtonType: {
            type: String,
            default: 'accent'
        },
        toCart: {
            type: Boolean,
            default: true
        },
        hasCounter: {
            type: Boolean,
            default: true
        }
    });

    const emit = defineEmits(['changeAmount']);

    const number = computed(()=>Number((props.info?.count ?? useCart().product(props.info?.id)?.count) || 0));
    
    const add = ()=>{
        // const max = props.info?.quantities?.reduce((acc, e) => acc+Number(e.quantity || 0), 0);
        let newNumber = number.value + 1; 

        // if(newNumber > max){
        //     newNumber = max;
        //     useAlert().push(`Максимальное количество товара: ${max}`);
        // }
        
        emit('changeAmount', newNumber);
        useCart().changeAmount(props.info, newNumber);
    }

    const subtract = ()=>{
        emit('changeAmount', number.value-1);
        useCart().changeAmount(props.info, number.value-1);
    }

    const changeNumber = (e)=>{
        const n = Math.abs(Math.floor(e.target.value));
        emit('changeAmount', n);
        useCart().changeAmount(props.info, n);
    }

    const remove = ()=>{
        emit('changeAmount', 0);
        useCart().changeAmount(props.info, 0);
    }
</script>

<style lang="scss" scoped>
    .prod-card-button{
        position: relative;
        overflow: hidden;
        border-radius: .6rem;

        &>.button{
            width: 100%;
        }

        &__button-wr{
            display: flex;
            width: 100%;
            position: absolute;
            top: 0;
            bottom: 0;
            margin: auto 0;
            left: calc(100% + .8rem);
            gap: .8rem;
        }

        &__button{
            display: flex;
            align-items: center;
            width: 100%;
            background: var(--c-surface-neutral-low);
            border-radius: .6rem;

            .button{
                --background: transparent;
                --brd: transparent;
                --brd-hov: transparent;
            }  

            @include mob-display; 

            @include mobile{
                &__counter{
                    width: 3.2rem;
                    @include font-p4;
                }

                .button{
                    --mh: 3.2rem;
                    --icon-size: 1.2rem;
                }
            }
        }

        &__remove-button{
            width: auto !important;
            flex-grow: 1;
        }

        &__counter{
            @include flex-c;
            width: 100%;
            text-align: center
        }

        &>*{
            @include transition-bounce;
        }

        &--shift{
            &>*{
                transform: translateX(calc(-100% - .8rem));
            }
        }
    }
</style>