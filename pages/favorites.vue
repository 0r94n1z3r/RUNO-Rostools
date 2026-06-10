<template>
    <BasicPage 
        class="favorites"
        :breadcrumbs="{
            list: [
                {title: 'Профиль', to: '/user'},
                {title: 'Избранное'},
            ]
        }"
        title="Избранные товары"
    >
        <div class="content-wrapper">
            <Empty
                v-if="!useFavorites().loading && !tempList.length"
                description="Вы еще не добавили товары в избранное"
                has-button
            />
            <div v-else class="favorites__list content-grid">
                <template v-if="useFavorites().loading">
                    <ProdCardPlaceholder v-for="i in 6"/>
                </template>
                <template v-else>
                    <div 
                        v-for="i in tempList" 
                        class="favorites-card-overlay"
                        :class="{'favorites-card-overlay--show': removed?.includes(i)}"
                    >
                        <div class="favorites-card-overlay__overlay">
                            <Button 
                                type="transparent-light"
                                @click="useFavorites().switchFav(i)"
                            >
                                Вернуть
                            </Button>
                        </div>
                        <ProdCard 
                            :info="i"
                            :actions="['delete']"
                            @delete="useFavorites().switchFav(i)"
                        />
                    </div>
                </template>
            </div>
        </div>
    </BasicPage>
</template>

<script setup>
    definePageMeta({
        name: 'Favorites',
        private: true,
        nav: 'Fav',
        saveScroll: true
    })

    const tempList = ref(useFavorites().list);
    watch(
        ()=>useFavorites().loading,
        ()=>{
            tempList.value = useFavorites().list;
        }
    );

    const removed = computed(() =>
        tempList.value.filter(el => !useFavorites().list.includes(el))
    );
</script>

<style lang="scss" scoped>
    .favorites{
        --title-mb: 6.4rem;
    }

    .favorites-card-overlay{
        position: relative;

        &__overlay{
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            backdrop-filter: blur(4rem);
            @include transition-bounce;
            z-index: 2;
            border-radius: 1.2rem;
            padding: 2.4rem;
            @include flex-c;
        }

        .prod-card{
            @include transition-bounce;
        }
        
        &--show{
            .prod-card{
                scale: 0.95;
            }
        }

        &:not(&--show){
            .favorites-card-overlay__overlay{
                @include hidden(0);
                scale: 0.95;
            }
        }
    }
</style>