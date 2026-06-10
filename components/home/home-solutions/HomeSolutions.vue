<template>
    <div id="home-solutions" class="home-solutions content-wrapper">
        <SectionTitle
            class="home-solutions__title"
            bullit="Каталог"
        >
            Наши передовые решения <span nobr>для вашего</span> бизнеса
        </SectionTitle>

        <div 
            class="home-solutions__grid"
            :class="`home-solutions__grid--twos-${
                getTwos(useCategories().initLoading?4:list.length)
            }`"
        >
            <template v-if="useCategories().initLoading">
                <Placeholder
                    v-for="i in 4"
                    type="block"
                />
            </template>

            <template v-else>
                <SolutionsCard 
                    v-for="(i,k) in list"
                    :k="k"
                    :info="i"
                />
            </template>
        </div>
    </div>
</template>

<script setup>
    const getTwos = (n)=>(n % 3 == 0) ? 0 :(n % 3 == 1) ? 2 : 1;

    const list = computed(()=>
        useCategories().list.filter(e => e.is_main)
    );
</script>

<style lang="scss" scoped>
    .home-solutions{
        margin-top: -20rem;
        padding-top: 20rem;

        &__title{
            @include flex-c;
            @include flex-col;
            margin: 0 auto;
            max-width: 80rem;
            margin-bottom: 6.4rem;
            text-align: center;
        }

        &__grid{
            display: grid;
            grid-template-columns: repeat(2, 1fr);
            gap: 2rem;
            
            .placeholder{
                --height: 46rem; 
                --width: 100%;
            }


            @include desktop(1000px){
                display: grid;
                grid-template-columns: repeat(6, 1fr);
                gap: 2rem;

                >*{
                    grid-column: span 2;

                    &:only-child{
                        grid-column: 1/-1!important;

                        :deep(){
                            .solutions-card{
                                &__image{
                                    height: 44.6rem;
                                    padding-bottom: 0;
                                    margin-bottom: 0;
                                }

                                &__image-wr{
                                    width: auto;
                                    --w: 160%;
                                    top: -27.7rem;
                                    right: var(--card-pad, 0);
                                    left: unset;
                                    transform: unset;

                                    img{
                                        width: auto;
                                    }

                                }

                                @include desktop(1300px){
                                    &__image{
                                        height: 68.6rem;
                                    }

                                    &__image-wr{
                                        --w: 172.5%;
                                        top: -38.7rem;
                                    }
                                }

                                &__content{
                                    max-width: 44.2rem;
                                    position: absolute;
                                    bottom: var(--card-pad, 0);
                                    left: var(--card-pad, 0);

                                    &::before{
                                        display: none;
                                    }

                                    h3{
                                        @include font-h2;
                                    }
                                }
                            }
                        }
                    }
                }

                &--twos-1>*:nth-child(-n + 2),
                &--twos-2>*:nth-child(-n + 4){
                    grid-column: span 3;
                }
            }  
        }

        @include mobile{
            &__title{
                margin-bottom: 3.2rem;

                h2{
                    @include font-h1--mob;
                }
            }

            &__grid{
                grid-template-columns: 1fr;
                gap: .8rem;
            }
        }
    }
</style>