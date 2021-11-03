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
        popup.classList.remove('modal-open')
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


// запуск фильтра

const formFilter = document.forms.filter
let data = {}
let params = getParamsFromLocation()
setFilterData(params)

// Получаем параметры из фильтра

function getParams(data) {

    data.tags = [...formFilter.elements.color].filter(checkbox => checkbox.checked).map(checkbox => checkbox.value)
    
    data.views = ([...formFilter.elements.views].find(radio => radio.checked) || {value:null}).value

    data.comments = [...formFilter.elements.comments].filter(checkbox => checkbox.checked).map(checkbox => checkbox.value)

    data.limit = ([...formFilter.elements.limit].find(radio => radio.checked) || {value:null}).value

    data.sort = ([...formFilter.elements.sort].find(radio => radio.checked) || {value:null}).value

    // data.searchField  = formFilter.elements.searchField.value
}
// Выставляем параметры в ссылку

function setSearchParams(data) {
    let SearchParams = new URLSearchParams()

    data.tags.forEach (item => {
        SearchParams.append('tags', item)
    })
    if (data.views) {
        SearchParams.set('views', data.views)
    }
    data.comments.forEach (item => {
        SearchParams.append('commentsCount', item)
    })
    if (data.limit) {
        SearchParams.set('limit', data.limit)
    }
    if (data.sort) {
        SearchParams.set('sort', data.sort)
    }
    // SearchParams.set('searchField', data.searchField)
    
    history.replaceState(null, document.title, "?" + SearchParams.toString())
}

// Получаем параметры инпутов из ссылки

function getParamsFromLocation() {
    let searchParams = new URLSearchParams(location.search)
    return {
        tags: searchParams.getAll('tags'),
        views: searchParams.get('views'),
        comments: searchParams.getAll('commentsCount'),
        limit: searchParams.get('limit'),
        sort: searchParams.get('sort'),
        // searchField: searchParams.get('searchField') || '',
    }
}

// подготавливаем данные к отправке на сервер
        // params.views = params.views.split('-')
        // params.views = {"between":[params.views[0],params.views[1]]}

// Выставляем данные из ссылки

function setFilterData (data) {

    formFilter.elements.color.forEach(checkbox => {
        checkbox.checked = data.tags.includes(checkbox.value)
    });
    formFilter.elements.views.forEach(radio => {
        radio.checked = data.views === radio.value
    })
    formFilter.elements.comments.forEach(checkbox => {
        checkbox.checked = data.comments.includes(checkbox.value)
    });
    formFilter.elements.limit.forEach(radio => {
        radio.checked = data.limit === radio.value
    })
    formFilter.elements.sort.forEach(radio => {
        radio.checked = data.sort === radio.value
    })
    // formFilter.elements.searchField.value = data.searchField
}


// Удаляем параметры из ссылки

formFilter.addEventListener('reset', e => {
    history.replaceState(null, document.title, window.location.pathname)
})
const postSection = document.querySelector('.blog-posts')
const baseUrl = 'https://academy.directlinedev.com/api/posts'

const paginationBox = document.querySelector('.blog-posts-pagination__page')

// функция отправки запроса

const pathToCreate = 'https://academy.directlinedev.com/api/users'
const basePath = 'https://academy.directlinedev.com/api'

function sendRequestXML({method, url, onload}) {
    const xhr = new XMLHttpRequest()
    xhr.open(method, url)
    xhr.send()
    xhr.onload = onload
}
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




// получение начальных постов

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

sendRequestXML({
    method: 'GET',
    url: baseUrl + '?limit=999',
    onload: function getPosts (serverData) {

            if (serverData.target.status === 200) {
                const posts = JSON.parse(serverData.target.response);
                // console.log(posts.data)
                let maxPosts = 5
                createPage(posts.data.length, maxPosts)
                function displayPosts (list, maxPosts) {
                    let posts = list.filter(item => item.id <= maxPosts)
                    return posts
                }
                let postsToShow = displayPosts(posts.data, maxPosts)
                console.log(postsToShow)
                function showNextPosts(list, maxPosts, index) {
                        return list.slice(maxPosts * index - 5, maxPosts * index)
                }
                let linkPost = document.querySelectorAll('.blog-posts-pagination__link')
                
                // console.log(linkPost)
                linkPost.forEach(link => {
                    let linkIndex = +link.textContent
                    link.addEventListener('click', (e) =>{
                        activateLink (link)

                        clearPosts()
                        let arrayPosts = showNextPosts(posts.data, maxPosts, linkIndex)
                        createPosts (arrayPosts)
                        // console.log(arrayPosts)
                    })
                })
                
                createPosts (postsToShow)
                
            }
        }
})


    
// очистка постов

function clearPosts() {
    let postsList = document.querySelectorAll('.blog-card')
    if (postsList !== null) {
        postsList.forEach(el => el.remove())
    }
}
// подсветка активной страницы
function activateLink (link) {
    let deleteActive = document.querySelector('.blog-posts-pagination__link_active')
    deleteActive.classList.remove('blog-posts-pagination__link_active')
    link.classList.add('blog-posts-pagination__link_active')
}

// получение постов первой страницы

function displayFirstPosts (list, maxPosts) {
    let posts = list.filter(item => item.id <= maxPosts)
    return posts
}
// получение массива следующих постов
function showNextPosts(list, maxPosts, index) {
    return list.slice(maxPosts * index - 5, maxPosts * index)
}

// поиск постов

function FilterNew(e) {
    e.preventDefault()
    getParams(data)
    setSearchParams(data)
    let params = getParamsFromLocation()
    console.log(params)

    clearPosts()
    clearLinks()

    sendRequestG(baseUrl + `${location.search}`, 'GET')
    .then(res => res.json())
    .then(res => {
        if (res.success) {
            
            const posts = res.data
            let maxPosts
            if (params.limit !== null) {
                maxPosts = params.limit
            } else { maxPosts = 5 }
            
            console.log(posts)
            createPage(posts.length, maxPosts)

            let postsToShow = displayFirstPosts(posts, maxPosts)
            console.log(postsToShow)
            // let cardPost = showNextPosts(posts, maxPosts, 1)
            
            let linkPost = document.querySelectorAll('.blog-posts-pagination__link')
            linkPost.forEach(link => {
                let linkIndex = +link.textContent
                link.addEventListener('click', (e) => {
                    activateLink (link)
                    console.log(linkIndex)
                    clearPosts()
                    let arrayPosts = showNextPosts(posts, maxPosts, linkIndex)
                    createPosts (arrayPosts)
                    
                })
            })
            createPosts (postsToShow)     
        } else {
            throw res

        }
    })
    .catch(err => {
    console.error(err)
    })
}


function blogFilter(e) {
    e.preventDefault()
    getParams(data)
    setSearchParams(data)
    let params = getParamsFromLocation()
    
    console.log(location.search)
    clearPosts()
    let check = 0
    sendRequestXML({
    method: 'GET',
    url: baseUrl + location.search,
    onload:
    function getPosts (serverData) {
        
        if (serverData.target.status === 200) {
            const posts = JSON.parse(serverData.target.response);
            // console.log(posts.data)
            let maxPosts = 5
            createPage(posts.data.length, maxPosts)
            function displayPosts (list, maxPosts) {
                let posts = list.filter(item => item.id <= maxPosts)
                return posts
            }
            let postsToShow = displayPosts(posts.data, maxPosts)
            console.log(postsToShow)
            function showNextPosts(list, maxPosts, index) {
                    return list.slice(maxPosts * index - 5, maxPosts * index)
            }
            let linkPost = document.querySelectorAll('.blog-posts-pagination__link')
            
            // console.log(linkPost)
            linkPost.forEach(link => {
                let linkIndex = +link.textContent
                link.addEventListener('click', (e) =>{
                    clearPosts()
                    function clearPosts () {
                        let postToDelete = document.querySelectorAll('.blog-card')
                        postToDelete.forEach(card => {
                            card.remove()
                        })
                    }
                    // postSection.clear()
                    let arrayPosts = showNextPosts(posts.data, maxPosts, linkIndex)
                    createPosts (arrayPosts)
                    // console.log(arrayPosts)
                })
            })
            
            createPosts (postsToShow)
            
        }
        }
    })
}
formFilter.addEventListener('submit', FilterNew)

// создание поста

function createPost(srcDesktop, srcMobile, srcMobile2x, srcTablet, srcTablet2x, date, views, comments, title, text) {
    
    let basePath = 'https://academy.directlinedev.com'
    return `
    <div class="blog-card">
        <picture class="blog-card__picture">
            <source srcset="${basePath + srcMobile}, ${basePath + srcMobile2x} 2x" media="(max-width:400px)">
            <source srcset="${basePath + srcTablet}, ${basePath + srcTablet2x} 2x" media="(max-width:840px)">
            <source srcset="${basePath + srcDesktop}">
            <img class="blog-card__picture-item" src="${basePath + srcDesktop}" alt="">
        </picture>
        <div class="blog-card__wrapper">
            <div class="blog-card__tags">

            </div>
            <div class="blog-card__description">
                <div>${date}</div>
                <div>${views} views</div>
                <div>${comments} comments</div>
            </div>
            <h3 class="blog-card__title">${title}</h3>
            <p class="blog-card__text">${text}</p>
            <a class="blog-card__link" href="#">Go to this post</a>
        </div>
    </div>
    `
}

// создание страниц пагинации

function createPage(length, sort=5) {
    for (let i = 0; i < (length / sort); i++) {
        const paginationLink = createEl('button', 'blog-posts-pagination__link')
        paginationBox.append(paginationLink)
        if (i === 0) {
            paginationLink.classList.add('blog-posts-pagination__link_active')
        }
        paginationLink.innerText = i+1
    }
}
// удаление страниц
function clearLinks() {
    let links = document.querySelectorAll('.blog-posts-pagination__link')
    links.forEach(link =>  link.remove() )
}

// создание элемента

function createEl(tag, className) {
    const el = document.createElement(tag)
    el.classList.add(className)
    return el
}
// создание постов
function createPosts (postsToShow) {
    for (let index of postsToShow) {
        let toShreder = new Date(index.date);
        let dateObj = {}

        dateObj.date = toShreder.getDate().toString()
        dateObj.month = toShreder.getMonth().toString()
        dateObj.year = toShreder.getFullYear()
            if (dateObj.date.length < 2) {
                dateObj.date = '0' + dateObj.month
            }
            if (dateObj.month.length < 2) {
                dateObj.month = '0' + dateObj.month
            }
        let dateDone = `${dateObj.date}.${dateObj.month}.${dateObj.year}`

        postSection.insertAdjacentHTML('beforeend', createPost(
            index.desktopPhotoUrl,
            index.mobilePhotoUrl,
            index.mobile2xPhotoUrl,
            index.tabletPhotoUrl,
            index.tablet2xPhotoUrl,
            dateDone,
            index.views,
            index.commentsCount,
            index.title,
            index.text
            )
        )

        
        let tagArea = postSection.querySelectorAll('.blog-card__tags')
        for (let index2 of index.tags) {
            let postTag = createEl('div', 'blog-card-tag')
            postTag.style.background = index2.tag.color
            tagArea.forEach(area => {
                area.append(postTag) 
            })
        }

        
    }
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


// прокрутка страницы при нажатии на соответсвующую кнопку

window.addEventListener('scroll', function() {
    let scrollButton = document.querySelector('.btn-scroll-up')
    let scrollBreakPoint = 1200
    if (window.pageYOffset >= scrollBreakPoint) {
        scrollButton.classList.add('scroll-show')
        if (scrollButton.classList.contains('scroll-show')) {
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