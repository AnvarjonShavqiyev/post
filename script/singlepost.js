const postTitle = document.querySelector('.single-post-title')
const postCategory = document.querySelector('.single-post-category')
const postImage = document.querySelector('.single-post-image')
const postText = document.querySelector('.single-post-text')

const postId = localStorage.getItem('currentPostId');

(async()=>{
    let currentPost = await axios.get(`http://localhost:3000/api/posts/${postId}`)
    console.log(currentPost.data)
    postTitle.innerHTML = currentPost.data.title
    postCategory.innerHTML = '#'+currentPost.data.category
    postImage.src = currentPost.data.image
    postText.innerHTML = currentPost.data.description
})()
