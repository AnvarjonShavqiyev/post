const articlesWrapper = document.querySelector('#articles-wrapper');
const logInLink = document.querySelector('#logInLink')
const signUpLink = document.querySelector('#signUpLink')
const logOutLink = document.querySelector('#logOutLink')
const dashboardLink = document.querySelector('#dashboardLink')

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
        response.data.data.forEach(element => {
            console.log(element)
            const mainWrapper = document.createElement('div')
            mainWrapper.className = "swiper-slide"
            mainWrapper.setAttribute("data-post-id",element._id)
            mainWrapper.innerHTML = `
                <img class="article-img" src=${element.image}>
                <div class="info-wrapper">
                    <h3 class="article-name">${element.title.slice(0,25)}...</h3>
                    <p class="article-description">${element.description.slice(0,100)}..</p>
                    <p class="article-author">${element.author}</p>
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