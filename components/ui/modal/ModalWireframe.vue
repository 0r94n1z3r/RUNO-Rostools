<template>
    <TeleportWrapper :="{teleport}">
        <div 
            :class="[
                'modal-wireframe',
                called && 'modal-wireframe--called' || '',
                uniqueClass
            ]"
        >
            <div class="modal-wireframe__blackout" @mousedown.self="close"/>
            <div class="modal-wireframe__wrapper">
                <div v-if="displayed" class="modal-wireframe__container" @mousedown.self="close">
                    <slot/>
                </div>
            </div>
            <Button 
                v-if="closeNative && closeOutside" 
                :icon-left="IconCloseLine" 
                class="modal-wireframe__close-outside" 
                type="light" 
                @click="close"
            />
        </div>
    </TeleportWrapper>
</template>

<script setup>
    import { IconCloseLine } from '#components';

    const props = defineProps({
        closeNative: {
            type: Boolean,
            default: true
        },
        callType: { // vertical / horizontal
            type: String,
            default: "vertical"
        },
        closeOutside: Boolean,
        uniqueClass: String,
        teleport: {
            type: Boolean,
            default: true
        }
    })

    const emit = defineEmits(['close', 'call']);
 
//call
    const called = ref(false)

    const call = (...options)=>{
        called.value = true;
        emit('call', ...options);
    }

    const close = (...options)=>{
        emit('close', ...options);
        if(props.closeNative)called.value = false;
    }

    const forceClose = (...options) => {
        emit('close', ...options);
        called.value = false;
    }

//displayed
    const displayed = ref(called.value);
    watch(called, async (n)=>{
        if(!n)await new Promise((r) => setTimeout(r,301));
        displayed.value = n;
    })

//expose
    defineExpose({
        call,
        close: forceClose,
        called
    });
</script>

<style lang="scss" scoped>
    .modal-wireframe{
        z-index: 1000;
        position: fixed;
        @include all-directions(0);
        // transition: .3s;
        padding-right: calc(100% - var(--content-width));
        width: 100vw;
        height: calc(100 * var(--vh));
        overflow-y: auto;

        &__blackout{
            background: var(--c-black-68);
            position: fixed;
            @include all-directions(0);
            transition: .3s;
            height: 110vh;
            backdrop-filter: blur(.5rem);
        }

        &__wrapper{
            min-height: calc(100 * var(--vh));
            pointer-events: none;
            @include flex-c;
            padding: var(--pad-o);
            position: relative;
            z-index: 1;
        }

        &__container{
            pointer-events: all;
        }

        &__close-outside{
            position: fixed;
            --close-shift: 4rem;
            right: var(--close-shift);
            right: calc(var(--close-shift) + 100% - var(--content-width));
            top: var(--close-shift);
            z-index: 1;
        }

        &:not(&--called){
            pointer-events: none;
            :deep(*){
                pointer-events: none !important;
            }

            opacity: 0;
            transition: 0s;
            transition-delay: .3s;

            .modal-wireframe{
                &__blackout,
                &__close-outside{
                    @include hidden(0);
                }
            }
        }
    }
</style>