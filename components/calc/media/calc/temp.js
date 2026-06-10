import data from './raw.js'

export const list = [];

const fillList = () => {
    list.push(
        ...data.map(item => ({
            ...item,
            properties: item.properties.map(property => ({
                ...property,
                values: property.values.map(value => ({
                    ...value,
                    price: Math.ceil(value.price_us * useStatic()?.dollarRate?.saws_us_dollar_rate)
                }))
            }))
        }))
    )
}

export const temp = (category_id) => {
    if(!list.length) fillList();
    return list.find(item => item.category_id === category_id);
}