<template>
    <div class="range-input">
        <SliderInput 
            v-model="model" 
            :min="min" 
            :max="max" 
            @end="emit('end')"
        />
        <p class="range-input__text font-14">
            {{splitNumber(tmpValue[0] || 0)}} — {{ splitNumber(tmpValue[1] || 0)}} руб.
        </p>

        <!-- <div class="range-input__text-inputs">
            <TextInput 
                class="text-input" 
                v-model="tmpValue[0]" 
                :placeholder="`от ${min}`" 
                :label="`от ${min}`"
                @blur="blurHandler"
                @keydown.enter="(e)=>e.target.blur()"
            />
            <TextInput 
                class="text-input" 
                v-model="tmpValue[1]" 
                :placeholder="`до ${max}`" 
                :label="`до ${max}`"
                @blur="blurHandler"
                @keydown.enter="(e)=>e.target.blur()"
            />
        </div> -->
    </div>
</template>

<script setup>
    const props = defineProps({
        min: Number,
        max: Number,
    });

    const emit = defineEmits(['end']);
    
    const model = defineModel() //[Number, Number]

    const tmpValue = ref([null, null]); 

    watch(()=>[...model.value], (n)=>tmpValue.value = n, { immediate: true });

    const blurHandler = ()=>{
        model.value = tmpValue.value;
        emit('end');
    };
</script>

<style lang="scss" scoped>
    .range-input{

        &__text{
            margin-top: .8rem;
        }

        &__text-inputs{
            display: flex;
            padding-top: 1.6rem;
            gap: .8rem;
        }

        .text-input{
            height: 4.2rem;
        }
    }
</style>