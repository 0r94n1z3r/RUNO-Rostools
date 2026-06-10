<template>
    <div class="dropdown-input">
        <Dropdown
            v-model:called="called"
            mode="custom"
        >
            <template #caller>
                <TextInput 
                    ref="inputRef"
                    v-model="text"
                    :={placeholder}
                    @blur="handleBlur"
                    @keydown.enter="handleEnter"
                />
            </template>
            <template #default="{close}">
                <DropdownItem 
                    v-for="i in displayList"
                    :key="i"
                    @click="model = i"
                    @close="close"
                >
                    {{ i[titleKey] }}
                </DropdownItem>
            </template>
        </Dropdown>
    </div>
</template>

<script setup>
    const props = defineProps({
        list: Array,
        placeholder: String,
        titleKey: {
            type: String,
            default: 'title'
        },
    });

    const model = defineModel();
    const text = defineModel('text', '');

    watch(model, (val)=>{
        if(!val)return;
        text.value = val[props.titleKey];
    })

    const inputRef = ref(null);

    const handleBlur = ()=>{
        if(!props.list.some(e => e[props.titleKey]?.toLowerCase() == text.value?.toLowerCase()))model.value = null;
    }

    const handleEnter = (e)=>{
        if(displayList.value.length)model.value = displayList.value[0];
    }

    const displayList = computed(()=>props.list.filter((item)=>
        item[props.titleKey]?.toLowerCase().includes((text.value ?? '')?.toLowerCase())
    ))

// drop
    const called = ref(false);
    watch(()=>(inputRef.value?.isFocused && displayList.value.length), async (n)=>{
        if(!n)await sleep(100);
        called.value = n
    });

</script>

<style lang="scss" scoped>
    .dropdown-input{
        :deep(){
            .dropdown{
                --w: 100%;
                --mx-h: calc(40 * var(--vh));

                &__slot-caller{
                    width: 100%;
                }

                &__container{
                    background: var(--c-surface-neutral-secondary);
                    border-radius: .4rem;
                    border: none;
                }
            }

            .text-input{
                width: 100%;
            }
        }
    }
</style>