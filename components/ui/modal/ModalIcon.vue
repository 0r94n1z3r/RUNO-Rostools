<template>
    <div 
        class="modal-icon"
        :class="`modal-icon--${type}`"
    >
        <Icon :icon="icon" class="modal-icon__icon" />
    </div>
</template>

<script setup>
    const props = defineProps({
        icon: Object,
        type: { // success / error
            type: String,
            default: 'success'
        }
    });
</script>

<style lang="scss" scoped>
    .modal-icon{
        --color: var(--c-icon-success);
        --background: var(--c-surface-success-high);

        &--error{
            --color: var(--c-surface-error-main);
            --background: var(--c-surface-error-high);
        }

        width: 8rem;
        height: 8rem;
        @include flex-c;
        --icon-size: 4rem;
        background: var(--background);
        border-radius: .6rem;
        color: var(--color);
        margin: 0 auto 3.2rem;
    }
</style>