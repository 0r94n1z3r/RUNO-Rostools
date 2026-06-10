export default defineStore("M", ()=>{
    
    const allowed = ref(false);
    const loaded = ref(false);
    const error = useError()
    let benchScheduleStarted = false;

    const runTest = ()=>{
        if (import.meta.server) {
            return;
        }
        if (benchScheduleStarted || loaded.value) {
            return;
        }
        benchScheduleStarted = true;

        if (useMediaQuery('(prefers-reduced-motion: reduce)').value) {
            allowed.value = false;
            loaded.value = true;
            return;
        }

        let benchFinished = false;

        const runBench = () => {
            if (benchFinished) {
                return;
            }
            benchFinished = true;
            try {
                const start = performance.now();
                let x = 0;
                for (let i = 0; i < 1e6; i++) {
                    x += Math.sqrt(i ^ (x + Date.now()));
                }
                globalThis.__perfSink = x;
                const res = performance.now() - start;
                console.log('benchmark:', res);
                allowed.value = res <= 100;
            } catch (e) {
                console.warn('[M] benchmark failed', e);
                allowed.value = false;
            } finally {
                loaded.value = true;
            }
        };

        if (typeof requestIdleCallback === 'function') {
            requestIdleCallback(() => runBench(), { timeout: 500 });
        } else {
            setTimeout(runBench, 0);
        }

        setTimeout(() => {
            if (!loaded.value) {
                runBench();
            }
        }, 2500);
    }

    onMounted(runTest);
    watch(error, (n) => {if (!loaded.value && n) runTest()});

    
    const mounted = async (cb) => {
        while (!loaded.value) {
            await sleep(10);
        }
        cb(allowed.value);
    };





//----------------------------------------------------------------
    return {
        allowed,
        loaded,
        mounted
    }
})