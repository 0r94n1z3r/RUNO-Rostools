<template>
    <div class="hm-regions">
        <HeaderMobBlock
            :list="useRegions().list"
            @clicked="useRegions().redirect($event.subdomain)"
        />
    </div>
</template>

<script setup>

</script>

<style lang="scss" scoped>

</style>