<template>
    <div class="prod-card-placeholder">
        <div class="prod-card-placeholder__img">
            <Placeholder 
                class="prod-card-placeholder__img-holder" 
                type="block"
            />
        </div>
        <Placeholder 
            class="prod-card-placeholder__title"
        />
        <Placeholder 
            class="prod-card-placeholder__price"
        />
    </div>
</template>

<script setup>

</script>

<style lang="scss" scoped>
    .prod-card-placeholder{
        width: 100%;
        padding-bottom: 6rem;

        &:nth-child(3n + 1){
            :deep(.placeholder){
                animation-delay: .3s;
            }
        }
        &:nth-child(3n + 2){
            :deep(.placeholder){
                animation-delay: .6s;
            }
        }

        &__img{
            width: 100%;
            padding-top: 100%;
            position: relative;
            margin-bottom: 2.8rem;

            &-holder{
                position: absolute;
                top: 0;
                left: 0;
                --width: 100%;
                --height: 100%;
            }
        }

        &__title{
            margin-bottom: 1.6rem;
            --width: 70%;
        }

        &__price{
            --width: 30%;
        }
    }
</style>