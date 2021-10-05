let buttonSignIn = document.querySelector('.button-js-signIn')
let buttonRegister = document.querySelector('.button-js-register')
let profileLink = document.querySelector('.js-profile-link')

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
rerenderLinks()
let basePath = 'https://academy.directlinedev.com'
let baseUrl = 'https://academy.directlinedev.com/api/users'

function sendRequest (url, method, body=null) {
    let options = {
        method: method,
        headers: {
            'Content-Type': 'application/json;charset=utf-8'
        },
        body: body
    }
    return fetch(url, options)
}

let userName = document.querySelector('.profile-data_name')
let userSurname = document.querySelector('.profile-data_surname')
let userEmail  = document.querySelector('.profile-data_email')
let userPassword = document.querySelector('.profile-data_password')
let userLocation = document.querySelector('.profile-data_location')
let userAge = document.querySelector('.profile-data_age')
let userPic = document.querySelector('.user-picture')

function putData(data) {
    userName.innerText = data.name
    userSurname.innerText = data.surname
    userEmail.innerText = data.email
    userPassword.innerText = '**********'
    userLocation.innerText = data.location
    userAge.innerText = data.age
    userPic.setAttribute('src',basePath + data.photoUrl)
}

sendRequest(baseUrl + `/${localStorage.getItem('id')}`, 'GET')
    .then(res => res.json())
    .then(res => {
        if(res.success) {
            console.log(res.data)
            putData(res.data)
        }
    })


