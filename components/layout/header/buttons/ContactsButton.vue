<template>
    <div class="contacts-button">
        <Dropdown 
            direction="right"
            :mode="mode"
            @called="handleCalled"
        >
            <template #caller>
                <Button
                    class="contacts-button__button"
                    :type="type"
                    :icon-left="(!mode || mode == 'click') && called ? IconCloseLine : IconMapPinLine"
                />
            </template>
            <template #default>
                <DropdownItem
                    :to="`tel:88003029418`"
                    :icon="IconPhoneLine"
                >
                    8 (800) 302-94-18 <br/>
                    <span class="subtext">
                        По будням с 9:00 до 17:30
                    </span>
                </DropdownItem>
                <DropdownItem
                    :to="'mailto:info@rostools.ru'"
                    :icon="IconMailLine"
                >
                    info@rostools.ru
                </DropdownItem>

                <DropdownItem
                    :to="`https://yandex.ru/maps/?whatshere[point]=${30.165831},${59.594617}&whatshere[zoom]=18`"
                    :icon="IconMapPinLine"
                    target="_blank"
                >
                    Ленинградская область, м.р-н Гатчинский, с.п. Веревское, тер. Ивановка 2, дом 6А
                </DropdownItem>
                <DropdownItem
                    v-for="i in useRegions().list"
                    :to="`https://yandex.ru/maps/?whatshere[point]=${i.addresses?.[0]?.lon},${i.addresses?.[0]?.lat}&whatshere[zoom]=18`"
                    :icon="IconMapPinLine"
                    target="_blank"
                >
                    {{ i.addresses?.[0]?.address }}
                </DropdownItem>
                
                <DropdownItem
                    :icon="IconFileList3Line"
                >
                    ООО "ИНСТРУМЕНТАЛЬНАЯ СИСТЕМА ПТК" <br/>
                    ИНН 7842139084 <br/>
                    КПП 784201001 <br/>
                    ОГРН 1177847253198
                </DropdownItem>
                <Button
                    type="accent"
                    @click="useModals().consultation.call()"
                >
                    Заказать звонок
                </Button>
            </template>
        </Dropdown>
    </div>
</template>

<script setup>
    import { IconPhoneLine, IconMailLine, IconMapPinLine, IconClockLine, IconFileList3Line, IconCloseLine } from '#components';

    const props = defineProps({
        type: String,
        mode: String
    });

    const emit = defineEmits(['called']);

    const called = ref(false);
    const handleCalled = (value)=>{ 
        called.value = value; 
        emit('called', value);
    }
    
</script>

<style lang="scss" scoped>
    .contacts-button{
        :deep(){
            .dropdown{
                --w: 44rem;
                &__container{
                    .button{
                        width: 100%;
                        position: sticky;
                        bottom: 0;
                    }
                }
            }
        }

        .subtext{
            @include font-p4;
            opacity: .6;
        }
    }
</style>