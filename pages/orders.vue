<template>
    <BasicPage 
        class="orders"
        :breadcrumbs="{
            list: [
                {title: 'Профиль', to: '/user'},
                {title: 'Мои заявки'},
            ]
        }"
        title="Мои заявки"
        description="Здесь вы можете отслеживать статус всех ваших заявок, просматривать подробности и управлять процессом их выполнения."
    >
        <div class="content-wrapper">
            <!-- <TabsControl 
                v-model="selectedStatusId"
                :list="statuses.map(e => e.title)"
                transition-block
            /> -->
            <div v-if="loading" class="orders__list">
                <Placeholder 
                    v-for="i in 3"
                    type="block"
                    :style="{
                        '--width': '100%',
                        '--height': '11rem'
                    }"
                />
            </div>
            <Empty 
                v-else-if="!fetchedList.length"
                class="orders__empty"
                title="У вас пока нет заявок"
                description="Ваши заявки появятся здесь, как только вы начнёте процесс оформления. Найдите подходящий товар и оставьте первую заявку."
                has-button
            />
            <Empty 
                v-else-if="!R_list.length"
                class="orders__empty"
                title="Нет заявок с таким статусом"
            />
            <div v-else class="orders__list">
                <OrderItem 
                    v-for="i in R_list"
                    :info="i"
                />
            </div>
        </div>
    </BasicPage>
</template>

<script setup>
    definePageMeta({
        saveScroll: true
    })

    const selectedStatusId = ref(0);

    const statuses = computed(()=>[
        {id: 0, title: 'Все'},
        ...useStatic().orderStatuses.list
    ]);

    const loading = ref(true);
    const fetchedList = ref([]);

    const update = async ()=>{
        loading.value = true;

        ({data: {value: {orders: fetchedList.value}}} = await useAPI(`/lk/orders`, {cache: 'no-cache'}));

        loading.value = false;
    }
    update();

    const R_list = computed(()=>{
        let res;

        if(selectedStatusId.value === 0){
            res = fetchedList.value;
        }else if(selectedStatusId.value === 1){
            res = fetchedList.value.filter(e => [0,1].includes(e.status_id));
        }else{
            res = fetchedList.value.filter(e => e.status_id === selectedStatusId.value);
        }

        return [...res].reverse();
    })
</script>

<style lang="scss" scoped>
    .orders{
        --title-mx-w: 58.8rem;
        --title-mb: 4.8rem;

        &__list{
            @include flex-col;
            gap: 2rem;
            margin-top: 3.2rem;
        }

        &__empty{
            margin-top: 3.2rem;
            max-width: 58.8rem;
        }
    }
</style>