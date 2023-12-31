var emailSignin = document.getElementById("emailSignin");
var passwordSignin = document.getElementById("passwordSignin");
var nameSignup = document.getElementById("nameSignup");
var emailSignup = document.getElementById("emailSignup");
var passwordSignup = document.getElementById("passwordSignup");
var alertSignin = document.getElementById("alertSignin");
var signupArray = [];
var btnSignup = document.getElementById("btnSignup");
var btnLogin = document.getElementById("btnLogin");
var local = localStorage.getItem("user");
var pathparts = location.pathname.split('/');
var baseURL = ''
for (var i = 0; i < pathparts.length -1 ; i++) {
    baseURL += '/' + pathparts[i]
}
var username = localStorage.getItem('sessionName')
if (username) {
    document.getElementById('userName').innerHTML = "Welcome " + username
}
if (localStorage.getItem('user') == null) {
    signupArray = []
} else {
    signupArray = JSON.parse(localStorage.getItem('user'))
}

 function checkInputSignin(){
    if( emailSignin.value == "" || passwordSignin.value == ""){
        return false
      }
    else{
        return true
    }  
}
function checkInputSignup(){
    if( nameSignup.value == "" || emailSignup.value == "" || passwordSignup.value == ""){
        return false
      }
    else{
        return true
    }  
}
function signUp (){
    if(checkInputSignup() == false){
        document.getElementById("alertSignup").innerHTML = '<span class="text-center text-danger">All inputs is required</span>'
        return false
    }
    var signUpObject ={
        name:nameSignup.value ,
        email:emailSignup.value ,
        password:passwordSignup.value,
    }
    if (signupArray.length == 0) {
        signupArray.push(signUpObject)
        localStorage.setItem('user', JSON.stringify(signupArray))
        document.getElementById('alertSignup').innerHTML = '<span class="text-success m-3">Success</span>'
        return true
    }
    if(checkSignup() == false){
        document.getElementById("alertSignup").innerHTML = '<span class="text-center text-danger">email already exists</span>'
     }
    else{
        signupArray.push(signUpObject);
        console.log(signupArray);
        localStorage.setItem('user',JSON.stringify(signupArray))
        document.getElementById('alertSignup').innerHTML = '<span class="text-success ">Success</span>'
    }
}
function checkSignup(){
    for (var i = 0 ; i < signupArray.length ; i++) {
        if (signupArray[i].email.toLowerCase() == emailSignup.value.toLowerCase()) {
            return false
        }
    }
}  
 function signin(){
    if(checkInputSignin() == false){
        document.getElementById('alertSignin').innerHTML = '<span class="text-center text-danger">All inputs is required</span>'
         
    }
    var email = emailSignin.value;
    var password = passwordSignin.value;
    for (var i = 0; i < signupArray.length; i++) {
        if (signupArray[i].email.toLowerCase() == email.toLowerCase() && signupArray[i].password.toLowerCase() == password.toLowerCase()) {
            localStorage.setItem('sessionName', signupArray[i].name)
            if (baseURL == '/') {
                location.replace('https://' + location.hostname + '/welcome.html')

            } else {
                location.replace(baseURL + '/welcome.html')

            }
        } else {
            document.getElementById('alertSignin').innerHTML = '<span class="text-center text-danger">incorrect email or password</span>'
        }
    }   
 }
 function logout() {
    localStorage.removeItem('sessionName')
    
}