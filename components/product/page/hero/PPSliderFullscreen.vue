<template>
    <ModalWireframe
        ref="wireframeRef"
        unique-class="slider-fullscreen"
        :teleport="false"
        close-outside
        @close="()=>R_called = false"
    >
        <div 
            class="slider-wr content-wrapper"
            :class="{'slider-wr--called': R_called}"
            @click.self="close"
        >
            <PPSlider 
                v-model="slide" 
                :="{images}" 
                fullscreen
                @click-outside="close"
            />
        </div>
    </ModalWireframe>
</template>

<script setup>
    const props = defineProps({
        images: Array
    });

    const slide = ref(0);

    //call
        const wireframeRef = ref();

        const R_called = ref(wireframeRef.value?.called);

        const call = async (id)=>{
            wireframeRef.value?.call();
            slide.value = 0;
            await sleep();
            slide.value = id;
            await sleep(100);
            R_called.value = true;
    };
        const close = async ()=>{
            R_called.value = false;
            wireframeRef.value?.close()
        };

        defineExpose({
            call,
            close
        })
</script>

<style lang="scss">
    .slider-fullscreen{
        .modal-wireframe__wrapper{
            height: 100%;
        }

        .modal-wireframe__container{
            width: 100%;
            height: 100%;
            @include flex-c;
        }

        .modal-wireframe__close-outside{
            --close-shift: var(--pad-o);
        }

        .slider-wr{
            position: relative;
            @include transition-bounce();
            &:not(&--called){
                @include hidden(-5rem);
            }
        }

    }
</style>