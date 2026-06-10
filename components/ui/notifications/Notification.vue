<template>
    <div
        class="notification"
    >
        <div 
            class="notification__gap"
            :style="{height: `${h}rem`}"
        ></div>
        <div 
            ref="cardRef" 
            class="notification__card"
            :class="[`notification__card--${state}`]"
        >
            <Card type="white" class="notification__container">
                <div class="notification__title">
                    <Card class="notification__icon-wr" type="white">
                        <Icon 
                            v-if="info.icon" 
                            :icon="info.icon"
                            :style="{color: info.iconColor}"
                        />
                    </Card>
                    <p>{{info.title}}</p>
                </div>
                <p v-if="info.text || true" class="notification__text">
                    {{info.text}}
                </p>
            </Card>
        </div>
    </div>
</template>

<script setup>
    const props = defineProps({
        info: Object
    });

    const h = ref(0);
    const state = ref('idle');

    const cardRef = ref();

    onMounted(async () => {
        h.value = pxToRem(cardRef.value.offsetHeight + 10);
        await sleep();
        state.value = 'active';
        setTimeout(async ()=>{
            state.value = 'leaving';
            h.value = 0;
            await sleep(600);
            useNotifications().remove(props.info.id);
        }, 2000)
    })
</script>

<style lang="scss" scoped>
    .notification{
        position: relative;

        &__gap{
            @include transition-bounce;
        }

        &__card{
            position: absolute;
            top: 0;
            left: 0;
            transform: translateX(-50%);
            @include shadow;
            transition: .3s;

            &:not(&--active){
                opacity: 0;
            }
        }

        &__container{
            max-width: calc(100vw - var(--pad) * 2);
            width: max-content;
            --padding: .8rem;
        }

        &__title{
            display: flex;
            gap: .8rem;

            p{
                min-height: 4.8rem;
                @include flex-c;
                @include font-h4;
            }
        }

        &__icon-wr{
            padding: 0;
            --radius: .4rem;
            width: 4.8rem;
            height: 4.8rem;
            @include flex-c;
            flex-shrink: 0;
        }

        &__text{
            padding-top: .4rem;
            color: var(--c-text-secondary);
        }
    }
</style>