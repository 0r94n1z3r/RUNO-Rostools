import policy from '/data/policy.js';

export default defineStore("useStatic", ()=>{

    //content-pages
        const contentPages = (()=>{
            const {data: fetchedPages} = useAPI('/contentpages', { key: 'pinia-contentpages' });
            const list = computed(()=>[
                ...(fetchedPages.value?.contentPages || []),
                {id: 0, name: 'politika-obrabotki-personalnyh-dannyh', content: policy, title: 'Политика конфиденциальности'}
            ]);

            const page = (key, keyName='id')=>
                list.value?.find(e => e[keyName] == key);

        //----------------------------------------------------------------
            return {
                list,
                page
            }
        })();

    //order-statuses
        const orderStatuses = (()=>{
            const {data: statuses} = useAPI('/lk/orders/order_statuses/', {
                key: 'pinia-order-statuses',
                server: false,
            });

            const list = computed(()=>statuses.value?.map((e)=>{
                const color = 
                    [8].includes(e.id)?
                        'green':
                    [9,].includes(e.id)?
                        'red':
                    [7,2].includes(e.id)?
                        'blue':
                        'gray'

                return {...e, color}
            }) || []);

            const status = (key, keyName='id')=>
                list.value?.find(e => e[keyName] == key);
            
        //----------------------------------------------------------------
            return {
                list,
                status
            }
        })();



    //nav-links
        const navLinks = [
            // {title: "Каталог", to: "/"}, // notdone
            {title: "О компании", to: "/about"},
            {title: "Услуги по обучению", to: "/education"},
            {title: "Полезное", to: "/useful"},
            {title: "Новости", to: "/news"},
            {title: "Контакты", to: "/contacts"},
        ];

    const {data: dollarRate} = useAPI(
        '/system_settings/exchange_rates', 
        { key: 'pinia-us-dollar-rate' }
    );

//----------------------------------------------------------------
    return {
        contentPages,
        orderStatuses,
        navLinks,
        dollarRate
    }
})