let buttonSignIn = document.querySelector('.button-js-signIn')
let modalSignIn = document.querySelector('.modal-popup')
let buttonClose = document.querySelector('.modal-close')
let input = modalSignIn.querySelector('input')

buttonSignIn.addEventListener('click', function() {
 modalSignIn.classList.add('modal-open')
})

buttonClose.addEventListener('click', function() {
    modalSignIn.classList.remove('modal-open')
})


let buttonSubmit = document.querySelectorAll('.modal-content__button')

buttonSubmit.addEventListener('click', function(e) {
    e.preventDefault()
})