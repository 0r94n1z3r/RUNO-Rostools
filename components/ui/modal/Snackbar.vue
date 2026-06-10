<template>
    <TeleportWrapper :="{teleport}">
        <div 
            :class="[
                'snackbar',
                `${called && 'snackbar--called' || ''}`,
                uniqueClass,
                'shadow-gray--medium',
            ]"
            ref="snackbarRef"
        >
            <div class="snackbar__content">
                <div class="snackbar__content-wrapper">
                    <slot/>
                </div>
            </div>
            <Close class="snackbar__close-outside" @click="closeHandler"/>
        </div>
    </TeleportWrapper>
</template>

<script setup>
    const props = defineProps({
        uniqueClass: String,
        teleport: {
            type: Boolean,
            default: true
        }
    })

    const snackbarRef = ref();

    const emit = defineEmits(['close', 'call']);
 
//call
    const called = ref(false)

    let callDebounce = null;

    const call = (...options)=>{
        called.value = true;
        emit('call', ...options);

        if(callDebounce)clearTimeout(callDebounce);
        callDebounce = setTimeout(close, 2000);
    }

    const closeHandler = ()=>{
        emit('close');
        close();
    }

    const close = ()=>{
        called.value = false;
    }

//expose
    defineExpose({
        call,
        close,
        closeHandler,
        called
    });
</script>

<style lang="scss" scoped>
    .snackbar{
        z-index: 1000;
        position: fixed;
        @include directions(unset, 2rem, 2rem, 2rem);
        margin: 0 auto;
        width: max-content;
        max-width: calc(100% - 4rem);
        background: var(--white);
        border-radius: 1.6rem;
        display: flex;
        padding: .8rem 1.6rem;
        transition: .3s;
        gap: .8rem;
        align-items: flex-start;

        &:not(&--called){
            @include hidden(1rem);
        }

        &__content{
            min-height: 2.4rem;
            display: flex;
            align-items: center;
        }
    }
</style>