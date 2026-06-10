export default defineStore("useLayout", ()=>{
//heights
    onMounted(() => {
        if(import.meta.client){
            initElement('headerHeight', 'header', 'header-height');
            initElement('footerHeight', 'footer', 'footer-height');
        }
    })

    const elements = ref({});

    const initElement = (key, id, cssVar)=>{
        const el = document.getElementById(id);
        if (!el) {
            return;
        }
        const scale = useElementSize(el, undefined, { box: 'border-box' });
        watchDebounced(()=>scale.height.value, (n)=>{
            document.documentElement.style.setProperty(`--${cssVar}`, n + 'px')
        }, {debounce: 10, immediate: true});
        elements.value[key] = scale.height;
    }

//scrollbar
    onMounted(()=>{
        if (!import.meta.client || typeof document === 'undefined') {
            return;
        }
        const div = document.createElement("div");
        div.style.visibility = "hidden";
        div.style.overflow = "scroll";
        div.style.width = "100px";
        div.style.position = "absolute";
        div.style.top = "-9999px";

        document.body.appendChild(div);
        const scrollbarWidth = div.offsetWidth - div.clientWidth;
        document.body.removeChild(div);

        document.documentElement.style.setProperty("--scrollbar-width", `${scrollbarWidth}px`);
    })

//----------------------------------------------------------------
    return {
        
    }
})
