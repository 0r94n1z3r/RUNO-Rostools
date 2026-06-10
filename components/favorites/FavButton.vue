<template>
    <Button
        :="$attrs"
        class="fav-button"
        :class="{'fav-button--active': useFavorites().isFav(info?.id)}"
        :icon-left="IconHeartLine"
        :icon-right="IconHeartFill"
        type="light"
        @click.prevent.stop="clickHandler"
    />
</template>

<script setup>
    import { IconHeartLine, IconHeartFill } from '#components';

    const props = defineProps({
        info: Object
    });

    const clickHandler = () => {
        if(!useUser().info?.id){
            useUser().callAuth();
            return;
        }
        useFavorites().switchFav(props.info?.id);
    }
</script>

<style lang="scss">
    .fav-button{
        position: relative;

        .button__icon{
            transition: .3s;
            
            &--right{
                position: absolute;
            }
        }

        &.fav-button--active{
            --color: var(--c-icon-accent);

            .button__icon--left{
                opacity: 0;
            }
        }

        &:not(.fav-button--active){
            .button__icon--right{
                opacity: 0;
            }
        }
    }
</style>