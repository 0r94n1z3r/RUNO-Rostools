<template>
    <div class="notifications">
        <Notification 
            v-for="i in useNotifications().list" 
            :info="i"
        />
    </div>
</template>

<script setup>
    
</script>

<style lang="scss" scoped>
    .notifications{
        position: fixed;
        bottom: 1.6rem;
        right: 0;
        left: 0;
        margin: auto;
        z-index: 9999;
        width: 100%;
        max-width: 40rem;
        @include flex-col;
        align-items: center;
    }
</style>