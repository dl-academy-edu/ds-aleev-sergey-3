// Циклы и условия

// let Number1 = +prompt('Введите число для первого задания');
// while (isNaN(Number1) === true) {
//     Number1 = +prompt('ошибка, введите число');
// }
// for (let i = 1; i <= Number1; i++) {

//     if (i % 4 !== 0) {
//         console.log(i);
//     }
// }
// let fResult = 1;
// let fNumber = +prompt('Введите число для получения факториала');
// while (isNaN(fNumber) === true) {
//     fNumber = +prompt('ошибка, введите число');
// }
// let i = fNumber
// while (i > 0) {
//        fResult*= i;
//        i--;
//               if (i === 0) {
//             console.log(`Факториал ${fNumber} равен ${fResult}`);
//         }
// };
// let sNumber;
// let toCheck = prompt('aВведите число для возведения в степень');

// while (isNaN(sNumber) === true) {
//     if(Boolean(toCheck)){
//         sNumber = +toCheck
//          if (isNaN(sNumber) === true) {
//             toCheck = prompt('ошибка, введите число');
//          }
         
//         } else {
//             while (Boolean(toCheck) === false) {
//                 toCheck = prompt('ошибка. Введите число для возведения в степень');
//             }
        
//         }
// }
// let s
// let toCheck2 = prompt('Введите степень')
// while (isNaN(s) === true) {
//     if(Boolean(toCheck2)){
//         s = +toCheck2
//          if (isNaN(s) === true) {
//             toCheck2 = prompt('ошибка, введите степень');
//          }
         
//         } else {
//             while (Boolean(toCheck2) === false) {
//                 toCheck2 = prompt('ошибка. Введите степень');
//             }
        
//         }
// }
// let k = sNumber;
// let abs
// let isAbs
//  if (s < 0) {
//     abs = Math.abs(s);
//     isAbs = true;
//     console.log(abs, isAbs);
// }

// for (let i = 0; i <= s || abs; i++) {
   
//     if (s === 0) {
//         sNumber = 1
//         console.log(`${k} в степени 0 равно ${sNumber}`); break
//     }
//     if (s === 1) {
//         console.log(`${k} в степени 1 равно ${sNumber}`); break
//     }
//     if (isAbs === true) {
//         k = abs
//     }
//     sNumber *= k;
//     if (i === abs-2 && isAbs === true) {
//         console.log(`${k} в степени ${s} равно 1/${sNumber}`); break
//     }
//     if (i === s-2) {
//         console.log(`${k} в степени ${s} равно ${sNumber}`); break
//     }
// };

// let rand = Math.floor(1+Math.random()*10)
// let nRand;
// while (false) {
//     nRand = prompt('Угадайте число')
//     if (rand == nRand) {
//         console.log('Вы великолепны'); break
//     }
// }

// Функции

// let functionAdult = function() {
//     const age = prompt('Введите свой возраст')
//     if (+age < 18) {
//         alert('Вам меньше 18')
//         functionAdult()
//     } else {
//         alert('Вы совершеннолетний')
//     }
    
// }
// // functionAdult()


// function add(a,b) {
//     return a+b
// }
// console.log(add(6, 2))

// function subtract(a, b) {
//     return a-b
// }
// console.log(subtract(6, 2))

// function divide(a, b) {
//     return a/b
// }
// console.log(divide(6, 2))

// function multiply(a, b) {
//     return a*b
// }
// console.log(multiply(6, 2))

// // Эти функции являются чистыми потому что:
// // 1) не используют глобальный переменных или переменных из внешнего окружения
// // 2) не изменяют состояние страницы
// // 3) с одинаковыми аргументами получается одианаковый результат
// // 4) не имеют побочных эффектов

// let addCreator = function() {

// }
// function addCreator() {

// }
// const add = addCreator(5)

// console.log(add(5))

// console.log(addCreator(1)(3))

function counterCreator(step=2) { 
    let index = 0
    return function () {
        index = index + step
        return index
    }
}
let myCounter1 = counterCreator(-1)
console.log(myCounter1())
console.log(myCounter1())

let myCounter2 = counterCreator(4)
console.log(myCounter2())
console.log(myCounter2())

let myCounter3 = counterCreator()
console.log(myCounter3())
console.log(myCounter3())