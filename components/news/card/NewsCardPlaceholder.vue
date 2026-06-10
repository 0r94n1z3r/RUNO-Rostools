<template>
    <div class="news-card-placeholder">
        <div class="news-card-placeholder__img">
            <Placeholder 
                class="news-card-placeholder__img-holder" 
                type="block"
            />
        </div>
        <Placeholder
            style="
                --width: 20%;
                margin-bottom: 1.8rem; 
            "
        />
        <Placeholder 
            style="
                --width: 100%;
                margin-bottom: 1.8rem;
            "
        />
        <Placeholder 
            style="
                --width: 40%;
                margin-bottom: 4.8rem;
            "
        />
        <Placeholder 
            class="news-card-placeholder__price"
            style="
                --width: 100%;
                margin-bottom: 1.8rem;
            "
        />
        <Placeholder 
            class="news-card-placeholder__price"
            style="
                --width: 100%;
                margin-bottom: 1.8rem;
            "
        />
        <Placeholder 
            class="news-card-placeholder__price"
            style="
                --width: 70%;
            "
        />
    </div>
</template>

<script setup>

</script>

<style lang="scss" scoped>
    .news-card-placeholder{
        width: 100%;
        padding-bottom: .6rem;

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
            margin-bottom: 2.4rem;

            &-holder{
                position: absolute;
                top: 0;
                left: 0;
                --width: 100%;
                --height: 100%;
            }
        }
    }
</style>