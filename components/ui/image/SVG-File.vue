<template>
    <div v-if="src.endsWith('.svg')" v-html="svg"></div>
    <Image 
        v-else
        :="{...props, ...$attrs}" 
    />
</template>

<script setup>
    const props = defineProps({
        src: String
    })

    const svg = ref();

    const srcDisplay = computed(()=>{
        if(!import.meta.dev)return props.src;
        return props.src?.replace('/api', useRuntimeConfig().public.baseURL) || '';
    })

    watch(
        ()=>props.src,
        async ()=>{
            const response = await fetch(srcDisplay.value);
            if (!response.ok) {
                svg.value = null;
                return;
            }

            let svgContent = await response.text();

            svgContent = svgContent.replace(/fill=".*?"/g, 'fill="currentColor"');

            svg.value = svgContent;
        },
        {immediate: true}
    )
</script>

<style lang="scss" scoped>
    
</style>