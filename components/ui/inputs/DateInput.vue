<template>
    <div class="date-input">
        <DatePicker 
            v-model="model"
            class="date-input__picker"
            :masks="{input: 'DD.MM.YYYY'}"
            :popover="{visibility: 'focus'}"
            :update-on-input="false"
            :is-range="range"
        >
            <template #default="{ inputValue, inputEvents }">
                <div v-if="range" class="date-input__date-input">
                    <TextInput
                        ref="rangeInputRef"
                        :model-value="inputValue.start"
                        :value="inputValue.start"
                        :="textInputProps"
                        :has-clear="false"
                        v-on="inputEvents.start"
                    />
                    <p class="text--subheading">–</p>
                    <TextInput
                        :model-value="inputValue.end"
                        :value="inputValue.end"
                        :="textInputProps"
                        :has-clear="false"
                        v-on="inputEvents.end"
                    />
                </div>

                <TextInput
                    v-else
                    ref="singleInputRef"
                    :model-value="inputValue" 
                    :value="inputValue"
                    :="textInputProps"
                    :has-clear="false"
                    v-on="inputEvents"
                />
            </template>
        </DatePicker>
    </div>
</template>

<script setup>
    import { DatePicker } from 'v-calendar';
    import 'v-calendar/style.css';

    const props = defineProps({
        textInputProps: Object,
        range: Boolean,
    });

    const model = defineModel();

    const singleInputRef = ref(null);
    const rangeInputRef = ref(null);

    const focus = () => {
        if(props.range){
            rangeInputRef.value.focus();
        }else{
            singleInputRef.value.focus();
        }
    }

    defineExpose({
        focus
    })

</script>

<style lang="scss" scoped>
    .date-input{
        &__date-input{
            display: flex;
            align-items: center;
            gap: .4rem;
        }
    }

    :deep(.vc-popover-content){
        --vc-popover-content-border: var(--c-border-neutral-low);
        

        .vc-focusable{
            transition: .3s;
            transition: font-weight 0s all .3s;
            
        }

        button{
            background: transparent;
            transition: font-weight 0s all .3s;
            outline: none;
        }

        .vc-light .vc-attr, 
        .vc-light
        {
            --vc-content-color: var(--c-brand-68);
            --vc-highlight-outline-bg: var(--c-brand-68);
            --vc-highlight-outline-border: transparent;
            --vc-highlight-outline-content-color: var(--c-black);
            --vc-highlight-light-bg: var(--c-brand-40);
            --vc-highlight-light-content-color: var(--c-black);
            --vc-highlight-solid-bg: var(--c-brand-100);
            --vc-highlight-solid-content-color: var(--c-white);
            --vc-dot-bg: var(--c-brand-100);
            --vc-bar-bg: var(--c-brand-100);
            --vc-focus-ring: transparent!important;
        }
    }
</style>