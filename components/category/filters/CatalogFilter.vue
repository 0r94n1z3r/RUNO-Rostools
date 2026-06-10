<template>
    <div 
        class="filter"
        :class="{'filter--dropped': drop}"
    >
        <div class="filter__title" @click="drop = !drop">
            <IconArrowDropUpLine class="filter__drop-caller" size="20"/>
            <p>{{ title }}</p>
        </div>
        <div class="filter__container">
            <slot/>
            
            <Component 
                :is="component" 
                v-if="component" 
                v-model="model" 
                :="filterAttrs"
            />
        </div>
    </div>
</template>

<script setup>
    import { RangeInput, CheckboxesInput } from "#components";

    const props = defineProps({
        title: String,
        type: String, // range / checkbox
        filterAttrs: Object
    })

    const model = defineModel();

    const component = computed(()=>{
        switch (props.type) {
            case 'range':
                return RangeInput;
            default:
                return CheckboxesInput;
        }
    });

//drop
    const drop = ref(true);
</script>

<style lang="scss" scoped>
    .filter{
        margin-bottom: 3.2rem;

        &__title{
            display: flex;
            align-items: center;
            gap: 1.2rem;
            cursor: pointer;

            p{
                @include font-p4;
                font-weight: 600;
            }
        }

        &__drop-caller{
            color: var(--black-60);
            transition: .3s;
            margin: .2rem 0;
        }
        
        &__container{
            padding-top: 0rem;
            overflow: hidden;
            height: 0;
        }
        
        &--dropped{
            .filter{
                &__drop-caller{
                    transform: rotate(-.5turn);
                }
                
                &__container{
                    padding-top: 1rem;
                    overflow: visible;
                    height: auto;
                }
            }
        }
    }
</style>