<template>
    <div 
        v-if="totalPages > 1" 
        class="paginator text-label text-label--large" 
        :class="{'paginator--preloading': !mounted}"
    >
        <!-- < -->
        <NuxtLink
            class="paginator__button paginator__button--navigation" 
            :class="{
                'paginator__button--disabled': activePage == 1
            }" 
            :to="activePage == 1?'':`?page=${activePage-1}`"
            @click="clickHandler(activePage-1)"
        >
            <IconArrowDropRightLine/>
            <!-- <IconChevronRight24/> -->
        </NuxtLink>

        <!-- 1 -->
        <NuxtLink 
            class="paginator__button" 
            :class="{'paginator__button--active': activePage == 1}"
            :to="`?page=${1}`"
            @click="clickHandler(1)"
        >
            1
        </NuxtLink>

        <!-- ... -->
        <div 
            v-if="activePage > 4  && totalPages > 6" 
            class="paginator__button paginator__button--more"
        >
            ...
        </div>

        <!-- 7, 8, 9 -->
        <NuxtLink 
            v-for="i in pages"
            class="paginator__button" 
            :class="{'paginator__button--active': activePage == i}"
            :to="`?page=${i}`"
            @click="clickHandler(i)"
        >
            {{ i }}
        </NuxtLink>

        <!-- ... -->
        <div 
            v-if="activePage <= totalPages-4  && totalPages > 6" 
            class="paginator__button paginator__button--more"
        >
            ...
        </div>

        <!-- 15 -->
        <NuxtLink 
            v-if="totalPages >= 2"
            class="paginator__button" 
            :class="{'paginator__button--active': activePage == totalPages}"
            :to="`?page=${totalPages}`"
            @click="clickHandler(activePage)"
        >
            {{ totalPages }}
        </NuxtLink>

        <!-- > -->
        <NuxtLink 
            v-if="totalPages > 1" 
            class="paginator__button paginator__button--navigation" 
            :class="{
                'paginator__button--disabled': activePage == totalPages,
            }"
            :to="activePage == totalPages?'':`?page=${activePage+1}`"
            @click="clickHandler(activePage+1)"
        >
            <IconArrowDropRightLine/>
            <!-- <IconChevronRight24/> -->
        </NuxtLink>
    </div>
</template>

<script setup>
    const props = defineProps({
        totalPages: Number
    });

//
    const mounted = ref();
    onMounted(()=>{
        mounted.value = true
    })

//
    const page = defineModel();
    const activePage = computed(()=>page.value[page.value.length -1]);

    const pages = computed(()=>{
        if(props.totalPages <= 2)return [];
        if(props.totalPages <= 6)return getFilledArray(2, props.totalPages - 1);
        if(activePage.value <= 4)return getFilledArray(2, 5);
        if(activePage.value > props.totalPages - 4)return getFilledArray(props.totalPages - 4, props.totalPages - 1);
        return getFilledArray(activePage.value-1, activePage.value+1);
    });

    const getFilledArray = (start, end) => { // получает 2, 5 возвращает [2,3,4,5]
        return Array.from({length: end - start + 1}, (_, i) => start + i);
    }

    const clickHandler = async (p)=>{
        useWindowScroll().y.value = 0;
        await new Promise((r) => setTimeout(r,301));
        page.value = [p];
    }

    
</script>

<style lang="scss" scoped>
    .paginator{
        display: flex;
        gap: 1.6rem;
        margin: 3.2rem auto 0;
        width: fit-content;
        position: relative;

        &__button{
            height: 2.4rem;
            min-width: 2.4rem;
            border-radius: .4rem;
            padding: 0 .2rem;
            transition: .3s;
            text-align: center;
            user-select: none;
            @include flex-c;
            @include virtual-area(.8rem);
            box-sizing: content-box;

            &:not(:is(&--more, &--active)){
                cursor: pointer;

                @media (hover: hover){
                    &:hover{
                        color: var(--c-text-accent);
                    }
                }
            }

            &--disabled{
                pointer-events: none;
                color: var(--c-text-secondary);
            }

            &--active{
                background: var(--c-text-accent);
                color: var(--c-text-inverse);
            }

            &--navigation{

                &:first-child{
                    margin-right: 0;
                    transform: scale(-1);
                }

                &:last-child{
                    margin-left: 0;
                }
            }
        }

        @media (max-width: $mobile) {
            gap: .6rem;
        }

        &--preloading{
            &::after{
                @include pseudo-absolute;
                @include all-directions(0);
                border: .1rem solid var(--c-border-accent-main);
                border-radius: .8rem;
                animation: breathe 1s infinite;
            }
        }
    }
</style>