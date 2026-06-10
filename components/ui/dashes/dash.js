export const DASH = {
    len: 15,
    fill: 10,
    stroke: 'rgba(255, 255, 255, 0.12)'
}

export const getDashes = (sectionLength, shiftSource=0 ) =>{
    const n = Math.floor(sectionLength / DASH.len)+1;
    const res = [];

    const gap = (DASH.len - DASH.fill) / 2;
    const shift = shiftSource % DASH.len;

    for(let i = 0; i < n; i++){
        res.push([
            i * DASH.len + gap - shift, 
            i * DASH.len + DASH.len - gap - shift
        ]);
    }

    return res;
}