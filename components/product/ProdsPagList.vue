<template>
    <div v-if="total" class="prods-pag-list">
        <div class="prods-pag-list__list content-grid">
            <ProdCard 
                v-for="i in list"
                :info="i"
            />
            <template v-if="loading">
                <ProdCardPlaceholder v-for="i in 6"/>
            </template>
        </div>
        <Button 
            v-if="limit*page < total" 
            :="{loading}" 
            transition-block
            type="light"
            @click="push"
        >
            Показать ещё
        </Button>
        <Err :err="err"/>
    </div>
</template>

<script setup>
    const props = defineProps({
        endpoint: String,
        limit: {
            type: Number,
            default: 6
        }
    });

    const list = ref([]);
    const total = ref(0);
    const err = ref(0);

    const page = ref(0);
    const loading = ref(false);

    const event = useRequestEvent()

    const push = async ()=>{
        loading.value = true;
        err.value = '';

        const start = page.value * props.limit;
        const end = start + props.limit - 1;

        try{
            const {
                data: {value: fetched},
                error
            } = await useAPI(
                props.endpoint,
                {
                    server: import.meta.server,
                    query: {
                        start,
                        end
                    },
                },
            );


            if(error?.value){
                    if(error.value.statusCode < 500){
                        throw Error404(event, error?.value?.message);
                    }else if(error.value.cause?.name == 'AbortError'){
                        return;
                    }else{
                        throw new Error(error?.value?.data?.message);
                    }
                }

                if(page.value.length == 1 && fetched.products.length == 0){
                    throw Error404(event, 'page overflow');
                }

            list.value.push(...fetched.products);
            page.value++;
            total.value = fetched.total;

        }catch (error) {
            err.value = error.message;
        }finally{
            loading.value = false;
        }
    }

    watch(
        () => props.endpoint, 
        (n)=>{
            if(!n)return;
            list.value = [];
            page.value = 0;
            push();
        }
    )
    push();
</script>

<style lang="scss" scoped>
    .prods-pag-list{
        .button{
            margin-top: 2.4rem;
            width: 100%;
        }

        .err{
            margin-top: 2.4rem;
        }
    }
</style>