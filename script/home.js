const articlesWrapper = document.querySelector('#articles-wrapper');
const logInLink = document.querySelector('#logInLink')
const signUpLink = document.querySelector('#signUpLink')
const logOutLink = document.querySelector('#logOutLink')
const dashboardLink = document.querySelector('#dashboardLink')

logOutLink.addEventListener('click',()=>{
    localStorage.removeItem('userToken')
    location.reload()
})

const userToken = localStorage.getItem('userToken')
if(userToken){
    logInLink.style = 'display:none;'
    signUpLink.style = 'display:none;'
    logOutLink.style = 'display:block;'
    dashboardLink.style = 'display:block;'
}

(async()=>{
    try{
        let response = await axios.get('http://localhost:3000/api/posts')
        response.data.data.forEach(async element => {
            let author = await axios.get(`http://localhost:3000/api/users/${element.author}`)
            const mainWrapper = document.createElement('div')
            mainWrapper.className = "swiper-slide"
            mainWrapper.setAttribute("data-post-id",element._id)
            mainWrapper.innerHTML = `
                <img class="article-img" src=${element.image}>
                <div class="info-wrapper">
                    <h3 class="article-name">${element.title.slice(0,25)}...</h3>
                    <p class="article-description">${element.description.slice(0,100)}..</p>
                    <p class="article-author">${author.data.data.fullname}</p>
                    <p class="article-author">Author</p>
                </div>               
            `
            articlesWrapper.appendChild(mainWrapper)
        });
    }
    catch(error){
        console.log(error)
    }
})()

articlesWrapper.addEventListener('click', (e) => {
    if(e.target.closest('[data-post-id]')){
        localStorage.setItem('currentPostId',e.target.closest('[data-post-id]').dataset.postId)    
        location.replace(location.origin + '/pages/singlepost.html')
    }
})