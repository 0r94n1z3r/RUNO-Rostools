<template>
    <div class="categories-drop">
        <div class="categories-drop__container categories-drop-frosty"> 
            <div class="categories-drop__block categories-drop-frosty">
                <p class="categories-drop__title font-c2">Основная продукция</p>
                <p 
                    v-for="i in useCategories().mainCategories" 
                    class="categories-drop__nav"
                    :class="{'categories-drop__nav--active': i == activeNav}"
                    @mouseover="setActiveNav(i)"
                    @click="navigateTo(`/catalog/${i.name}`)"
                >
                    {{ i?.title }}
                </p>
            </div>
            <div class="categories-drop__block">
                <p class="categories-drop__title font-c2">{{ activeNav?.title }}</p>
            
                <Transition name="fade" mode="out-in">
                    <div :key="activeNav?.id" class="categories-drop__content">
                        <template v-if="useCategories().initLoading || !activeNav?.id">
                            <CategoriesPlaceholder v-for="i in 6"/>
                        </template>
                        <template v-else>
                                <div 
                                    v-for="i in flatCategories" 
                                    :key="i.id"
                                    class="category-block"
                                >
                                    <NuxtLink 
                                        class="category-block__title text-link-basic"
                                        :to="`/catalog/${i.name}`"
                                    >
                                        {{ i.title }}
                                    </NuxtLink>
                                    <!-- <div 
                                        v-if="useCategories().hasSubCategories(i.id)" 
                                        class="category-block__content"
                                    >
                                        <NuxtLink
                                            v-for="j in useCategories().subCategories(i.id)"
                                            class="category-block__item text-link-basic"
                                            :to="`/catalog/${j.name}`"
                                        >
                                            {{ j.title }}
                                        </NuxtLink>
                                    </div> -->
                                </div>
                        </template>
                    </div>
                </Transition>

                <div v-show="activeNav?.id" class="categories-drop__image">
                    <Transition name="fade" mode="out-in">
                        <img 
                            :key="activeNav?.id"
                            :src="activeImage"
                            class="categories-drop__image"
                        />
                    </Transition>
                </div>

                <Button
                    v-show="activeNav?.id" 
                    class="categories-drop__button" 
                    :to="`/catalog/${activeNav?.name}`" 
                    :type="state == 'transparent'?'transparent':'transparent-light'" 
                    @click="emit('close')"
                >
                    Смотреть все
                </Button>
            </div>
        </div>
    </div>
</template>

<script setup>
    import img2 from './media/2.webp';
    import img15 from './media/15.webp';
    import img123 from './media/123.webp';
    import img150 from './media/150.webp';

    const props = defineProps({
        state: String,
        drop: Boolean
    });

    const emit = defineEmits(['close'])

    const activeNav = ref()
    watch(()=>props.drop, n => {
        if(!n)return;
        
        if(R().name != 'Category' || !useCategories().list.length){
            activeNav.value = useCategories().mainCategories[0]
            return;
        }

        const cat = useCategories().category(R().params.categoryName, 'name');
        activeNav.value = useCategories().mainCategories.find(e => useCategories().isParent(cat, e.id))
    }, {immediate: true})

    const setActiveNav = (nav) => {
        // if(!useCategories().hasSubCategories(nav.id)){
        //     navigateTo(`/catalog/${nav.name}`);
        //     return;
        // }

        activeNav.value = nav;
    }

    const flatCategories = computed(()=>{
        const subs = useCategories().subCategories(activeNav.value.id);
        if(activeNav.value.id == 15) return subs;
        return getLeafCategories(subs);
    })

    const getLeafCategories = (categories) => {
        const { subCategories } = useCategories();

        const walk = (items) =>
            items.flatMap(item => {
            const children = subCategories(item.id);
            return (!children || children.length === 0)
                ? [item]
                : walk(children);
            });

        return walk(categories);
    };

//products update
    // const loading = ref();
    // const prods = ref([]);

    // const update = async ()=>{ 
    //     if(!activeNav.value?.name)return;

    //     loading.value = true;

    //     const {data: fetched} = await useAPI(
    //         `/categories/products/${activeNav.value.name}`,
    //         {
    //             key: 'catalogColumn',
    //             query: {
    //                 start: 0,
    //                 end: 2,
    //             }
    //         },
    //     );

    //     prods.value = fetched.value?.products || [];

    //     loading.value = false;
    // }

    // watch(()=>activeNav.value, update);
    
    // watch(()=>props.drop, update);

//image
    const activeImage = computed(() => {
        if(activeNav.value?.id == 2) return img2;
        if(activeNav.value?.id == 15) return img15;
        if(activeNav.value?.id == 123) return img123;
        if(activeNav.value?.id == 150) return img150;
        return '';
    })
    

</script>

<style lang="scss" scoped>
    .categories-drop{
        width: 100%;
        @include transition-bounce(true);

        .categories-drop-frosty{
            backdrop-filter: blur(4rem);
        }
        

        &__container{
            @include shadow;
            width: 100%;
            background: var(--background);
            overflow: hidden;
            border-radius: 1.2rem;
            border: .1rem solid var(--border);
            display: flex;
        }

        &__block{
            @include flex-col;
            padding: 6.4rem;
            min-width: 0;

            &:first-child{
                min-width: 44rem;
            }

            &:last-child{
                width: 100%;
            }

            height: calc(70 * var(--vh));
        }

        &__title{
            color: var(--color-secondary);
            margin-bottom: 6.4rem;
        }

        &__nav{
            color: var(--color-disabled);
            transition: .3s;
            @include virtual-area(1.6rem);
            margin-bottom: 1.6rem;
            @include font-h4;
            cursor: pointer;

            &--active{
                color: var(--color);
            }

            @include hover{
                &:hover{
                    color: var(--color);
                }
            }

            &:active{
                transition: .1s;
                color: var(--color-secondary);
            }
        }

        &__content{
            @include grid(repeat(3, minmax(0, 1fr)), 2rem);
            row-gap: 3.2rem;
            margin-bottom: 3.2rem;
            overflow-y: auto;
            overflow-x: hidden;
            width: 100%;
            overscroll-behavior: contain;

            &:empty{
                display: none;
            }

            :deep(){
                .prod-card-placeholder{
                    padding-bottom: 2rem;
                }
            }
        }

        &__button{
            width: 100%;
            margin-top: auto;
        }

        &__image{
            width: 100%;
            flex-grow: 1;
            position: relative;
            margin-bottom: 2rem;

            img{
                position: absolute;
                height: 100%;
                width: 100%;
                object-fit: contain;
            }
            
        }

        .fade-enter-active,
        .fade-leave-active {
            transition: opacity .2s;
        }

        .fade-enter-from,
        .fade-leave-to {
            opacity: 0;
        }
    }

    .category-block{
        @include flex-col;
        gap: 1.6rem;

        &__content{
            @include flex-col;
            gap: .8rem;
        }

        &__title{
            @include font-h4; // notdone электрогидравлические (?)
            @include font-h3--mob;
            font-weight: normal;
            word-break: break-word;
        }
    }
</style>