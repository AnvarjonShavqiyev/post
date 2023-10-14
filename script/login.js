const eyeBtn = document.querySelector(".eye-btn");
const loginUpForm = document.querySelector('#login-up-form')
const email = document.querySelector('#email')
const password = document.querySelector('#password')

eyeBtn.addEventListener('click',(e) => {
    if(e.target.closest('.eye-btn').previousElementSibling.type === 'password'){
        e.target.closest('.eye-btn').previousElementSibling.type = 'text'
        e.target.closest('.eye-btn').firstElementChild.className = 'fa-solid fa-eye-slash'
    }else{
        e.target.closest('.eye-btn').previousElementSibling.type = 'password'
        e.target.closest('.eye-btn').firstElementChild.className = 'fa-solid fa-eye'
    }
})
loginUpForm.addEventListener('submit', (e) => {
    e.preventDefault();
    (async()=>{
        try{    
            const response = await axios.post('http://localhost:3000/api/auth/login',{
                "email":email.value,
                "password":password.value,
                headers:{"Content-Type":"application/json"}
            })
            if(response.data.token){
                localStorage.setItem('userToken',response.data.token)
                localStorage.setItem('userId',response.data.data.id)
                location.replace(location.origin + '/index.html')   
            }
        }catch(error){
            console.log(error)
        }
    })()
})