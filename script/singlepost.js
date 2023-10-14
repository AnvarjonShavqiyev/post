const postTitle = document.querySelector('.single-post-title')
const postCategory = document.querySelector('.single-post-category')
const postImage = document.querySelector('.single-post-image')
const postText = document.querySelector('.single-post-text')

const postId = localStorage.getItem('currentPostId');

(async()=>{
    let currentPost = await axios.get(`http://localhost:3000/api/posts/${postId}`)
    let postCategoryName = await axios.get(`http://localhost:3000/api/categories/${currentPost.data.category}`)
    console.log()
    postTitle.innerHTML = currentPost.data.title
    postCategory.innerHTML = '#' + postCategoryName.data.data.title
    postImage.src = currentPost.data.image
    postText.innerHTML = currentPost.data.description
})()
