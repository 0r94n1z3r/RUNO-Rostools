<template>
    <div class="cart-product-button">
        <Button
            class="mob-visible"
            :icon-left="counter > 1 ? IconSubtractLine : IconDeleteBin5Line"
            type="transparent-light"
        />
        <Button
            class="desk-visible"
            :icon-left="IconSubtractLine"
            type="transparent-light"
        />
        <div class="cart-product-button__counter">
            {{ counter }}
        </div>
        <Button
            :icon-left="IconAddLine"
            type="transparent-light"
        />
    </div>
</template>

<script setup>
    import { IconAddLine, IconSubtractLine, IconDeleteBin5Line } from '#components';

    const counter = computed(()=>1);

</script>

<style lang="scss" scoped>
    .cart-product-button{
        display: flex;
        background: var(--c-surface-neutral-low);
        border-radius: .6rem;

        &__counter{
            @include flex-c;
            width: 4.8rem;
        }

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
</style>