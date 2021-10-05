let buttonSignIn = document.querySelector('.button-js-signIn')
let buttonRegister = document.querySelector('.button-js-register')
let buttonSendMessage = document.querySelector('.button-js-send-message')
let modalOpen = document.querySelector('.modal-popup')
let modalSignIn = document.querySelector('.modal-sign-in')
let modalRegister = document.querySelector('.modal-register')
let modalSendMessage = document.querySelector('.modal-send-message')
let buttonClose = document.querySelectorAll('.modal-close')
let modalClose = document.querySelector('.modal-background')
let input = modalSignIn.querySelector('input')

let profileLink = document.querySelector('.js-profile-link')

rerenderLinks()

buttonSignIn.addEventListener('click', function() {
 modalClose.classList.add('modal-open')
 modalSignIn.classList.add('modal-open')
})
buttonRegister.addEventListener('click', function() {
    modalClose.classList.add('modal-open')
    modalRegister.classList.add('modal-open')
})
buttonSendMessage.addEventListener('click', function() {
    modalClose.classList.add('modal-open')
    modalSendMessage.classList.add('modal-open')
})
buttonClose[0].addEventListener('click', function() {
    modalClose.classList.remove('modal-open')
    modalSignIn.classList.remove('modal-open')
})
buttonClose[1].addEventListener('click', function() {
    modalClose.classList.remove('modal-open')
    modalRegister.classList.remove('modal-open')
})
buttonClose[2].addEventListener('click', function() {
    modalClose.classList.remove('modal-open')
    modalSendMessage.classList.remove('modal-open')
})
let buttonSubmit = document.querySelectorAll('.modal-content__button');




let sliderWindow = document.querySelector('.slider__wrapper')
let sliderTape = document.querySelector('.slider__pic')

let controllButton = document.querySelectorAll('.slider-button')

let slideWidth = +getComputedStyle(sliderWindow).width.split("px")[0];
let numberSlides = sliderTape.childElementCount

let sliderDots = document.querySelectorAll('.slider-radio-buttons input')


function changeToSlide () {
    sliderTape.style.transform = `translateX(${(slideNumber) * -slideWidth}px)`
}
let slideNumber = 0
changeToSlide(slideNumber = +localStorage.getItem('activeSlide'))
sliderDots[slideNumber].checked=true
controllButton[1].addEventListener('click', function(e) {
    if (slideNumber < numberSlides-1) {
        slideNumber += 1
        changeToSlide()
        sliderDots[slideNumber].checked=true
        localStorage.setItem('activeSlide', slideNumber)
        console.log(slideNumber)
    }

})
controllButton[0].addEventListener('click', function(e) {
    if (slideNumber > 0) {
        slideNumber -= 1
        changeToSlide()
        sliderDots[slideNumber].checked=true
        localStorage.setItem('activeSlide', slideNumber)
        console.log(slideNumber)
    }
})
const swiper = new Swiper('.swiper', {
    slidesPerView: 'auto',
    navigation: {
        nextEl:'.swiper-button-next',
        prevEl:'.swiper-button-prev',
    },
})
const pathToCreate = 'https://academy.directlinedev.com/api/users'



const registerForm = document.querySelector('.js-register')
const registerSubmit = document.querySelector('.js-register-submit')

const loginForm = document.querySelector('.js-login-form')
const loginSubmit = document.querySelector('.js-login-submit')

function registerData () {
    let data = {}
    data.email = registerForm.email.value
    data.location = registerForm.location.value
    data.surname = registerForm.surname.value
    data.name = registerForm.name.value
    data.password = registerForm.password.value
    data.age = registerForm.age.value
    return data
}
function loginData () {
    let data = {}
    data.email = loginForm.emailLog.value
    data.password = loginForm.passwordLog.value
    return data
}


function login(e) {
    e.preventDefault()
    let data = loginData()
    console.log(data)
    sendRequest(pathToCreate + '/login', 'POST', data)
    .then(res => res.json())
    .then(res => {
        if (res.success) {
            modalClose.classList.remove('modal-open')
            modalSignIn.classList.remove('modal-open')
            rerenderLinks()
            
            localStorage.setItem('token', res.data.token)
            localStorage.setItem('id', res.data.userId)
        } else {
            throw res
        }
    })
    .catch(err => {
        console.error(err)
    })
}
function rerenderLinks() {
    if (localStorage.getItem('token')) {
        buttonSignIn.classList.add('hidden')
        buttonRegister.classList.add('hidden')
        profileLink.classList.remove('hidden')
    } else {
        buttonSignIn.classList.remove('hidden')
        buttonRegister.classList.remove('hidden')
        profileLink.classList.add('hidden')
    }
}
function register(e) {
    e.preventDefault()
    let data = registerData()
    console.log(data)
    sendRequest(pathToCreate, 'POST', data)
    .then(res => res.json())
    .then(res => {
        if (res.success) {
            modalClose.classList.remove('modal-open')
            modalRegister.classList.remove('modal-open')
        }
    })
}



registerForm.addEventListener('submit', register)
loginForm.addEventListener('submit', login)


// let data = {
//     email:"test123@email.com",
//     location:'Togliatti',
//     surname:'Test',
//     name:'Test Name',
//     password:'123',
//     age: 20
// }

function sendRequest (url, method, body=null) {
    let options = {
        method: method,
        headers: {
            'Content-Type': 'application/json;charset=utf-8'
        },
        body: JSON.stringify(body)
    }
    console.log(options)
    return fetch(url, options)
}