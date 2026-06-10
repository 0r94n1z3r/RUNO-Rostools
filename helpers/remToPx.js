// remToPx
export const remToPx = (rem)=>{
    if(!import.meta.client)return rem*10;
    return rem * parseFloat(getComputedStyle(document.documentElement).fontSize);
}

export const pxToRem = (px) => {
    if (!import.meta.client) return px / 10;
    return px / parseFloat(getComputedStyle(document.documentElement).fontSize);
}