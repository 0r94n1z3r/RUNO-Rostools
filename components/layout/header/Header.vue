<template>
    <div 
        id="header"
        ref="hederRef"
        class="header fixed-full-element"
        :class="[
            mobileDrop?'header--dropped':null,
            categoriesDrop?'header--categories-dropped':null,
            `header--${state}`,
            searchRef?.called? 'header--search-focused':null,
            hovered? 'header--hovered':null
        ]"
    >
        <div class="content-wrapper-out header__wrapper">
            <div class="header__container desk-visible">
                <Logo  
                    :to="'/'"
                    class="header__logo"
                />
                <Button
                    :icon-left="categoriesDrop?IconCloseLine:IconMenuFill"
                    :type="state == 'transparent'?'light':'dark'"
                    @click="categoriesDrop = !categoriesDrop"
                >
                    Каталог
                </Button>

                <SearchGlobal 
                    ref="searchRef" 
                    class="header__search"
                    :style-type="state == 'transparent'?'transparent-dark':'transparent-light'"
                />

                <Dropdown
                    title="О компании и услугах"
                    v-slot:="{close}"
                >
                    <DropdownItem
                        v-for="item in useStatic().navLinks"
                        :to="item.to"
                        @close="close"
                    >
                        {{ item.title }}
                    </DropdownItem>
                </Dropdown>

                <Dropdown
                    v-if="useRegions().list?.length"
                    :title="useRegions().current?.title"
                >
                    <DropdownItem 
                        v-for="i in useRegions().list"
                        @click="useRegions().redirect(i.subdomain)"
                    >
                        {{ i.title }} 
                    </DropdownItem>
                </Dropdown>
                
                <!-- <a 
                    v-if="useRegions().current?.addresses?.[0]?.tel"
                    class="header__tel text-link-basic"
                    :href="`tel:${useRegions().current?.addresses?.[0]?.tel}`"
                >
                    {{ useRegions().current?.addresses?.[0]?.tel }}
                </a> -->
                
                <Button 
                    class="header__tel text-link-basic"
                    type="transparent"
                    to="tel:88003029418"
                >
                    8 (800) 302-94-18
                </Button>

                <HeaderButtons
                    :="{state}"
                />
            </div>

            <div class="header__container header-mob mob-visible">
                <div class="header-mob__container">
                    <Logo 
                        :to="'/'"
                        class="header__logo"
                    />
                    
                    <div class="header-mob__buttons">
                        <Button
                            :icon-left="IconPhoneLine"
                            :type="state == 'transparent'?'transparent':'transparent-light'" 
                            to="tel:88003029418"
                        />
                        <ContactsButton 
                            :type="state == 'transparent'?'transparent':'transparent-light'" 
                            @called="hover"
                        />
                        <Button 
                            :icon-left="
                                activeLayerId > 0?
                                    IconArrowLeftLine: 
                                mobileDrop?
                                    IconCloseLine:
                                    IconMenuFill
                            "
                            :type="(state == 'transparent' || activeLayerId > 0)?'light':'dark'" 
                            @click="switchMobileDrop"
                        />
                    </div>
                </div>

                <div class="header-mob__content-wr">
                    <HeaderMobContent 
                        ref="mobContentRef"
                        v-model:active-layer-id="activeLayerId"
                        :about-list="useStatic().navLinks"
                        :state="state"
                        @close="mobileDrop = false"
                    />
                </div>
            </div>

            <CategoriesDrop :="{state}" :drop="categoriesDrop" class="desk-visible" @close="categoriesDrop = false"/>
        </div>
    </div>
</template>

<script setup>
    import { IconMenuFill, IconCloseLine, IconArrowLeftLine, IconPhoneLine } from '#components';

//state
    const hederRef = ref()
    const { theme } = useHeaderTheme(hederRef);
    const state = computed(()=> mobileDrop.value?'light':theme.value ) 

//mobile-drop
    const mobileDrop = ref();

    const mobContentRef = ref();

    const mobContentHeight = ref('0rem');

    watch(mobileDrop, (n)=>{
        activeLayerId.value = 0;
        if(n){
            mobContentHeight.value = pxToRem(mobContentRef.value.$el.offsetHeight) + 'rem';
        }
    })

    const activeLayerId = ref(0);
    const switchMobileDrop = ()=>{
        if(!mobileDrop.value){
            mobileDrop.value = true;
        }
        else if(activeLayerId.value == 0){
            mobileDrop.value = false;
        }else{
            activeLayerId.value = 0;
        }
    }

//categories-drop
    const categoriesDrop = ref();

    const handleTransition = () => {
        categoriesDrop.value = false;
        mobileDrop.value = false;
    } 

    onClickOutside(
        hederRef, 
        handleTransition
    )

    watch(()=>R().fullPath, handleTransition)

    onPageTransitionStart('heder-transition', handleTransition)

//search
    const searchRef = ref();

//called
    const hovered = ref(false);
    const hover = (value) => hovered.value = value;

</script>

<style lang="scss" scoped>
    .header{
        --color: var(--c-text-default);
        --color-secondary: var(--c-text-disabled);
        --color-disabled: var(--c-text-disabled);
        --logo-color: var(--c-text-accent);
        --border: var(--c-border-neutral-low);
        --background: var(--c-white-68);

        &--transparent{
            --color: var(--c-text-inverse);
            --color-secondary: var(--c-text-inverse);
            --color-disabled: var(--c-text-inverse-disabled);
            --logo-color: var(--c-text-inverse);
            --border: var(--c-border-neutral-low-inverse);
            --background: var(--c-surface-neutral-low-inverse);

            @include hover{
                &:hover{
                    --background: var(--c-black-14);
                    :deep(){
                        .dropdown{
                            --background: var(--c-black-14);
                        }
                    }
                }
            }

            &.header--hovered{
                --background: var(--c-black-14);
                :deep(){
                        .dropdown{
                        --background: var(--c-black-14);
                    }
                }
            }
        }

        position: fixed;
        // width: calc(100vw - var(--pad-o) * 2);
        padding-top: var(--pad-o);
        z-index: 10;
        top: 0;
        left: 0;
        right: 0;
        color: var(--color);
        transition:  width 0s all .3s;

        &__wrapper{
            position: relative;
        }

        &__container{
            padding: 1.2rem;
            display: flex;
            gap: 3.2rem;
            border-radius: 1.2rem;
            border: .1rem solid var(--border);
            background: var(--background);
            transition: .3s;
            @include shadow;

            @include blur-background;
            will-change: background, color, border-color;

            :deep(){
                .dropdown{
                    --shift: 1.8rem;

                    &__title{
                        --color: inherit;
                        --background: transparent;
                    }

                    &__container{
                        max-height: calc(var(--100vh) - var(--header-height) - var(--shift) * 2);
                    }
                }
            }
        }

        &__logo{
            width: 10.6rem;
            margin-left: 1rem;
            color: var(--logo-color);
            position: relative;
        }

        &__search{
            width: 100%;
        }

        &__dropdowns{
            display: flex;
        }

        &__tel{
            z-index: 3;
            white-space: nowrap;
            display: flex;
            align-items: center;
            // width: 14.7rem;
            flex-shrink: 0;
            overflow: hidden;
            @include transition-bounce;
            padding: 0 1.2rem;
            margin: 0 -1.2rem;
            --brd: transparent;
            --brd-hov: transparent;
            --background: transparent;
            --background-hov: var(--c-surface-neutral-med);
            font-size: inherit;
            --color: inherit;
            --color-hov: inherit;
            &::before{
                display: none;
            }
        }

        &--search-focused{
            .header__tel{
                width: 0;
                margin-left: -3.2rem;
                opacity: 0;
                padding: 0;
            }
        }

        .header-mob{
            :deep(){
                .contacts-button{
                    .dropdown{
                        position: static;
                        --shift: var(--pad-o);

                        &__container{
                            max-width: 100%;
                        }
                    }
                }
            }
        }

        @include nav-mobile{
            &__container{
                position: relative;
                @include flex-col;
                gap: 0;
                // overflow: hidden;
                max-height: calc(var(--100vh) - var(--pad-o) * 2);
            }

            .header-mob{
                &__content-wr{
                    @include transition-bounce;
                    height: 0;
                    max-height: calc(100% - 4.4rem);
                    overflow: auto;
                    max-height: calc(var(--100vh) - var(--pad-o) * 2 - 4.4rem - 1.2rem * 2);    
                    overscroll-behavior: contain;

                    --pad-x: 1.2rem;
                    margin-left: calc(-1 * var(--pad-x));
                    width: calc(100% + 2 * var(--pad-x));
                    padding: 0 var(--pad-x);

                    will-change: transform, height;
                }

                &__container{
                    display: flex;
                    height: 4.4rem;
                    width: 100%;
                }

                &__buttons{
                    display: flex;
                    gap: .8rem;
                    margin-left: auto;
                }
            }

            &:not(&--dropped){
                .header-mob{
                    &__content-wr{
                        transform: scale(0.9);
                    }
                }
            }

            &--dropped{
                .header-mob{
                    &__content-wr{
                        margin-top: 1.2rem;
                        height: calc(v-bind(mobContentHeight));
                    }
                }
            }
        }

        &:not(&--categories-dropped){
            :deep(.categories-drop){
                background: transparent;
                pointer-events: none;
                transform: translateY(-1rem);
                
                .categories-drop-frosty{
                    backdrop-filter: blur(0rem);
                }

                p, img, .button, a, .categories-drop__content{
                    opacity: 0!important;
                }

                *{
                    background: transparent !important;
                    box-shadow: none;
                    border-color: transparent;
                }
            }
        }
    }

    :deep(.categories-drop){
        position: absolute;
        width: calc(100% - 2 * var(--pad-o));
        left: var(--pad-o);
        z-index: 3;
        top: calc(100% + .8rem);
        max-height: calc(var(--100vh) - 100% - .8rem - var(--pad-o));
    }

    @include mob-display($navigation-mobile);

</style>