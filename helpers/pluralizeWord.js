export default ( // pluralizeWord // Возвращает склонение слова в зависимости от числа
    words, //[1, 2, 5] -> [Предмет, Предмета, Предметов]
    num
)=>{
    num %= 100;

    if(num > 10 && num <= 14)num = 0;

    num %= 10;

    return words[
        num == 1?
            0:
        num >= 2 && num <= 4?
            1:
            2
    ]
}