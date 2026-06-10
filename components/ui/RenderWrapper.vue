<template>
    <div 
        class="render-wrapper"
        ref="wrapperRef"
        :style="{height: rendered.height?rendered.height+'px':null}"
    >
        <KeepAlive>
            <slot :is-visible="rendered.isVisible"/>
        </KeepAlive>
    </div>
</template>

<script setup>
    const wrapperRef = ref();

    const { width, height} = useElementSize(wrapperRef);
    const isVisible = useElementVisibility(wrapperRef);

    const rendered = reactive({
        width: null,
        height: null,
        isVisible: true
    });

    watch(isVisible, (n)=>{
        if(n){
            rendered.width = null;
            rendered.height = null;
        }else{
            rendered.width = width.value;
            rendered.height = height.value;
        }

        rendered.isVisible = n; 
    })
</script>

<style lang="scss" scoped>
    .render-wrapper{
        position: relative;
    }
</style>