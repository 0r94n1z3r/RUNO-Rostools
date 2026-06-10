<template>
    <div class="gif">
        <img
            class="gif__display"
            :src="srcDisplay" 
            alt=""
            ref="imageRef"
            width="0"
            height="0"
        >
        <img :src="src" class="gif__fake"/>
    </div>
</template>

<script setup>
    const props = defineProps({
        src: String,
        srcStart: String,
        srcEnd: String,
        duration: Number 
    })

    const imageRef = ref();
    const isVisible = useElementVisibility(imageRef);

    const state = ref(0);
    const play = ()=>{
        state.value = 1;
        setTimeout(()=>state.value = 2, props.duration);
    }

    watch(
        isVisible, 
        (n)=>{
            if(n){
                play();
            }
        },
        {
            once: true
        }
    );

    

    const srcDisplay = computed(()=>
        state.value == 0?
            props.srcStart:
        state.value == 1?
            props.src:
            props.srcEnd
    )

</script>

<style lang="scss" scoped>
    .gif{
        flex-shrink: 0;

        &__display{
            width: 100%;
            height: 100%;
        }

        &__fake{
            width: 0;
            height: 0;
        }
    }
</style>