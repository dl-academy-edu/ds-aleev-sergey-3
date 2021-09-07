// developers - авторя ЯП
// name - имя автора
// work - род деятельности автора
const developers = [
    {
        index:0,
        name:"Брендан Эйх",
        work: "специалист в области информатики, программист, технический директор"
    },
    {
        index:2,
        name: "Джеймс Гослинг",
        work: "специалист в области информационных технологий"
    },
    {
        index:3,
        name: "Бьёрн Страуструп",
        work: "программист"
    }
]



// data - ЯП про которые должны быть рассказы
// name - название ЯП
// year - год выпуска ЯП
// filenameExtensions -расширения файлов
// influencedBy - ЯП оказавшие влияние
// affectedBy - ЯП испытавшие влияние ЯП
// developerIndex - уникальный идентификатор автора языка программирования
const data = [
    {
        name:"JavaScript",
        year: 1995,
        filenameExtensions: "js, mjs",
        influencedBy: ["AWK", "C", "HyperTalk", "Java", "Lua", "Perl", "Python", "Scheme", "Self"],
        affectedBy: ["ActionScript", "AtScript", "CoffeeScript", "Dart", "JScript .NET", "LiveScript", "Objective-J", "Opa", "QML", "Raku", "TypeScript"],
        developerIndex:0,
    },
    {
        name:"Java",
        year: 1995,
        filenameExtensions: "java, class, jar, jad, jmod",
        influencedBy: ["C++", "Си", "Ада", "Simula 67", "Smalltalk", "Objective-C", "Object Pascal", "Оберон", "Eiffel", "Модула-3", "Mesa", "Симула", "C#", "UCSD Pascal"],
        affectedBy: ["Ada 2005", "BeanShell", "C#", "Chapel", "Clojure", "ECMAScript", "Fantom", "Gambas", "Groovy", "Hack", "Haxe", "J#", "Kotlin", "PHP", "Python", "Scala", "Seed7", "Vala"],
        developerIndex: 2,
    },
    {
        name:"C++",
        year: 1983,
        filenameExtensions: "cc, cpp, cxx, c, c++, h, hpp, hh, hxx, h++",
        influencedBy: ["C++", "Си", "Ада", "Simula 67", "Smalltalk", "Objective-C", "Object Pascal", "Оберон", "Eiffel", "Модула-3", "Mesa", "Симула", "C#", "UCSD Pascal"],
        affectedBy: ["Ada", "C", "Modula-2", "Simula"],
        developerIndex: 3,
    },
];


function log() {
     for (let i = 0; i < 3; i++) {
         
function splice() {
    let toSplice = data[i].affectedBy
    if (toSplice.length > 4) {
        let spliced = toSplice.splice(4,4)
        return spliced.join(', ') + ' и другие языки программирования'
    } else {
        return toSplice.join(', ')
    }
}

    let developerIndex = data[i].developerIndex
    let foundIndex = developers.find(currentValue => currentValue.index === developerIndex)
    
    let extensions = data[i].filenameExtensions.split(', ')
    let extensionsDone = extensions.map(item => '.' + item).join(', ')
const example = `${data[i].name} - язык программирования выпущенный в ${data[i].year} году.
Автором языка стал - ${foundIndex.name}.
Файлы программ, написаных на ${data[i].name}, могут иметь разширения ${extensionsDone}.
 ${data[i].name} испытал влияние ${data[i].influencedBy.length}-ти языков программирования: ${data[i].influencedBy.join(', ')}.
${data[i].name} повлиял на ${splice()}.`
  console.log(example)
}
}
function counter() {
    let i = 10
    return function() {
        console.log(`Загрузка завершится через ${i}`)
          i--
          if (i === 0) {
              clearInterval(timerId)
          }
    }
}
console.log('Сообщение выведется через 10 секунд');

let timerId = setInterval(counter(), 1000)
setTimeout(function() {log()}, 11000)