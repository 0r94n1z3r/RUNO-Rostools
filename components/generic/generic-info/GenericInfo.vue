<template>
    <div class="generic-info content-wrapper">
        <SectionTitle class="generic-info__title" bullit="Информация">
            Гарантия, обслуживание <span nobr>и доставка —</span> <span class="title-gray"><span nobr>все для</span> вашего удобства</span>
        </SectionTitle>

        <Tabs
            :titles="data.map(i => i.title)"
        >
            <template v-for="(i,k) in data" #[`slot-${k}`]>
                <div class="generic-info-block" transition-block>
                    <div v-for="row in i.list" class="generic-info-block__row">
                        <p>{{ row.title }}</p>
                        <p>{{ row.description }}</p>
                    </div>
                </div>
            </template>
        </Tabs>
    </div>
</template>

<script setup>
    import data from './data.json';
</script>

<style lang="scss" scoped>
    .generic-info{
        &__title{
            margin-bottom: 6.4rem;
        }
    }

    .generic-info-block{
        &__row{
            --space: 2.4rem;

            display: grid;
            grid-template-columns: 1fr 1fr;
            gap: 1.6rem;

            &:not(:last-child){
                padding-bottom: var(--space);
                border-bottom: .1rem solid var(--c-border-neutral-main);
            }

            &:not(:first-child){
                padding-top: var(--space);
            }

            p{
                &:first-child{
                    font-weight: 500;
                }

                &:last-child{
                    padding-right: 13%;
                }
            }
        }
    }

    @include nav-mobile{
        .generic-info-block__row{
            p{
                &:last-child{
                    padding-right: 0;
                }
            }
        }
    }

    @include mobile{
        .generic-info{
            &__title{
                margin-bottom: 3.2rem;
            }
        }

        .generic-info-block{
            &__row{
                --space: 1.6rem;
                grid-template-columns: 1fr;
                gap: .8rem;
            }
        }
    }


</style>