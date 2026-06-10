<template>
    <div class="partners content-wrapper">
        <SectionTitle class="partners__title" bullit="Партнеры">
            Компании, которые доверяют REALREZ
        </SectionTitle>

        <div class="partners__grid">
            <Card v-for="i in images" class="partners__block">
                <img 
                    :src="i.src" 
                    alt=""
                    :style="{
                        width: `${i.w}rem`,
                        ...i.style
                    }"
                />
            </Card>
        </div>
    </div>
</template>

<script setup>
    import img0 from "@/components/about/data/partners/0.svg?url";
    import img1 from "@/components/about/data/partners/1.png";
    import img2 from "@/components/about/data/partners/2.png";
    import img3 from "@/components/about/data/partners/3.svg?url";
    import img4 from "@/components/about/data/partners/4.png";
    import img5 from "@/components/about/data/partners/5.svg?url";

    const images = [
        {
            src: img0,
            w: 16.5
        },
        {
            src: img1,
            w: 7.4
        },
        {
            src: img2,
            w: 20.9
        },
        {
            src: img3,
            w: 6.7
        },
        {
            src: img4,
            w: 18.9,
            style: {'mix-blend-mode': 'darken'}
        },
        {
            src: img5,
            w: 18.7
        },
    ];
</script>

<style lang="scss" scoped>
    .partners{
        &__title{
            margin-bottom: 6.4rem;
        }

        &__grid{
            @include grid(repeat(3, 1fr), 2rem);
        }

        &__block{
            @include flex-c;
            height: 32rem;

            img{
                position: absolute
            }
        }

        @include mobile(800px){
            &__grid{
                @include grid(repeat(2, 1fr), 2rem);
            }
        }

        @include mobile(580px){
            &__grid{
                gap: .8rem; 
            }

            &__block{
                height: 17.1rem;

                img{
                    scale: 0.65;
                }
            }
        }

    }
</style>