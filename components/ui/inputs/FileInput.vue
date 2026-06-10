<template>
    <div 
        class="file-input"
    >
        <div
            class="file-input-area"
            :class="{'file-input-area--dragover': dragover}"
            @dragover="dragover = true"
            @dragleave="dragover = false"
            @drop="dragover = false"
        >
            <IconUploadCloud2Line />
            <div class="file-input-area__texts">
                <p class="file-input-area__title">Выберите файл или перетащите его сюда.</p>
                <p class="file-input-area__sizes">Форматы JPEG, PNG, PDF до 50 МБ.</p>
            </div>
            <input
                ref="inputRef"
                type="file"
                multiple
                @change="changeHandler"
            >
            <Button 
                type="transparent-light"
                @click="inputRef.click()"
            >
                Открыть файл
            </Button>
        </div>

        <div
            v-for="(i,k) in model"
            class="file-input-file"
        >
            <Icon :icon="fileIcon(i)" />
            <div class="file-input-file__content">
                <div class="file-input-file__title">
                    <p>{{ i.name.split('.')[0] }}</p>
                    <p>.{{ i.name.split('.').pop() }}</p>
                </div>
                <p class="file-input-file__size">
                    {{ humanFileSize(i.size) }}
                </p>
            </div>
            <IconDeleteBin5Line 
                size="16"
                class="file-input-file__delete"
                @click="model.splice(k,1)"
            /> 
        </div>
    </div>
</template>

<script setup>
    import { 
        IconUploadCloud2Line,
        IconFileFormatDoc, 
        IconFileFormatJpg, 
        IconFileFormatPdf, 
        IconFileFormatPng, 
        IconFileFormatWord, 
        IconFile, 
    } from '#components';

    const model = defineModel(); // Array

    const changeHandler = (e)=>{
        [...e.target.files].forEach(f => model.value.push(f));
        e.target.value = [];
    }

    const inputRef = ref(null);

    const dragover = ref(false);

    const fileIcon = (file)=>{
        switch (file.name.split('.').pop()){
            case 'jpg':
            case 'jpeg':
                return IconFileFormatJpg;
            case 'png':
                return IconFileFormatPng;
            case 'pdf':
                return IconFileFormatPdf;
            case 'doc':
                return IconFileFormatDoc;
            case 'docx':
                return IconFileFormatWord;
            default:
                return IconFile;
        }
    }
    
</script>

<style lang="scss" scoped>
    .file-input{
        @include flex-col;
        gap: 1rem;
    }

    .file-input-area{
        @include flex-col;
        align-items: center;
        gap: 2rem;
        text-align: center;
        padding: 3.2rem 1.2rem;
        overflow: hidden;
        
        border-radius: 1.2rem;
        cursor: pointer;
        position: relative;
        transition: .3s;
        background: rgba($color: #fff, $alpha: 0.002);

        background-image: url("data:image/svg+xml,%3csvg width='100%25' height='100%25' xmlns='http://www.w3.org/2000/svg'%3e%3crect width='100%25' height='100%25' fill='none' rx='12' ry='12' stroke='%2315151724' stroke-width='1' stroke-dasharray='5%2c5' stroke-dashoffset='0' stroke-linecap='square'/%3e%3c/svg%3e");

        input{
            cursor: pointer;
            position: absolute;
            opacity: 0;
            @include directions(-100%, 0, 0, 0)
        }

        @include hover{
            &:hover{  
                background-color: var(--c-surface-neutral-low);
            }
        }

        &--dragover{
            background-color: var(--c-surface-neutral-low);
        }
    }

    .file-input-file{
        display: flex;
        gap: .8rem;
        padding: 1.6rem;
        border-radius: .6rem;
        border: .1rem solid var(--c-border-neutral-low);

        &__content{
            min-width: 0;
            @include flex-col;
            gap: .4rem;
            width: 100%;
        }

        &__title{
            @include font-p4;
            display: flex;

            p:first-child{
                @include text-overflow;
            }
        }

        &__size{
            @include font-p4;
            color: var(--c-text-secondary);
        }

        &__delete{
            cursor: pointer;
            transition: .3s;
            color: var(--c-icon-secondary);
            @include virtual-area(.8rem);
            box-sizing: content-box;

            @include hover{
                &:hover{
                    color: var(--c-surface-error-main);
                }
            }
        }
    }
</style>