let Number1 = +prompt('Введите число для первого задания');
    if (isNaN(Number1) === true) {
        console.error('ошибка, введите число')
    }
for (let i = 1; i <= Number1; i++) {
    if (i % 4 !== 0) {
        console.log(i);
    }
}
let fResult = 1;
let fNumber = +prompt('Введите число для получения факториала');
    if (isNaN(fNumber) === true) {
        console.error('ошибка, введите число')
    }
i = fNumber
while (i > 0) {
       fResult*= i;
       i--;
              if (i === 0) {
            console.log(`Факториал ${fNumber} равен ${fResult}`);
        }
};

let sNumber = +prompt('Введите число для возведения в степень');
let k = sNumber
let s = +prompt('Введите его степень');
    if (isNaN(sNumber || s) === true) {
        console.error('ошибка, введите числа')
    }
for (i = 1; i <= s; i++) {
    k *= s
    if (i === s) {
        console.log(`${sNumber} в степени ${s} равно ${k}`);
    }
};

let rand = Math.floor(1+Math.random()*10)
let nRand;
while (true) {
    nRand = prompt('Угадайте число')
    if (rand == nRand) {
        console.log('Вы великолепны'); break
    }
}

var sd = Math.floor(4.3)
console.log(sd)