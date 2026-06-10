<template>
    <P5 :sketch="fullSketch" />
</template>

<script setup>
    const props = defineProps({
        sketch: Function
    })

    let p5Instance = null;

    onUnmounted(()=>{
        p5Instance?.remove?.()
    })

    const fullSketch = computed(()=>{
        return (p5)=>{
            p5Instance = p5;
            props.sketch(p5);
        }
    })
</script>

<style lang="scss" scoped>

</style>