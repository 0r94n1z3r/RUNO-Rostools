<template>
    <form class="search-global">
        <Search 
            ref="searchRef"
            v-model="useSearch().searchText"
            :="{styleType, placeholder}"
            @focus="focusHandler"
            @keydown.enter="blurHandler"
        />
        <SearchDrop
            :={called}
            @clicked="hideDrop"
        />
    </form>
</template>

<script setup>
    const props = defineProps({
        styleType: String,
        placeholder: {
            type: String,
            default: 'Поиск'
        },
    });

     const searchRef = ref();

    
//call
    const called = ref(false);
    
    onClickOutside(
        searchRef, 
        () => called.value = false, 
    )

    const focusHandler = ()=>{
        called.value = true;
        useCategories().called = false;
    }
    
    const blurHandler = ()=>{
        hideDrop();
        R().push(`/search?q=${useSearch().searchText}`);
    }

    const hideDrop = ()=>{
        called.value = false;
        useCategories().called = false;
    }

    watch(()=>R().fullPath, ()=>{
        hideDrop();
        useSearch().searchText = '';
    });
    
//expose
    const focus = ()=>{
        searchRef.value?.input?.focus();
    }

    defineExpose({
        input: {focus},
        called
    })
</script>

<style lang="scss" scoped>
    .search-global{
        position: relative;
    }
</style>