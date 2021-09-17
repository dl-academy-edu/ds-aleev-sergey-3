let buttonSignIn = document.querySelector('.button-js-signIn')
let buttonRegister = document.querySelector('.button-js-register')
let buttonSendMessage = document.querySelector('.button-js-send-message')
let modalOpen = document.querySelector('.modal-popup')
let modalSignIn = document.querySelector('.modal-sign-in')
let modalRegister = document.querySelector('.modal-register')
let modalSendMessage = document.querySelector('.modal-send-message')
let buttonClose = document.querySelector('.modal-close')
let modalClose = document.querySelector('.modal-background')
let input = modalSignIn.querySelector('input')

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
buttonClose.addEventListener('click', function() {
    modalClose.classList.remove('modal-open')
    modalRegister.classList.remove('modal-open')
    modalSignIn.classList.remove('modal-open')
})

// let buttonSubmit = document.querySelectorAll('.modal-content__button');

// buttonSubmit.addEventListener('click', function(e) {
//     e.preventDefault()
// })
