<template>
    <div class="data-table">
        <h3 v-if="title" class="data-table__title font-h4"> {{ title }} </h3>
        <div class="data-table__contents">
            <div 
                v-for="row in data" 
                ref="rowsRefs" class="data-table__row" 
                :style="{'grid-template-columns': `repeat(${row.length}, 1fr)`}"
            >
                <p v-for="i in row" class="data-table__cell">{{ i }}</p>
            </div>
        </div>
        <Button 
            v-if="data.length > min" 
            class="data-table__button"
            type="light"
            @click="isDrop = !isDrop"
        >
            {{ isDrop ? 'Скрыть' : 'Показать все' }}
        </Button>
    </div>
</template>

<script setup>
    const props = defineProps({
        title: String,
        data: Array,
        titles: Array,
        min: {
            type: Number,
            default: 4
        }
    });

    const isDrop = ref(false);

    const rowsRefs = ref([]);

    const height = ref(0);
    const heightDisplay = computed(() => height.value -12 + 'px');

    const setHeight = () => {
        height.value = 0;

        const n = isDrop.value ? props.data.length : props.min;

        for(let i = 0; i < n; i++){
            height.value += rowsRefs.value[i]?.offsetHeight;
        }
    }

    onMounted(setHeight);
    watch(isDrop, setHeight);

</script>

<style lang="scss" scoped>
    .data-table {
        padding: 3.2rem;
        @include flex-col;
        gap: 2.4rem;
        background: var(--c-surface-neutral-secondary);
        border-radius: .6rem;
        max-width: 80rem;
        margin: 0 auto;

        &__contents{
            height: v-bind(heightDisplay);
            overflow: hidden;
            @include transition-bounce;
        }

        &__row{
            padding: 2rem 0;
            border-top: .1rem solid var(--c-border-neutral-low);
            display: grid;
            gap: .8rem;
            align-items: baseline;

            &:first-child{
                border-top: none;
                padding-top: 0;
            }
            
            // &:last-child{
            //     padding-bottom: 1rem;
            // }
        }

        &__cell{
            @include font-p3;
            color: var(--c-text-secondary);

            &:first-child:last-child{
                @include font-h4;
                line-height: 2rem;
                color: var(--c-text-default);
            }

            &:last-child:not(:first-child){
                color: var(--c-text-default);
                @include font-c2;
                text-align: end;
            }
        }

        &__button{
            width: 100%;
        }

        @include mobile(){
            padding: 1.6rem;

            &__contents{
                height: auto;
            }

            &__row{
                padding: 1.6rem 0;

                &:last-child{
                    padding-bottom: 0;
                }
            }

            &__cell{
                @include font-p4;

                &:last-child{
                    @include font-c3;
                }
            }

            &__button{
                display: none;
            }
        }

    }
</style>