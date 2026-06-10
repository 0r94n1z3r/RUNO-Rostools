<template>
    <ModalWireframe
        ref="wireframeRef"
        :="{...$attrs, ...props}"
        @call="(...args) => emit('call', ...args)"
        @close="(...args) => emit('close', ...args)"
    >
        <div
            :class="[
                'modal',
                called && 'modal--called' || '',
                `modal-call--${callType}`,
            ]"
        >
            <div v-if="closeNative && !closeOutside" class="modal__close-container">
                <Button :icon-left="IconCloseLine" type="light" @click="wireframeRef.close()"/>
            </div>
            <slot/>
        </div>
    </ModalWireframe>
</template>

<script setup>
    import { IconCloseLine } from '#components';

    const props = defineProps({
        callType: { // vertical / horizontal
            type: String,
            default: "vertical"
        },
        closeOutside: Boolean,
        closeNative: {
            type: Boolean,
            default: true
        }
    })

    const emit = defineEmits(['close', 'call'])

    const wireframeRef = ref();

    const call = (...options)=>{wireframeRef.value?.call(...options)};
    const close = (...options)=>{wireframeRef.value?.close(...options)};

    const called = ref(wireframeRef.value?.called);
    watch(()=>wireframeRef.value?.called, async (n)=>{
        await new Promise((r) => setTimeout(r));
        called.value = n;
    })

    defineExpose({
        call,
        close
    })
</script>

<style lang="scss" scoped>
    .modal{
        // --w
        // --mx-w

        --close-shift: 3.2rem;
        --padding: 9.6rem;

        background: var(--c-surface-neutral-main-inverse);
        padding: var(--padding);
        border-radius: 1.2rem;
        z-index: 1;
        transition: .3s;
        pointer-events: all;

        width: var(--w, auto);
        max-width: var(--mx-w, calc(100vw - var(--pad-o) * 2));
        position: relative;

        &__close-container{
            position: absolute;
            top: var(--close-shift);
            right: var(--close-shift);
            z-index: 2;
        }

        &:not(&--called){
            pointer-events: none;
            :deep(*){
                pointer-events: none !important;
            }
        }

        &.modal-call--horizontal:not(.modal--called){
            @include hidden-hor(-1rem);
        }

        &.modal-call--vertical:not(.modal--called){
            @include hidden(1rem);
        }

        @include mobile{
            --close-shift: 1.2rem;
            --padding: 6.4rem 1.2rem 3.2rem;
        }
    }
</style>