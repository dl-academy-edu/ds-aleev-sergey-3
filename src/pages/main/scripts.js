// кнопки закрытия модалок
let buttonClose = document.querySelectorAll('.modal-close')

// модалки header`а

let modalMobileMenu = document.querySelector('.mobile-menu')
let buttonMobileHeader = document.querySelector('.js-header-menu')

let modalSignIn = document.querySelector('.modal-sign-in')
let buttonSignIn = document.querySelectorAll('.button-js-signIn')
const loginForm = document.querySelector('.js-login-form')
const loginSubmit = document.querySelector('.js-login-submit')

let modalRegister = document.querySelector('.modal-register')
let buttonRegister = document.querySelectorAll('.button-js-register')
const registerForm = document.querySelector('.js-register')
const registerSubmit = document.querySelector('.js-register-submit')

let profileLink = document.querySelectorAll('.js-profile-link')

// модалки footer`а

let modalSendMessage = document.querySelector('.modal-send-message')
let buttonSendMessage = document.querySelector('.button-js-send-message')
const sendMessageForm = document.querySelector('.js-send-message')
const sendMessageSubmit = document.querySelector('.js-send-message-submit')

// открытие и закрытие модалок

function toggleModal(popup) {
    popup.classList.toggle('modal-open')
}
function openModal(button, popup, index) {
    button.addEventListener('click', () => {
        toggleModal(popup)
    })
    
    buttonClose[index].addEventListener('click', () => {
        console.log(buttonClose[index])
        popup.classList.remove('modal-open')
    })
}

// открытие и закрытие модалок header`а

openModal(buttonMobileHeader, modalMobileMenu, 0)

buttonSignIn.forEach(el => {
    openModal(el, modalSignIn, 1)
})
buttonRegister.forEach(el => {
    openModal(el, modalRegister, 2)
})
// открытие модалок footer`а

openModal(buttonSendMessage, modalSendMessage, 3)

// ререндер ссылок, если авторизован

function rerenderLinks() {
    if (localStorage.getItem('token')) {
        buttonSignIn.forEach(el => {
            el.classList.add('hidden')
        })
        buttonRegister.forEach(el => {
            el.classList.add('hidden')
        })
        profileLink.forEach(el => {
            el.classList.remove('hidden')
        })
    } else {
        buttonSignIn.forEach(el => {
            el.classList.remove('hidden')
        })
        buttonRegister.forEach(el => {
            el.classList.remove('hidden')
        })
        profileLink.forEach(el => {
            el.classList.add('hidden')
        })
    }
}
rerenderLinks()

// блок валидации

function delError(caption, form) {
    let input = form.querySelectorAll('.custom-input_bad')
    console.log(input)
    input.forEach(el => {
        el.classList.remove('custom-input_bad')
    })
    caption.forEach(el => {
        el.remove()
    })
}

function errorReq(input) {
    input.insertAdjacentHTML('afterend', '<p class="input-caption input-caption_bad">This field is required</p>')
}
function validateReq(form) {
    let error = 0
    let inputsReq = form.querySelectorAll('.required')
    if (inputsReq) {
        for (let i = 0; i < inputsReq.length; i++) {
            const input = inputsReq[i]
            if (input.value === '') {
                input.classList.add('custom-input_bad')
                errorReq(input)
                error++
            }
        }
        return error
    } else { return error } 
}
function emailValidation (form) {
    let error = 0
    let input = form.querySelectorAll('.email')
    if (input) {
        input.forEach(el => {
            if (el.value !== '') {
            function validateEmail(email) {
                const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
                return re.test(String(email.value).toLowerCase());
                
            }
            let errorEmail = validateEmail(el)
            console.log(errorEmail)
            if (errorEmail === false) {
                console.log(el)
                el.classList.add('custom-input_bad')
                el.insertAdjacentHTML('afterend', '<p class="input-caption input-caption_bad">Please enter a valid email address (your entry is not in the format "somebody@example.com")</p>')
                error++
            }
            }
        })
    }
    return error
}
function ageValidation (form) {
    let error = 0
    let input = form.querySelector('.age')
    if (input.value !== '') {
        if (input.value < 20) {
            input.classList.add('custom-input_bad')
            input.insertAdjacentHTML('afterend', '<p class="input-caption input-caption_bad">Your age is under 20</p>')
            error++
        }
    }
    return error
}



// функция отправки запроса

const pathToCreate = 'https://academy.directlinedev.com/api/users'
const basePath = 'https://academy.directlinedev.com/api'

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

// модалка логина

function loginData () {
    let data = {}
    data.email = loginForm.emailLog.value
    data.password = loginForm.passwordLog.value
    return data
}
function loginValidate(form) {
    let errorReq = validateReq(form)
    let errorEmail = emailValidation (form)
    let errors = errorReq + errorEmail
    return errors
}
let popupLogin = document.querySelector('.modal-sign-in .modal-popup')

function login(e) {
    e.preventDefault()
    let data = loginData()
    let caption = loginForm.querySelectorAll('.input-caption_bad')
    delError(caption, loginForm)
    let error = 0
    error = loginValidate(loginForm)
    console.log(error)
    if (error === 0) {
        sendRequest(pathToCreate + '/login', 'POST', data)
        .then(res => res.json())
        .then(res => {
            if (res.success) {
                loginForm.classList.add('closed')
                popupLogin.insertAdjacentHTML('afterbegin', '<p class="modal-caption modal-caption_good">Form has been sent successfully</p>')
                modalSignIn.querySelector('.modal-close').classList.add('modal-close_caption')

                if (window.matchMedia("(max-width: 680px)").matches) {
                    popupLogin.style.height = '100vh'
                }
                
                let caption = modalSignIn.querySelector('.modal-caption')
                modalSignIn.querySelector('.modal-close').addEventListener('click', function () {
                if (caption) {
                    caption.remove()
                    loginForm.classList.remove('closed')
                }

                localStorage.setItem('token', res.data.token)
                localStorage.setItem('id', res.data.userId)
                rerenderLinks()
            })
            } else {
                    throw res

                }
        })
        .catch(err => {
        console.error(err)
            })
    }
}
loginForm.addEventListener('submit', login)

// модалка регистрации

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
function registerValidate(form) {
    let errorReq = validateReq(form)
    let errorEmail = emailValidation (form)
    let ageError = ageValidation (form)
    let errors = errorReq + errorEmail + ageError
    return errors
}

function register(e) {
    e.preventDefault()
    let data = registerData()
    let error = 0
    let caption = registerForm.querySelectorAll('.input-caption_bad')
    delError(caption, registerForm)
    error = registerValidate(registerForm)
    if (error === 0) {
        sendRequest(pathToCreate, 'POST', data)
        .then(res => res.json())
        .then(res => {
            if (res.success) {
                modalClose.classList.remove('modal-open')
                modalRegister.classList.remove('modal-open')
            } else {

            }
        })
    } 
}

registerForm.addEventListener('submit', register)

// модалка отправки почты

function sendMessageData () {
    let data = {}
    data.name = sendMessageForm.nameMessage.value
    data.subject = sendMessageForm.subjectMessage.value
    data.email = sendMessageForm.emailMessage.value
    data.phone = sendMessageForm.phoneMessage.value
    data.text = sendMessageForm.textMessage.value
    return data
}
function sendMessageValidate(form) {
    let errorReq = validateReq(form)
    let errorEmail = emailValidation (form)
    let errors = errorReq + errorEmail
    return errors
}

function sendMessage(e) {
    e.preventDefault()
    let dataMessage = sendMessageData()
    console.log(dataMessage)
    let data = {
        to: 'serg.aleev@yandex.ru',
        body: JSON.stringify(dataMessage)
    }
    console.log(data)
    let caption = sendMessageForm.querySelectorAll('.input-caption_bad')
    delError(caption, sendMessageForm)
    let error = 0
    error = sendMessageValidate(sendMessageForm)
    console.log(error)
    if (error === 0) {
        sendRequest(basePath + '/emails', 'POST', data)
        .then(res => res.json())
        .then(res => {
            if (res.success) {
                console.log('success')
            } else {

            }
        })
    } 
}
sendMessageForm.addEventListener('submit', sendMessage)

// слайдер

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

// прокрутка страницы при нажатии на соответсвующую кнопку

window.addEventListener('scroll', function() {
    let scrollButton = document.querySelector('.btn-scroll-up')
    let scrollBreakPoint = 1200
    if (window.pageYOffset >= scrollBreakPoint) {
        scrollButton.classList.add('scroll-show')
        if (scrollButton.classList.contains('scroll-show')) {
            console.log(2)
            scrollButton.addEventListener('click', () => {
                window.scrollBy({
                    top: -(window.pageYOffset),
                    behavior: 'smooth'
                });
            })
        }
    } else {
        scrollButton.classList.remove('scroll-show')
    }
  });
