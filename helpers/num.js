export const beautifyNumber = (num, options = {}) => {
    let symb = '';

    let isOverflow = num >= 1000;

    if(num >= 1000000000){
        num = divideAndRoundToOne(num, 1000000000)
        symb = 'b'
    }else if(num >= 1000000){
        num = divideAndRoundToOne(num, 1000000)
        symb = 'm'
    }else if(num >= 1000){
        num = divideAndRoundToOne(num, 1000)
        symb = 'k'
    }

    let str = `${num}${symb?' '+symb:''}`;

    let res = {
        num, 
        symb, 
        str, 
        isOverflow 
    };

    if(options.forEnding){
        res.forEnding = isOverflow?0:num;
    }

    return res;
}

const divideAndRoundToOne = (num, sub) => {
    return +(Math.floor((num/sub)*10)/10).toFixed(1)
}

export const splitNumber = (num, split = " ") => num?.toString().replace(/\B(?=(?:\d{3})+\b)/g, split)

export const pricify = (num) => {
    let roundedNum = Math.ceil(Number(num));
    let splitNum = splitNumber(roundedNum);
    return splitNum;
}

export const humanFileSize = (bytes, dp = 1) => {
    const thresh = 1024;

    if (Math.abs(bytes) < thresh) {
        return bytes + ' B';
    }

    const units = ['kB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'];
    let u = -1;
    const r = 10 ** dp;

    do {
        bytes /= thresh;
        ++u;
    } while (Math.round(Math.abs(bytes) * r) / r >= thresh && u < units.length - 1);


    return bytes.toFixed(dp) + ' ' + units[u];
}