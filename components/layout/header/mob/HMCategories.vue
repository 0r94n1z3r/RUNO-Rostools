<template>
    <div class="hm-categories">
        <HeaderMobBlock
            :list="list"
            @clicked="clickHandler"
        />
    </div>
</template>

<script setup>
    import { IconArrowLeftLine } from '#components';

    const categoryID = defineModel();

    const emit = defineEmits(['back']);

    const list = computed(
        () => [
            {title: 'Назад', icon: IconArrowLeftLine},
            ...useCategories().subCategories(categoryID.value)
        ]
    );

    const clickHandler = (cat) => {
        if(cat.title == 'Назад'){
            emit('back');
            return;
        }
        navigateTo(`/catalog/${cat.name}`);
        // if(!cat.has_children){
        // }else{
        //     categoryID.value = cat.id;
        //     switchLayer(2);
        // }
    }

</script>

<style lang="scss" scoped>
    :deep(.header-mob-block-list-option__icon){
        display: none;
    }

    :deep(.header-mob-block-list-option__title){
        .icon{
            color: inherit;
        }
    }
</style>