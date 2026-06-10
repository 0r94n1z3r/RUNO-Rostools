<template>
    <ClientOnly>
        <div 
            v-show="!pagStop || loading"
            class="pag-loader"   
        >
            <div 
                ref="triggerRef"
                class="pag-loader__trigger"
                :class="{'pag-loader__trigger--reverse': !isPositive}"
                :style="{
                    height: `${bump}px`,
                }"
            />
            <Loading/>
        </div>
    </ClientOnly>
</template>

<script setup>
    const props = defineProps({
        totalPages: Number,
        loading: Boolean,

        vector: {
            type: Number,
            default: 1
        },

        scrollObject: Object,
        bump: {
            type: [String, Number],
            default: 550
        }
    });

    const model = defineModel(); // Всегда массив: [1] если одна страница [1,2,3 ...] если была прожата кнопка "показать еще" 
    const pagPause = defineModel("pagPause");


////////////////////////////////////////////////////////////////
    const isPositive = computed(()=>props.vector > 0);

    const pagStop = computed(()=>
        model.value[model.value.length - 1] == props.totalPages
    );

    const checkPag = ()=>{
        if(
            !pagPause.value && 
            !pagStop.value
        ){
            pause();
            const method = isPositive.value?"push":"unshift";
            const nextPage = isPositive.value?
                (model.value[model.value.length - 1] || 0) + 1:
                (model.value[0] || 2) - 1;

            model.value[method](nextPage);
        }
    }

    //trigger
        const triggerRef = ref();
        const isTriggered = useElementVisibility(triggerRef);

        watch(isTriggered, (n)=>{
            if(n)checkPag();
        })

    const pause = ()=>{pagPause.value = true};
    watch(pagPause, async (n)=>{
        await new Promise((r) => setTimeout(r,100));
        if(!n && isTriggered.value)checkPag();
    })

</script>

<style lang="scss" scoped>
    .pag-loader{
        @include padding-y(2rem);
        position: relative;

        &__trigger{
            position: absolute;
            
            &--reverse{
                top: 0;
            }

            &:not(&--reverse){
                bottom: 0;
            }
        }
    }
</style>