export default defineStore("useCategories", ()=>{
//drop
    const called = ref(false);
    const navIds = ref([]);
    const navigationBackHandler = ()=>{
        if(!navIds.value.length){
            called.value = false;
            return;
        }
        navIds.value.pop();
    }
    watch(called, n => { //сброс после закрытия
        if(!n){
            setTimeout(
                () => navIds.value = [], 
                301 //окончание анимации
            );
        }
    })
    watch(()=>R().fullPath, ()=>called.value = false);
    
//categories
    const initLoading = ref(true);
    const {data: fetchedCategories} = useAPI(
        '/categories',
        {
            key: 'pinia-categories',
            onResponse(){initLoading.value = false}
        }
    );
    const list = computed(()=>fetchedCategories?.value?.categories || []);

    const getCategoryId = (value, key) => 
        key == 'id'?
            value:
            (category(value, key)?.id || 0);

    const category = (value, key = 'id')=> // категория по id
        list.value.find(e => e[key] == value);

    const mainCategories = computed(()=> // список основных категорий
        list.value.filter(e => e?.parent_id == null)
    )

    const hasSubCategories = (value, key = 'id') => {// есть ли подкатегории
        let id = getCategoryId(value, key);
        return list.value.some(e => e?.parent_id == id);
    }

    const subCategories = (value, key = 'id') => { // список подкатегорий
        let id = getCategoryId(value, key);
        return list.value.filter(e => e?.parent_id == id);
    }

    //parents
        const isParent = (childCategory, potentialParentId) => { // является ли категория potentialParentId родителем для childCategory
            if(!childCategory)return false;

            if (childCategory.parent_id === potentialParentId) {
                return true;
            } else if (childCategory.parent_id !== null) {
                const parentCategory = category(childCategory.parent_id, 'id');
                return isParent(parentCategory, potentialParentId);
            }

            return false;
        };

//property
    const closestWithProperty = (categoryId, property)=>{
        let cat = category(categoryId);
        if(!cat)return null;
        if(property(cat))return cat;
        if(!cat.parent_id)return null;
        return closestWithProperty(cat.parent_id, property);
    }

    //discount
        const categoryDiscount = (categoryId)=>//Возвращает объект со скидкой
            closestWithProperty(categoryId, (cat)=>cat.discount);

//tree
    const getFilteredTree = (func)=>{ // отфильтрованное дерево по условию func(категория) 
        const map = new Map();
        list.value.forEach(obj => map.set(obj.id, {...obj, children: []}));

        const root = [];

        list.value.forEach(obj => {
            if (obj.parent_id !== null && map.has(obj.parent_id)) {
                map.get(obj.parent_id).children.push(map.get(obj.id));
            } else {
                root.push(map.get(obj.id));
            }
        });

        const filterTree = (node) => {
            if (func(node)) {
                return node;
            }

            const filteredChildren = node.children
                .map(child => filterTree(child))
                .filter(child => child !== null);

            if (filteredChildren.length > 0) {
                return {...node, children: filteredChildren};
            }

            return null;
        }

        return root
            .map(node => filterTree(node))
            .filter(node => node !== null);
    }

    const getTreeIds = (category) =>{
            let ids = [];

            const recurse = (currentNode) => {
                ids.push(currentNode.id);

                if (currentNode.children && currentNode.children.length > 0) {
                    for (let child of currentNode.children) {
                        recurse(child);
                    }
                }
            }

            recurse(category);

            return ids;
    }

    //stickers
        const stickerTree = (sticker) => { // рекурсивное дерево категорий по стикер
            if(!sticker)return [];
            return getFilteredTree(e => e[sticker])
        }

//breadcrumbs
    const prevCrumbsId = ref();
    const breadcrumbs = (value, key = 'id') => { // Возвращает, в виде массива рекурсивно родителей категории с id (и саму категорию в качестве последнего элемента)                
        if(!value){
            if(prevCrumbsId.value)return breadcrumbs(prevCrumbsId.value);
            return [];
        }

        let id = getCategoryId(value, key);

        prevCrumbsId.value = id;
        let res = [];
        let currentId = id;

        do {
            res.unshift(category(currentId));
            currentId = res?.[0]?.parent_id;
        } while(currentId != null)

        return res;
    }    

//short
    const getShort = (name)=>{
        const cat = category(name);
        // резка · сварка · чистка · маркировка · гравировка
        // ручные · полуавтоматические · автоматические · вертикальные · рольганги
        // биметаллические · твердосплавные · по дереву · по бетону
        switch(cat?.id){
            case 61: return 'резка';
            case 17: return 'сварка';
            case 146: return 'чистка';
            case 16: return 'маркировка';
            case 151: return 'гравировка';

            case 10: return 'ручные';
            case 11: return 'полуавтоматические';
            case 12: return 'автоматические';
            case 78: return 'вертикальные';
            case 20: return 'рольганги';

            case 117: return 'биметаллические M42';
            case 118: return 'биметаллические M51';
            case 119: return 'твердосплавные';
            case 116: return 'по дереву';
            case 122: return 'по бетону';
            default: return ''
        }
    }

//----------------------------------------------------------------
    return {
        called,
        navigationBackHandler,
        navIds,

        initLoading,
        list,
        category,
        mainCategories,
        hasSubCategories,
        subCategories,
        isParent,

        categoryDiscount,

        getFilteredTree,
        getTreeIds,
        stickerTree,

        breadcrumbs,
        getShort,
    }
})