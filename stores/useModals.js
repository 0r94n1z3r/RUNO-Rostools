export default defineStore("useModals", ()=>{
    const activeModalsCount = ref(0);
    let observer;

    const updateCount = () => {
        activeModalsCount.value = document?.querySelectorAll(".modal-wireframe--called")?.length || null;
    };

    onMounted(() => {
        updateCount();
        observer = new MutationObserver(updateCount);
        observer.observe(document.body, {
            childList: true,
            subtree: true,
        });
    });

    const lockScroll = (n)=>{
        let body = document?.documentElement;
        if(!body)return;
        let count = n || activeModalsCount.value;
        body.style.overflow = count?"hidden":null;
        body.style.setProperty('--content-width', count?'calc(100vw - var(--scrollbar-width, 0))':null);
    }

    watch(activeModalsCount, lockScroll)

//feedback
    const consultation = ref();
    
//----------------------------------------------------------------
    return {
        lockScroll,
        activeModalsCount,
        consultation
    }
})