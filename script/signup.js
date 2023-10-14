const eyeBtn = document.querySelector(".eye-btn");
const signUpForm = document.querySelector('#sign-up-form')
const username = document.querySelector('#username')
const lastname = document.querySelector('#lastname')
const email = document.querySelector('#email')
const password = document.querySelector('#password')
const statusEmail = document.querySelector('.status-email')
const statusPassword = document.querySelector('.status-password')
const statusUsername = document.querySelector('.status-username')
const statusLastname = document.querySelector('.status-lastname')


eyeBtn.addEventListener('click',(e) => {
    if(e.target.closest('.eye-btn').previousElementSibling.type === 'password'){
        e.target.closest('.eye-btn').previousElementSibling.type = 'text'
        e.target.closest('.eye-btn').firstElementChild.className = 'fa-solid fa-eye-slash'
    }else{
        e.target.closest('.eye-btn').previousElementSibling.type = 'password'
        e.target.closest('.eye-btn').firstElementChild.className = 'fa-solid fa-eye'
    }
})
function checkEmail(){
    if(/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.value)){
        statusEmail.style = 'display:none;'
        return true
    }else{
        statusEmail.innerHTML = 'Email should contain "@" and "." '
        statusEmail.style = 'display:block;color:red;font-size:18px;font-family:"Inter";'
    }
}
function checkPassword(){
    if(/^(?=.*\d)(?=(.*\W){2})(?=.*[a-zA-Z])(?!.*\s).{1,15}$/.test(password.value)){
        statusPassword.style = 'display:none;'
        return true
    }
    else{
        statusPassword.innerHTML = 'It should contain 1 letter, 1 number and 2 spicial characters at least'
        statusPassword.style = 'display:block;width:370px;background-color:red;padding:4px;color:#fff;border-radius:3px;text-align:left' 
    }
}
function checkFirstname(){
    console.log(username.value)
    if(username.value.length <= 10){
        return true
    }
    else{
        statusUsername.innerHTML = 'It can be maximum 10 characters'
        statusUsername.style = 'display:block;width:370px;background-color:red;padding:4px;color:#fff;border-radius:3px;text-align:left' 
    }
}
function checkLastname(){
    if(lastname.value.length <= 10){
        return true
    }
    else{
        statusLastname.innerHTML = 'It can be maximum 10 characters'
        statusLastname.style = 'display:block;width:370px;background-color:red;padding:4px;color:#fff;border-radius:3px;text-align:left' 
    }
}
signUpForm.addEventListener('submit', (e) => {
    e.preventDefault()
    if(checkEmail() && checkPassword() && checkFirstname() && checkLastname()){
        (async()=>{
            try{    
                const response = await axios.post('http://localhost:3000/api/auth/signup',{
                    "firstname":username.value,
                    "lastname":lastname.value,
                    "email":email.value,
                    "password":password.value,
                    headers:{"Content-Type":"application/json"}
                })
                if(response.statusText == 'Created'){
                    location.replace(location.origin + '/pages/login.html')   
                }
            }catch(error){
                console.log(error)
            }
        })()
    }
})