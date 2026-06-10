<template>
    <IndexPage />
</template>

<script setup>
    import IndexPage from '../index.vue'

    const recoveryCode = computed(()=>R().params.recoveryCode);

    onMounted(async ()=>{
        if(useUser().info)return;

        await new Promise((r)=>setTimeout(r));

        const {data: {value: fetched}} = await useAPI(
            `/lk/users/check_code`,
            {
                method: 'POST',
                server: false,
                query: {
                    code: recoveryCode.value
                }
            }
        );

        if(fetched?.result != 'ok'){
            useUser().authModal.call('recovery', 3);
            return;
        }

        useUser().authModal.call('recovery', 2);
    })
</script>

<style lang="scss" scoped>

</style>