<template>
    <!-- notdone [API] -->
    <div class="category-comparison-item">
        <ProdCardTitle :="{info}" />
        <ProdCardPrice :="{info}" />
        <div ref="mediaRef" class="category-comparison-item__image">
            <ParallaxWrapper z-shift="100">
                <Image 
                    :src="tempImg"
                    :ratio="1"
                />
            </ParallaxWrapper>
        </div>

        <div class="category-comparison-item__stats">
            <div v-for="i in stats" :key="i.title" class="category-comparison-item__stat">
                <p class="category-comparison-item__stat-value">
                    {{ i.value }}
                </p>
                <p class="category-comparison-item__stat-title">
                    {{ i.title }}
                </p>
            </div>
        </div>

        <!-- notdone [API] -->
        <a :href="`/product/${info?.name}`" @click="handleTransition">
            <Button>Подробнее</Button>
        </a>
    </div>
</template>

<script setup>
    import tempImg from './temp/img.png'

    const props = defineProps({
        info: Object
    });

    const stats = ref([
        { title: 'Мощность', value: '1500 Вт' },
        { title: 'Потребляемая мощность', value: '3.2 кВт' },
        { title: 'Толщина обработки (нерж. сталь)', value: '5 мм' },
    ])

//transition
    const mediaRef = ref();

    const handleTransition = (e) => {
        if (e.ctrlKey || e.metaKey || e.shiftKey || e.altKey || e.button !== 0)return;
        e.preventDefault();

        const {x,y,width,height} = mediaRef.value.getBoundingClientRect();
        useProdTransition().transit(props.info,x,y,width,height);
    }
</script>

<style lang="scss" scoped>
    .category-comparison-item{
        padding: 3.2rem;
        background: var(--c-surface-neutral-secondary);
        border-radius: 1.2rem;
        overflow: hidden;
        text-align: center;

        .prod-card-title{
            margin-bottom: .8rem;
            @include font-h4;
        }

        &__image{
            transform: scale(1.5) translateY(-15%);
            pointer-events: none;
        }

        &__stat{
            padding: 2.4rem;

            &:not(:last-child){
                border-bottom: .1rem solid var(--c-border-neutral-main);
            }
        }

        &__stat-value{
            @include font-h2;
            margin-bottom: 1.2rem;
        }

        .button{
            width: 100%;
        }
    }
</style>