export default defineStore("useUser", ()=>{

//info
    const info = ref(null); //null

    const token = useCookie(
        'token',
        {maxAge: 2678400}
    );

    const refresh_token = useCookie(
        'refresh_token',
        {maxAge: 2678400}
    );

    const getInfo = async ()=>{
        try{
            const fetched = await useAPI(
                `/lk/users/profile`,
                {cache: 'no-cache', key: 'userInfo'}
            );

            if(fetched.error.value){
                throw new Error(fetched.error?.value?.data?.message);
            }

            info.value = fetched.data.value?.profile || false;
            if (!info.value) {
                throw new Error('profile-not-found');
            }

            if (!Array.isArray(info.value.addresses)) {
                info.value.addresses = [];
            }

            if(!info.value.addresses.length){
                info.value.addresses.push({"city": "","street": "","house": "","housing": "","entrance": "","flat": "","floor": ""})
            }

            // if(window?.ym)
            //     ym(57376876,'reachGoal','signin');

        } catch(error) {
            info.value = false;
        } finally {
            loading.value = false;
        }
    }

    //orgs
        watch(info, (n)=>{
            if(!n?.orgs)return;
            if(!n.orgs?.length){ 
                setUpOrgs() 
            }else{
                purifyOrgs();
            }
        })

        const setUpOrgs = async ()=>{
            await sleep();
            const fetched = await useAPI(
                `/lk/user_orgs`,
                {
                    method: 'POST',
                    body: {"manager_last_name": "EMPTY_VALUE","manager_name": "EMPTY_VALUE","manager_second_name": "EMPTY_VALUE","manager_phone": "EMPTY_VALUE","booker_last_name": "EMPTY_VALUE","booker_name": "EMPTY_VALUE","booker_second_name": "EMPTY_VALUE","booker_phone": "EMPTY_VALUE","supplier_last_name": "EMPTY_VALUE","supplier_name": "EMPTY_VALUE","supplier_second_name": "EMPTY_VALUE","supplier_phone": "EMPTY_VALUE","organization": "EMPTY_VALUE","main_state_registration_number": "EMPTY_VALUE","tax_payer_id": "EMPTY_VALUE","registration_code": "EMPTY_VALUE","checking_account": "EMPTY_VALUE","correspondent_account": "EMPTY_VALUE","bank_name": "EMPTY_VALUE","bank_code_id": "EMPTY_VALUE","legal_locality": "EMPTY_VALUE","legal_street": "EMPTY_VALUE","legal_house_number": "EMPTY_VALUE","legal_building": "EMPTY_VALUE","legal_apartment": "EMPTY_VALUE","actual_locality": "EMPTY_VALUE","actual_street": "EMPTY_VALUE","actual_house_number": "EMPTY_VALUE","actual_building": "EMPTY_VALUE","actual_apartment": "EMPTY_VALUE"},
                    server: false,
                    cache: 'no-cache'
                }
            );
            
            info.value.orgs.push(fetched.data.value);

            purifyOrgs();
        }

        const purifyOrgs = ()=>{
            let org = info.value.orgs[0];
            Object.keys(org).forEach(k => { if(org[k] == "EMPTY_VALUE")org[k] = ""; })
        }

//auth

    //modals
        const authModal = ref();
        const registrationSuccessModal = ref();
        const recoverSuccessModal = ref();

        const callAuth = (type, id)=>{
            authModal.value?.call(type, id);
        }

    const err = ref();
    const loading = ref();

    const signIn = (body)=>
        sign(`/lk/users/token`, body);

    const signUp = (body)=>{
        // if(window?.ym)
        //     ym(57376876,'reachGoal','signup');

        return sign(`/lk/users/register`, body);
    }


    const sign = async (endpoint, body)=>{
        loading.value = true;
        err.value = false;

        try{
            const fetched = await useAPI(
                endpoint, 
                {
                    method: 'post',
                    body,
                    cache: 'no-cache',
                    // key: 'sign'
                },
            );

            if(fetched.error.value || fetched.data.value.error){
                throw new Error(
                    (fetched.error.value?.data || fetched.data.value).message ||
                    (fetched.error.value?.data || fetched.data.value).error 
                );
            }

            const data = fetched.data?.value;

            info.value = data?.profile;

            token.value = data?.access_token;
            refresh_token.value = data?.refresh_token;

            useCookie('token', {maxAge: data.expires_in || 2678400});
            useCookie('refresh_token', {maxAge: data.expires_in || 2678400});

            setTimeout(getInfo)

            useNotifications().push({title: 'Добро пожаловать!'});

            return true;

        } catch(error) {
            console.error(error);
            err.value = error.message;
        } finally {
            loading.value = false;
        }
    }

    const exit = ()=>{
        token.value = null;
        refresh_token.value = null;
        info.value = false;
        R().guard();
    }

    //recover
        const recover = async (id, body)=>{
            loading.value = true;
            err.value = false;

            let endpoint;

            switch(id) {
                case 0:
                    endpoint = `/lk/users/reminder_password`
                    break;
                case 1:
                    endpoint = `/lk/users/change_password_by_code`
                    return await sign(endpoint, body);
            }

            try{
                const fetched = await useAPI(
                    endpoint, 
                    {
                        method: 'post',
                        body,
                        cache: 'no-cache'
                    },
                );

                if(fetched.error.value || fetched.data.value.error){
                    throw new Error(
                        (fetched.error.value?.data || fetched.data.value).message ||
                        (fetched.error.value?.data || fetched.data.value).error
                    );
                }

                R().router.replace({query: {}})

                return fetched.data?.value;

            } catch(error) {
                console.error(error);
                err.value = error.message;
            } finally {
                loading.value = false;
            }
        }

//----------------------------------------------------------------
    return {
        authModal,
        registrationSuccessModal,
        recoverSuccessModal,
        
        callAuth,        
        
        err,
        loading,
        
        signIn,
        signUp,
        exit,

        token,
        info,
        getInfo,

        recover
    }
})