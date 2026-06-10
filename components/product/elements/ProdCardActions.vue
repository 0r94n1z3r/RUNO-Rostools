<template>
    <div class="prod-card-actions">
        <FavButton 
            v-if="hasAction('fav')"
            :="{info}"
        />
        <Button 
            v-if="hasAction('delete')"
            :icon-left="IconDeleteBin5Line"
            type="light"
            @click.prevent.stop="$emit('delete')"
        />
    </div>
</template>

<script setup>
    import { IconDeleteBin5Line } from '#components';

    const props = defineProps({
        info: Object,
        actions: Array,
    })

    const emit = defineEmits(['delete'])

    const hasAction = action => props.actions.includes(action)
</script>

<style lang="scss" scoped>
    .prod-card-actions{
        @include flex-col;
        gap: .8rem;
    }
</style>