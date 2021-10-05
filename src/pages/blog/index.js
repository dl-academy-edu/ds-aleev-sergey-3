
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



const form = document.forms.filter

// Получаем параметры из фильтра
let data = {}

function getParams() {

    data.color = [...form.elements.color].filter(checkbox => checkbox.checked).map(checkbox => checkbox.value)
    
    data.views = ([...form.elements.views].find(radio => radio.checked) || {value:null}).value

    data.comments = [...form.elements.comments].filter(checkbox => checkbox.checked).map(checkbox => checkbox.value)

    data.limit = ([...form.elements.limit].find(radio => radio.checked) || {value:null}).value

    data.sort = ([...form.elements.sort].find(radio => radio.checked) || {value:null}).value

    data.searchField  = form.elements.searchField.value
}

form.addEventListener('submit', e => {
    e.preventDefault()
    
    getParams()
    setSearchParams(data)
    
    let params = getParamsFromLocation()
    
    console.log(params)
})
let params = getParamsFromLocation()
setFilterData(params)
// Выставляем параметры в ссылку

function setSearchParams(data) {
    let setSearchParams = new URLSearchParams()

    data.color.forEach (item => {
        setSearchParams.append('color', item)
    })
    if (data.views) {
        setSearchParams.set('views', data.views)
    }
    data.comments.forEach (item => {
        setSearchParams.append('comments', item)
    })
    if (data.limit) {
        setSearchParams.set('limit', data.limit)
    }
    if (data.sort) {
        setSearchParams.set('sort', data.sort)
    }
    setSearchParams.set('searchField', data.searchField)
    
    history.replaceState(null, document.title, "?" + setSearchParams.toString())
}

// Удаляем параметры из ссылки

form.addEventListener('reset', e => {
    history.replaceState(null, document.title, window.location.pathname)
})

// Получаем параметры инпутов из ссылки

function getParamsFromLocation() {
    let searchParams = new URLSearchParams(location.search)
    return {
        color: searchParams.getAll('color'),
        views: searchParams.get('views'),
        comments: searchParams.getAll('comments'),
        limit: searchParams.get('limit'),
        sort: searchParams.get('sort'),
        searchField: searchParams.get('searchField') || '',
    }
}

// подготавливаем данные к отправке на сервер
        // params.views = params.views.split('-')
        // params.views = {"between":[params.views[0],params.views[1]]}

// Выставляем данные из ссылки

function setFilterData (data) {

    form.elements.color.forEach(checkbox => {
        checkbox.checked = data.color.includes(checkbox.value)
    });
    form.elements.views.forEach(radio => {
        radio.checked = data.views === radio.value
    })
    form.elements.comments.forEach(checkbox => {
        checkbox.checked = data.comments.includes(checkbox.value)
    });
    form.elements.limit.forEach(radio => {
        radio.checked = data.limit === radio.value
    })
    form.elements.sort.forEach(radio => {
        radio.checked = data.sort === radio.value
    })
    form.elements.searchField.value = data.searchField
}


const postSection = document.querySelector('.blog-posts')
const baseUrl = 'https://academy.directlinedev.com/api/posts'
const paginationBox = document.querySelector('.blog-posts-pagination__page')


function createPage(length, sort=5) {
    for (let i = 0; i < (length/sort); i++) {
        const paginationLink = createEl('a', 'blog-posts-pagination__link')
        paginationBox.append(paginationLink)
        paginationLink.innerText = i+1
    }
}

function sendRequest({method, url, onload}) {
    const xhr = new XMLHttpRequest()
    xhr.open(method, url)
    xhr.send()
    let searchParams = location.search
    xhr.onload = onload
}
sendRequest({
    method: 'GET',
    url: baseUrl,
    onload: function getPosts (serverData) {
        let check = 0
            if (serverData.target.status === 200) {
                const posts = JSON.parse(serverData.target.response);
                console.log(posts)
                
                createPage(posts.data.length, 5)

                for (let index of posts.data) {
                    postSection.insertAdjacentHTML('beforeend', createPost(
                        index.desktopPhotoUrl,
                        index.mobilePhotoUrl,
                        index.mobile2xPhotoUrl,
                        index.tabletPhotoUrl,
                        index.tablet2xPhotoUrl,
                        index.date,
                        index.views,
                        index.commentsCount,
                        index.title,
                        index.text
                        )
                    )
                    
                    let tagArea = document.querySelectorAll('.blog-card__tags')

                    for (let index2 of index.tags) {
                        let tag = createEl('div', 'blog-card-tag')
                        tag.style.background = index2.tag.color
                        tagArea[check].append(tag)  
                    }
                    check += 1
                }

                
            }
        }
    })
form.addEventListener('submit', e => {
    let postsList = document.querySelectorAll('.blog-card')
    if (postsList !== null) {
        postsList.forEach(el => el.remove())
    }
let check = 0
sendRequest({
    method: 'GET',
    url: baseUrl,
    onload: function getPosts (serverData) {
        
            if (serverData.target.status === 200) {
                const posts = JSON.parse(serverData.target.response);
                console.log(posts)
                
                createPage(posts.data.length, 5)

                for (let index of posts.data) {
                    postSection.insertAdjacentHTML('beforeend', createPost(
                        index.desktopPhotoUrl,
                        index.mobilePhotoUrl,
                        index.mobile2xPhotoUrl,
                        index.tabletPhotoUrl,
                        index.tablet2xPhotoUrl,
                        index.date,
                        index.views,
                        index.commentsCount,
                        index.title,
                        index.text
                        )
                    )
                    
                    let tagArea = document.querySelectorAll('.blog-card__tags')

                    for (let index2 of index.tags) {
                        let tag = createEl('div', 'blog-card-tag')
                        tag.style.background = index2.tag.color
                        tagArea[check].append(tag)  
                    }
                    check += 1
                }

                
            }
        }
})
})
function createPost(srcDesktop, srcMobile, srcMobile2x, srcTablet, srcTablet2x, date, views, comments, title, text) {
    let basePath = 'https://academy.directlinedev.com'
    return `
    <div class="blog-card">
        <picture class="blog-card__picture">
            <source srcset="https://academy.directlinedev.com${srcMobile}, ${srcMobile2x} 2x" media="max-width:400px">
            <source srcset="https://academy.directlinedev.com${srcTablet}, ${srcTablet2x} 2x" media="max-width:900px">
            <source srcset="https://academy.directlinedev.com${srcDesktop}">
            <img class="blog-card__picture-item" src="https://academy.directlinedev.com${srcDesktop}" alt="">
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
function createEl(tag, className) {
    const el = document.createElement(tag)
    el.classList.add(className)
    return el
}
