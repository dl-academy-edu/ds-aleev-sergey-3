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

// модалки профиля

let buttonChangePassword = document.querySelector('.js-btn-change-password')
let buttonChangeData = document.querySelector('.js-btn-change-other-data')
let buttonDeleteAccount = document.querySelector('.js-btn-delete-account')

let modalChangePassword = document.querySelector('.modal-change-password')
let formChangePassword = document.querySelector('.form-change-password')
let popupChangePassword = document.querySelector('.modal-change-password .modal-popup')

let modalChangeOtherData = document.querySelector('.modal-change-other-data')
let formChangeOtherData = document.querySelector('.form-change-other-data')
let popupChangeData = document.querySelector('.modal-change-other-data .modal-popup')


// открытие и закрытие модалок

function toggleModal(popup) {
    popup.classList.toggle('modal-open')
}
function openModal(button, popup, index) {
    button.addEventListener('click', () => {
        toggleModal(popup)
    })
    console.log(buttonClose)
    buttonClose[index].addEventListener('click', () => {
        toggleModal(popup)
    })
}

// открытие модалок header`а

openModal(buttonMobileHeader, modalMobileMenu, 0)

buttonSignIn.forEach(button => {
    openModal(button, modalSignIn, 1)
})
buttonRegister.forEach(button => {
    openModal(button, modalRegister, 2)
})

// открытие модалок профиля

openModal(buttonChangePassword, modalChangePassword, 3)
openModal(buttonChangeData, modalChangeOtherData, 4)

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

function delError(caption) {
    let input = formChangePassword.querySelectorAll('.custom-input_bad')
    console.log(input)
    input.forEach(el => {
        el.classList.remove('custom-input_bad')
    })
    caption.forEach(el => {
        el.remove()
    })
}

function errorReq(input) {
    input.classList.add('custom-input_bad')
    input.insertAdjacentHTML('afterend', '<p class="input-caption input-caption_bad">This field is required</p>')
}
function validateReq(form) {
    let error = 0
    let inputsReq = form.querySelectorAll('.required')
    if (inputsReq) {
        inputsReq.forEach(input => {
            if (input.value === '') {
                errorReq(input)
                error++
            }
        })
        return error
    }  
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
    if (input) {
        if (input.value !== '') {
            if (input.value < 20) {
                input.classList.add('custom-input_bad')
                input.insertAdjacentHTML('afterend', '<p class="input-caption input-caption_bad">Your age is under 20</p>')
                error++
                return error
            }
        }
    } else { return error }

}
function isCorrect() {
    let error = 0
    if (formChangePassword.changePasswordNew.value !== formChangePassword.changePasswordRepeat.value) {
        error++
        let inputs = formChangePassword.querySelectorAll('.password')
        inputs.forEach(el => {
            el.classList.add('custom-input_bad')
            el.insertAdjacentHTML('afterend', '<p class="input-caption input-caption_bad">The passwords entered do not match</p>')
        })
    return error
    } else {
        return error
    }
}

//элементы данных профиля
let userName = document.querySelector('.profile-data_name')
let userSurname = document.querySelector('.profile-data_surname')
let userEmail  = document.querySelector('.profile-data_email')
let userPassword = document.querySelector('.profile-data_password')
let userLocation = document.querySelector('.profile-data_location')
let userAge = document.querySelector('.profile-data_age')
let userPic = document.querySelector('.user-picture')


// функции отправки запросов

let basePath = 'https://academy.directlinedev.com'
let baseUrl = 'https://academy.directlinedev.com/api/users'


function sendRequest (url, method, body=null) {
    let options = {
        method: method,
        headers: {
            'Content-Type': 'application/json;charset=utf-8',
            'x-access-token': localStorage.getItem('token')
        },
        body: JSON.stringify(body)
    }
    console.log(options)
    return fetch(url, options)
}

// выставление данных профиля

function putData(data) {
    userName.innerText = data.name
    userSurname.innerText = data.surname
    userEmail.innerText = data.email
    userPassword.innerText = '**********'
    userLocation.innerText = data.location
    userAge.innerText = data.age
    userPic.setAttribute('src', basePath + data.photoUrl)
}

function sendRequestG (url, method, body=null) {
    let options = {
        method: method,
        headers: {
            'Content-Type': 'application/json;charset=utf-8',
            'x-access-token': localStorage.getItem('token')
        },
        body: body
    }
    return fetch(url, options)
}
sendRequestG(baseUrl + `/${localStorage.getItem('id')}`, 'GET')
    .then(res => res.json())
    .then(res => {
        if(res.success) {
            console.log(res.data)
            putData(res.data)
        }
    })
    .catch(err => {
        console.error(err)
    })




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

// Password editing

function changeDataPassword() {
    let data = {}
    data.oldPassword = formChangePassword.changePasswordOld.value
    data.newPassword = formChangePassword.changePasswordNew.value
    return data
}
function passwordValidation() {
    let reqError = validateReq(formChangePassword)
    let passwordError = isCorrect()
    let errors = passwordError + reqError
    return errors
}

function changePassword(e) {
    e.preventDefault()
    let data = changeDataPassword()
    let caption = document.querySelectorAll('.input-caption_bad')
    delError(caption)
    let error = 0
    error = passwordValidation()

    if (error === 0) {
    sendRequest(basePath + '/api/users', 'PUT', data)
    .then(res => res.json())
    .then(res => {
        if(res.success) {
            formChangePassword.classList.add('closed')
            popupChangePassword.insertAdjacentHTML('afterbegin', '<p class="modal-caption modal-caption_good">Form has been sent successfully</p>')
            let caption = popupChangePassword.querySelector('.modal-caption')
            if (window.matchMedia("(max-width: 680px)").matches) {
                popupChangePassword.style.height = '100vh'
              }
            modalChangePassword.querySelector('.modal-close').classList.add('modal-close_caption')
            modalChangePassword.querySelector('.modal-close').addEventListener('click', function () {
                if (caption) {
                    caption.remove()
                    formChangePassword.classList.remove('closed')
                }
            })
        } else {
            formChangePassword.classList.add('closed')
            popupChangePassword.insertAdjacentHTML('afterbegin', '<p class="modal-caption modal-caption_bad">The form was sent but the server transmits an error: “The form was sent but the server transmits an error”</p>')
            let caption = modalChangePassword.querySelector('.modal-caption')
            if (window.matchMedia("(max-width: 680px)").matches) {
                popupChangePassword.style.height = '100vh'
              }
            modalChangePassword.querySelector('.modal-close').classList.add('modal-close_caption')
            console.log(caption)
            modalChangePassword.querySelector('.modal-close').addEventListener('click', function () {
                if (caption) {
                    caption.remove()
                    formChangePassword.classList.remove('closed')
                }
            })
            throw res
        }
    })
    .catch(err => {

    })
    }
}

formChangePassword.addEventListener('submit', changePassword)

//Account data editing


function changeData () {
    let data = {}
    data.email = formChangeOtherData.changeEmail.value
    data.name = formChangeOtherData.changeName.value
    data.surName = formChangeOtherData.changeSurname.value
    data.location =  formChangeOtherData.changeLocation.value
    data.age =  +formChangeOtherData.changeAge.value
    data.avatar = formChangeOtherData.changePic.files[0]
    return data
}
function changeDataValidation(form) {
    let errorEmail = emailValidation(form)
    let errorAge = ageValidation(form)
    let errors = errorEmail + errorAge
    return errors
}

function changeOtherData(e) {
    e.preventDefault()

    let data = changeData()

    let caption = document.querySelectorAll('.input-caption_bad')
    delError(caption)

    let error = 0
    error = changeDataValidation(formChangeOtherData)

    if (error === 0) {
    sendRequest(basePath + '/api/users', 'PUT', data)
    .then(res => res.json())
    .then(res => {
        if(res.success) {
            formChangeOtherData.classList.add('closed')
            popupChangeData.insertAdjacentHTML('afterbegin', '<p class="modal-caption modal-caption_good">Form has been sent successfully</p>')
            let caption = modalChangeOtherData.querySelector('.modal-caption')
            if (window.matchMedia("(max-width: 680px)").matches) {
                popupChangeData.style.height = '100vh'
              }
            modalChangeOtherData.querySelector('.modal-close').classList.add('modal-close_caption')
            modalChangeOtherData.querySelector('.modal-close').addEventListener('click', function () {
                if (caption) {
                    caption.remove()
                    formChangeOtherData.classList.remove('closed')
                }
            })
        } else {
            formChangeOtherData.classList.add('closed')
            popupChangeData.insertAdjacentHTML('afterbegin', '<p class="modal-caption modal-caption_bad">The form was sent but the server transmits an error: “The form was sent but the server transmits an error”</p>')
            let caption = modalChangeOtherData.querySelector('.modal-caption')
            if (window.matchMedia("(max-width: 680px)").matches) {
                popupChangeData.style.height = '100vh'
              }
            modalChangeOtherData.querySelector('.modal-close').classList.add('modal-close_caption')
            console.log(caption)
            modalChangeOtherData.querySelector('.modal-close').addEventListener('click', function () {
                if (caption) {
                    caption.remove()
                    formChangeOtherData.classList.remove('closed')
                }
            })
            throw res
        }
    })
    .catch(err => {
    })
    }   
}

formChangeOtherData.addEventListener('submit', changeOtherData)

// Deleting account

function deleteAccount(e) {
    e.preventDefault()
    sendRequestG(basePath + `/api/users/${localStorage.getItem('id')}`, 'DELETE')
}

buttonDeleteAccount.addEventListener('click', deleteAccount)

// input type file

let inputGetFile = formChangeOtherData.changePic
let labelGetFile = document.querySelector('.js-label-file-input')
let dropZone = document.querySelector('.custom-file-input-label__file-name')
let file
inputGetFile.addEventListener('change', e => {
    file = inputGetFile.files[0]
    console.log(file.name)
    dropZone.innerText = file.name
})
