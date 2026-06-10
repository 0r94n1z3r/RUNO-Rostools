<template>
    <Card 
        
        class="order-item" 
        :class="[
            `order-item--state-${currentState}`,
            open && 'order-item--open'
        ]" 
        type="white"
        transition-block
    >
        <div ref="containerRef" class="order-item__wrapper" >
            <div class="order-item-top">
                <div class="order-item-top__title-wr">
                    <p class="order-item-top__title">Заказ №{{info.number}}</p>
                    <p class="order-item-top__date">Дата заказа: <span>{{dayjs(info.created_at).format('DD.MM.YYYY')}}</span></p>
                </div>
                <div class="order-item-top__status-wr">
                    <OrderStatus :="{info}"/>
                    <Button 
                        class="order-item__drop desk-visible" 
                        type="light"
                        :icon-left="IconArrowDropDownLine"
                        @click="open = !open"
                    />
                </div>
            </div>

            <div ref="rowRef" class="order-item__row">
                <div
                    v-for="(i,k) in list"
                    :ref="e => refs[0][k] = e"
                    class="order-item__anchor"
                ></div>
            </div>
            
            <div ref="contentRef" class="order-item__content">
                <div class="order-item__list">  
                    <OrderItemProduct 
                        v-for="(i,k) in list"
                        v-model:refs="refs"
                        :="{states, k}"
                        :info="i"
                    />
                </div>

                <CITotal class="order-item__total" :="{list}"/>

                <div v-if="false" class="order-item__buttons">
                    <!-- notdone (???) -->
                    <Button> 
                        Связаться с продавцом
                    </Button>
                    <!-- notdone -->
                    <Button 
                        type="accent"
                    >
                        Повторить заказ
                    </Button>
                </div>
            </div>

            <div 
                class="order-item__spacer"
                :style="{height: (open?contentHeight:rowHeight) + 'px'}"
            ></div>
        
            <template
                v-if="states?.[0]?.[0]" 
            >
                <ProdCardPhoto 
                    v-for="(i,k) in list"
                    class="order-item__photo"
                    :info="i"
                    :has-parallax="false"
                    :style="{
                        top: states[k][currentState].y + 'px',
                        left: states[k][currentState].x + 'px',
                        width: states[0][0].width + 'px'
                    }"
                />
            </template>

            <Button 
                class="order-item__drop mob-visible" 
                type="light"
                :icon-right="IconArrowDropDownLine"
                @click="open = !open"
            >{{ open?'Скрыть':'Детали заказа' }}</Button>
        </div>
    </Card>
</template>

<script setup>
    import { IconArrowDropDownLine } from '#components';

    const dayjs = useDayjs();

    const props = defineProps({
        info: Object
    });

    const open = ref(false);

    const list = computed(() => props.info?.products || []);

    const containerRef = ref();
    const contentRef = ref();
    const rowRef = ref();

    const {height: rowHeight} = useElementBounding(rowRef);
    const {height: contentHeight} = useElementBounding(contentRef);

    const refs = ref([[], []]);

    const states = ref([]);

    const calculateStates = ()=>{
        if(!refs.value[0].length || !containerRef.value) {
            states.value = [];
            return;
        }

        const container = useElementBounding(containerRef);

        states.value = list.value.map((e,k) => {
            const stateStart = useElementBounding(refs.value[0][k]);
            const stateEnd = useElementBounding(refs.value[1][k]);

            return [
                {
                    x: Math.round(stateStart.x.value - container.x.value),
                    y: Math.round(stateStart.y.value - container.y.value),
                    width: Math.round(stateStart.width.value),
                },
                {
                    x: Math.round(stateStart.x.value - container.x.value),
                    y: Math.round(stateEnd.y.value - container.y.value),
                },
                {
                    x: Math.round(stateEnd.x.value - container.x.value),
                    y: Math.round(stateEnd.y.value - container.y.value),
                }
            ]
        })
    }

    onMounted(async ()=>{
        await sleep();
        calculateStates();
    });
    watch(list, calculateStates);
    onResizeEnd(calculateStates);

    const currentState = ref(0);

    watch(open, async (n)=>{
        calculateStates();
        await sleep();
        if(n){
            currentState.value = 1;
            setTimeout(() => {
                currentState.value = 2;
            }, 100);
        }else{
            currentState.value = 1;
            setTimeout(() => {
                currentState.value = 0;
            }, 100);
        }
    })
    
</script>

<style lang="scss" >
    .order-item{
        --img-w: 10.6rem;
        --img-gap: .8rem;

        --padding: 3.2rem;

        &__anchor{
            padding-bottom: 100%;
            pointer-events: none;
            flex-shrink: 0;
        }
    }
</style>

<style lang="scss" scoped>
    .order-item{
        &__wrapper{
            position: relative;
            overflow: hidden;
        }

        &__row{
            @include grid(
                repeat(auto-fill, minmax(var(--img-w), 1fr)),
                var(--img-gap)
            );
            position: absolute;
            width: 100%;
            opacity: 0;
        }

        &__photo{
            position: absolute;
            @include transition-bounce;
            will-change: top, left, width;
        }

        &__content{
            position: absolute;
            width: 100%;
        }

        &__spacer{
            @include transition-bounce;
            will-change: height;
        }

        &__drop{
            :deep(.icon){
                @include transition-bounce;
            }
        }

        &__total{
            margin: 2.4rem 0;
            --padding: 0;
            --background: transparent;
        }

        &__buttons{
            @include grid(1fr 1fr, .8rem);

            .button{
                width: 100%;
            }
        }

        &--state-0{
            .order-item-product{
                opacity: 0;

                &__content{
                    scale: .5;
                }
            }
        }

        &--open{
            .order-item__drop{
                :deep(.icon){
                    transform: rotate(180deg);
                }
            }
        }
    }

    .order-item-top{
        @include flex-jtf;
        margin-bottom: 2.4rem;

        &__title-wr{
            @include flex-col;
            justify-content: center;
            gap: .2rem;
        }

        &__title{
            @include font-p2;
            font-weight: 600;
        }

        &__date{
            color: var(--c-text-secondary);

            span{
                color: var(--c-text-default);
                font-weight: 500;
            }
        }

        &__status-wr{
            display: flex;
            gap: .8rem;
        }
    }

    @include mob-display(700px);

    @include mobile(700px){
        .order-item{
            --img-w: 6.4rem;
            --img-gap: .6rem;

            --padding: 1.6rem;

            &__drop{
                width: 100%;
                margin-top: 2.4rem;
            }

            &__buttons{
                @include grid(1fr, .8rem);
            }
        }

        .order-item-top{
            &__title{
                @include font-p3;
                font-weight: 500;
            }

            &__date{
                @include font-p4;
                span{
                    font-weight: 400;
                }
            }
        }
    }
</style>