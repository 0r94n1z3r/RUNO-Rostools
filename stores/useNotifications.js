import {IconCheckboxCircleFill} from '#components'

export default defineStore("useNotifications", ()=>{

    const list = ref([]);

    const push = (data={
        /*
            icon,
            iconColor,
            title,
            text
         */
    })=>{
        const id = Date.now();

        const defaultData = {
            icon: IconCheckboxCircleFill, 
            iconColor: 'var(--c-success-100)',
            title: 'Успешно'
        }

        const ntf = {id, ...defaultData, ...data}
    
        list.value.push(ntf);

        return ntf;
    }

    const remove = (id)=>{
        list.value = list.value.filter(e => e.id != id);
    }

// ----------

    return {
        list, 
        push, 
        remove
    };

})