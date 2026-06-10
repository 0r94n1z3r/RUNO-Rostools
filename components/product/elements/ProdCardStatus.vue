<template>
    <div class="prod-card-status">
        <Badge
            v-if="type == 'badge'"
            :type="availability.color"
        >
            {{availability.title}}
        </Badge>
        <div 
            v-if="type == 'string'"
            class="prod-card-status__string" 
            :style="{color: stringParams.color}"
        >
            {{ availability.title }}
        </div>
    </div>
</template>

<script setup>
    const props = defineProps({
        info: Object,
        type: {
            type: String,
            default: "badge" // string
        }
    });

    const availability = computed(()=>
        props.info?.in_stock || props.info?.inStock ?{
            title: 'В наличии',
            color: 'green'
        }:{
            title: 'Под заказ',
            color: 'blue' 
        }
    );

    const stringParams = computed(()=>{
        switch (availability.value.color) {
            case 'green': return {
                color: 'var(--c-text-success)'
            }
            default: return {
                color: 'var(--c-text-accent)'
            }  
        }
    });
</script>

<style lang="scss" scoped>
    .prod-card-status{
        &__string{
            @include font-c3;
        }
    }
</style>