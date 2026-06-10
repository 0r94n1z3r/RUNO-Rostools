<template>
    <div class="header-buttons">
        <ContactsButton
            :type="state == 'transparent'?'transparent':'transparent-light'"
            mode="hover"
        />
        <div 
            class="header-buttons__btn-container"
            :class="{'header-buttons__btn-container--open': useUser().info}"
            :style="{width: loginButtons.sizes[0]?.value + 'px'}"
        >
            <Button 
                :ref="(e) => {loginButtons.refs.value[0] = e;}"
                :icon-left="IconUserLine"
                :type="state == 'transparent'?'light':'dark'"
                to="/user"
            />
        </div>
        <Button 
            :icon-left="IconShoppingCart2Line"
            :type="state == 'transparent'?'transparent':'transparent-light'"
            to="/cart"
            :status="useCart().length"
        />
        <Button 
            :icon-left="IconHeartLine"
            :type="state == 'transparent'?'transparent':'transparent-light'"
            to="/favorites"
            :status="useFavorites().list?.length"
        />
        <div 
            class="header-buttons__btn-container"
            :class="{'header-buttons__btn-container--open': !useUser().info}"
            :style="{width: loginButtons.sizes[1]?.value + 'px'}"
        >
            <Button 
                :ref="(e) => loginButtons.refs.value[1] = e"
                class="login-button"
                :type="state == 'transparent'?'light':'dark'"
                @click="useUser().callAuth()"
            >
                Войти
            </Button>
        </div>
    </div>
</template>

<script setup>
    import { IconHeartLine, IconShoppingCart2Line, IconUserLine } from '#components';

    const props = defineProps({
        state: String,
    });

    const loginButtons = (() => {
        const refs = ref([]);

        const sizes = []

        onMounted(()=>{
            sizes[0] = useElementBounding(refs.value[0]).width;
            sizes[1] = useElementBounding(refs.value[1]).width;
        })

        return {
            refs,
            sizes
        }
    })()

</script>

<style lang="scss" scoped>
    .header-buttons{
        display: flex;
        gap: .8rem;

        :deep(.login-button){
            --pad-x: 2.4rem;
        }

        &__btn-container{
            overflow: hidden;
            @include transition-bounce;
            will-change: width, margin-left, opacity;
            
            &:not(&--open){
                width: 0!important;
                margin-left: -.8rem;
                opacity: 0;
            }
        }
    }
</style>