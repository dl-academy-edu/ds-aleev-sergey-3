let Number1 = +prompt('Введите число для первого задания');
while (isNaN(Number1) === true) {
    Number1 = +prompt('ошибка, введите число');
}
for (let i = 1; i <= Number1; i++) {

    if (i % 4 !== 0) {
        console.log(i);
    }
}
let fResult = 1;
let fNumber = +prompt('Введите число для получения факториала');
while (isNaN(fNumber) === true) {
    fNumber = +prompt('ошибка, введите число');
}
let i = fNumber
while (i > 0) {
       fResult*= i;
       i--;
              if (i === 0) {
            console.log(`Факториал ${fNumber} равен ${fResult}`);
        }
};
let sNumber;
let toCheck = prompt('aВведите число для возведения в степень');

while (isNaN(sNumber) === true) {
    if(Boolean(toCheck)){
        sNumber = +toCheck
         if (isNaN(sNumber) === true) {
            toCheck = prompt('ошибка, введите число');
         }
         
        } else {
            while (Boolean(toCheck) === false) {
                toCheck = prompt('ошибка. Введите число для возведения в степень');
            }
        
        }
}
let s
let toCheck2 = prompt('Введите степень')
while (isNaN(s) === true) {
    if(Boolean(toCheck2)){
        s = +toCheck2
         if (isNaN(s) === true) {
            toCheck2 = prompt('ошибка, введите степень');
         }
         
        } else {
            while (Boolean(toCheck2) === false) {
                toCheck2 = prompt('ошибка. Введите степень');
            }
        
        }
}
let k = sNumber;
let abs
let isAbs
 if (s < 0) {
    abs = Math.abs(s);
    isAbs = true;
    console.log(abs, isAbs);
}

for (let i = 0; i <= s || abs; i++) {
   
    if (s === 0) {
        sNumber = 1
        console.log(`${k} в степени 0 равно ${sNumber}`); break
    }
    if (s === 1) {
        console.log(`${k} в степени 1 равно ${sNumber}`); break
    }
    if (isAbs === true) {
        k = abs
    }
    sNumber *= k;
    if (i === abs-2 && isAbs === true) {
        console.log(`${k} в степени ${s} равно 1/${sNumber}`); break
    }
    if (i === s-2) {
        console.log(`${k} в степени ${s} равно ${sNumber}`); break
    }
};

let rand = Math.floor(1+Math.random()*10)
let nRand;
while (false) {
    nRand = prompt('Угадайте число')
    if (rand == nRand) {
        console.log('Вы великолепны'); break
    }
}

    
    