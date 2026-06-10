<template>
    <a 
        :href="to" 
        @click.prevent="clickHandler"
    >
        <slot/>
    </a>
</template>

<script setup>
    const props = defineProps({
        to: [String, Object]
    })


    const clickHandler = ()=>{
        if(R().resolve(R().getHistory().back)?.path == R().resolve(props.to)?.path){
            R().back();
        }else{
            R().push(props.to);
        }
    }
</script>

<style lang="scss" scoped>

</style>