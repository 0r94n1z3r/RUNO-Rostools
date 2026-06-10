<template>
    <div class="header-mob-content">
        <!-- notdone -->
        <Search
            v-model="useSearch().searchText" 
            class="header-mob-content__search" 
            style-type="transparent-light"
            @focus="switchLayer(3)"
        />
        
        <div 
            class="header-mob-content__layers"
            :style="{'height': h ? h + 'px' : 'auto'}"
        >
            <div 
                :id="`header-mob-content__layer-${0}`"
                class="header-mob-content__layer"
                :class="{'header-mob-content__layer--active': activeLayerId == 0}"
            >
                <HeaderMobBlock 
                    title="Город"
                    :list="[{title: useRegions().current?.title, icon: IconMapPinLine}]"
                    @clicked="switchLayer(1)"
                />

                <HeaderMobBlock 
                    title="Каталог"
                    :list="useCategories().mainCategories"
                    @clicked="(ev)=>{
                        setCategory(ev);
                    }"
                />
                
                <HeaderMobBlock 
                    title="О компании и услугах"
                    :list="aboutList"
                    @clicked="navigateTo($event.to)"
                />
            </div>

            <div 
                :id="`header-mob-content__layer-${1}`"
                class="header-mob-content__layer"
                :class="{'header-mob-content__layer--active': activeLayerId == 1}"
            >
                <HMRegions />
            </div>

            <div 
                :id="`header-mob-content__layer-${2}`"
                class="header-mob-content__layer"
                :class="{'header-mob-content__layer--active': activeLayerId == 2}"
            >
                <HMCategories 
                    v-model="categoryID"
                    @back="switchLayer(0)"
                />
            </div>

            <div 
                :id="`header-mob-content__layer-${3}`"
                class="header-mob-content__layer"
                :class="{'header-mob-content__layer--active': activeLayerId == 3}"
            >
                <HMSearch />
            </div>
        </div>

        <div class="header-mob-content__buttons">
            <NuxtLink class="header-mob-content-button" to="/favorites">
                <IconHeartLine />
                <p class="header-mob-content-button__title">Избранное</p>
                <p class="header-mob-content-button__num">{{ useFavorites().list.length }} {{ pluralizeWord(['товар', 'товара', 'товаров'], useFavorites().list.length) }}</p>
            </NuxtLink>
            <NuxtLink class="header-mob-content-button" to="/cart">
                <IconShoppingCart2Line />
                <p class="header-mob-content-button__title">Корзина</p>
                <p class="header-mob-content-button__num">{{ useCart().length }} {{ pluralizeWord(['товар', 'товара', 'товаров'], useCart().length) }}</p>
            </NuxtLink>
            <Button 
                type="accent"
                :icon-left="IconUserLine"
                @click="useUser().info?navigateTo('/user'):useUser().callAuth()"
            >
                {{useUser().info?'Личный кабинет':'Войти'}}
            </Button>
        </div>
    </div>
</template>

<script setup>
    import { IconUserLine, IconMapPinLine } from '#components';

    const props = defineProps({
        aboutList: Array,
        state: String,
    });

    const emit = defineEmits(['close']);

    const h = ref(0);
    const activeLayerId = defineModel('activeLayerId', 0);

    const switchLayer = (id) => {
        activeLayerId.value = id;
    }

    const resize = async () => {
        await sleep();
        h.value = document.getElementById(`header-mob-content__layer-${activeLayerId.value}`).offsetHeight;
    }

    watch(activeLayerId, resize);
    watch(()=>useSearch().list, resize);
    watch(()=>useSearch().categories, resize);
    watch(()=>useSearch().productsLoading, resize);
    
// category
    const categoryID = ref();

    const setCategory = (cat) => {
        if(!cat.has_children){
            navigateTo(`/catalog/${cat.name}`);
            emit('close');
            return;
        }
        categoryID.value = cat.id;
        switchLayer(2);
    }
</script>

<style lang="scss" scoped>
    .header-mob-content{
        @include flex-col;
        height: fit-content;
        min-height: 100%;
        position: relative;

        &__search{
            margin-bottom: 1.6rem;
            position: sticky;
            top: 0;
            z-index: 2;
        }

        &__buttons{
            display: grid;
            grid-template-columns: 1fr 1fr;
            gap: .8rem;
            position: sticky;
            bottom: 0;
            left: 0;
            border-radius: 1.2rem;
            backdrop-filter: blur(3.5rem);
            margin-top: auto;
        
            .button{
                grid-column: 1/-1;
                width: 100%;
            }
        }

        &__layers{
            position: relative;
            overflow: hidden;
        }

        &__layer{
            @include transition-bounce;
            &:not(:first-child){ 
                position: absolute;
                top: 0;
                left: 0;
                width: 100%;
            }

            &:not(&--active){
                @include hidden(0);
                scale: 0.95;
            }
        }

        .header-mob-content-button{
            @include flex-c;
            @include flex-col;
            gap: .4rem;
            height: 10.8rem;
            border-radius: .6rem;
            cursor: pointer;
            padding: 1.2rem;
            background: var(--c-surface-neutral-secondary);
            transition: .3s;

            @include hover{
                &:hover{
                    color: var(--c-text-accent)
                }
            }

            &:active{
                transition: .01s;
                background: var(--c-surface-neutral-med);
            }

            .icon{
                --icon-size: 2.4rem;
                margin-bottom: .4rem;
            }

            &__title{
                @include font-p4;
            }

            &__num{
                @include font-p5;
                color: var(--c-text-secondary);
            }
        }
    }
</style>