const currentPage = new URLSearchParams(location.search).get("page");
const mainContents = document.querySelectorAll("main > div");
const sidebarMenuItemLinks = document.querySelectorAll(".inner-sidebar a");
const createPostForm = document.querySelector('#create-post-form')
const postTitle = document.querySelector('#post-title')
const postImage = document.querySelector('#post-image')
const postCategory = document.querySelector('#post-category')
const postDiscription = document.querySelector('#post-discription');
const userId = localStorage.getItem('userId')
const creatPostBtn = document.querySelector('#create-post-button')
const loader = document.querySelector('#loader')
const managePostWrapper = document.querySelector('#manage-posts-wrapper')
const deleteModal = document.querySelector('.delete-modal-wrapper')
const deleteModalCancelBtn = document.querySelector('.cancel')
const deleteModalDeleteBtn = document.querySelector('.delete')
const usernameInfo = document.querySelector('.usernameInfo')
const signOut = document.querySelector('.sign-out-btn')
const userToken = localStorage.getItem('userToken');

(async ()=>{
    let userInfo = await axios.get(`http://localhost:3000/api/users/${userId}`)
    usernameInfo.innerHTML = userInfo.data.data.fullname
})();

(async ()=>{
    let categories = await axios.get('http://localhost:3000/api/categories')
    categories.data.data.forEach(category => {
        let option = document.createElement('option')
        option.value = category._id
        option.innerHTML = category.title
        postCategory.appendChild(option)
    })
})();

mainContents.forEach(content => {
    if(content.dataset.contentName.includes(currentPage)){
        content.style.display = "flex";
    }
})

sidebarMenuItemLinks.forEach(sidebarLink => {
    if(sidebarLink.href.includes(currentPage)){
        sidebarLink.setAttribute("aria-current", "page");
    }
    else{
        sidebarLink.removeAttribute("aria-current");
    }
})

createPostForm.addEventListener('submit',(e)=>{
    console.log(1)
    e.preventDefault();
    creatPostBtn.setAttribute('disabled','true')
    creatPostBtn.style = 'background-color:#f5c1478d;'
    loader.style = 'display:block;';
    (async()=>{
        try{
            let author = await axios.get(`http://localhost:3000/api/users/${userId}`)
            const response = await axios.post('http://localhost:3000/api/posts',{
                "title":postTitle.value,
                "description":postDiscription.value,
                "image":postImage.value,
                "author":`${author.data.data.id}`,
                "category":postCategory.value
                },
                {
                headers:{
                    "Authorization":"Bearer"+' '+userToken,
                    "Content-Type":"application/json"
                },
            })
            console.log(response)
            if(response.status == 201){
                loader.style = 'display:none;'
                creatPostBtn.style = 'background-color:#F5C147;'
                creatPostBtn.removeAttribute('disabled')
            }
        }catch(error){
            console.log(error)
        }
    })()
});

(async()=>{
    try{
        let response = await axios.get('http://localhost:3000/api/posts')
        response.data.data.forEach(element => {
            if(userId == element.author){
                const mainWrapper = document.createElement('div')
                mainWrapper.style = "background-color:#1E1E1E;width:350px;height:430px; border:1px solid #F5C147;display:flex;flex-direction:column;justify-content:space-between"
                mainWrapper.setAttribute("data-post-id",element._id)
                mainWrapper.innerHTML = `
                <img style="width:100%;height:270px;" class="article-img" src=${element.image}>
                <div class="info-wrapper">
                        <h3 class="article-name">${element.title.slice(0,25)}...</h3>
                        <p style="width:300px" class="article-description">${element.description.slice(0,100)}..</p>
                    </div>
                    <div style = "padding: 10px;display:flex;gap:40px;margin-top:20px">
                            <button style="cursor:pointer; padding:5px 40px;font-size:20px;border:none;background-color:#F5C147;font-family:Inter">Edit</button>
                            <button style="cursor:pointer; padding:5px 30px;font-size:20px;border:none;background-color:red;font-family:Inter" data-delete-btn="1">Delete</button>
                    </div>               
                `
                managePostWrapper.appendChild(mainWrapper)
            }
        });
    }
    catch(error){
        console.log(error)
    }
})()

managePostWrapper.addEventListener('click',(e)=>{
    if(e.target.closest("[data-delete-btn]")){
        localStorage.setItem("removePost",e.target.closest("[data-delete-btn]").parentElement.parentElement.dataset.postId)
        deleteModal.style = 'transform:translateY(0);transition:1s'
    }
})
deleteModalCancelBtn.addEventListener('click',()=>{
    deleteModal.style = 'transform:translateY(-3000px);transition:1s'
})
deleteModalDeleteBtn.addEventListener('click',()=>{
    location.replace(location.origin + '/pages/dashboard.html?page=manage')
    (async()=>{
        try{
            let response = await axios.delete(`http://localhost:3000/api/posts/${localStorage.getItem('removePost')}`,{
                headers:{
                    "Authorization":"Bearer" + ' ' + userToken
                }
            })
            deleteModal.style = 'transform:translateY(-3000px);transition:1s'     
        }
        catch(error){
            console.log(error)
        }
    })()
})
signOut.addEventListener('click',()=>{
    location.replace(location.origin + '/index.html')
    localStorage.removeItem('userToken')
})