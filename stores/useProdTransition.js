export default defineStore("useProdTransition", ()=>{
    const router = useRouter();

    const state = ref('idle'); // transit / pre-fin / fin

    const data = ref({
        product: null,
        x: 0,
        y: 0,
        width: 0,
        height: 0
    });

    const transit = async (
        product,
        x,
        y,
        width,
        height
    )=>{
        if(state.value != 'idle') return;

        data.value = {
            product: product,
            x: x,
            y: y,
            width: width,
            height: height
        };
        
        await sleep(10);
        state.value = 'transit';

        await sleep(600);
        navigateTo(`/product/${product?.name}`);
    }

    const finish = async () => {
        if(state.value == 'idle') return;

        state.value = 'pre-fin';
        await sleep(300);
        
        state.value = 'fin';
        await sleep(400);

        data.value = {
            product: null,
            x: 0,
            y: 0,
            width: 0,
            height: 0
        };

        await sleep(10);
        state.value = 'idle';
    }
//----------------------------------------------------------------
    return {
        state,
        data,
        transit,
        finish,
    }
})