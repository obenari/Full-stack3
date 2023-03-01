function validateUser(oldNode,newNode){
    let xhttp=new FXMLHttpRequest();
    let userEmail=document.getElementById("user-email2").value;
    let userPassword=document.getElementById("password2").value;
    xhttp.Open('GET',`getUser/${userEmail}.json`);
    function loginValidation(){
        if(xhttp.status!=200){
            let wrongInputMsg=document.getElementById("wrong-input2");
            wrongInputMsg.style.display='block';
            wrongInputMsg.style.color='red';
            return;
        }
        let userJson=xhttp.responseText;
        let user=JSON.parse(userJson);
        if(userPassword!=user.password){
            let wrongInputMsg=document.getElementById("wrong-input2");
            wrongInputMsg.style.display='block';
            wrongInputMsg.style.color='red';
            return;
        }
        document.cookie = `username=${userEmail};`;
        document.getElementById("wrong-input2").style.display='none';
        switchTemplate(oldNode,newNode);
       // loadListPage(user);
    }
    xhttp.OnLoad(loginValidation);
    xhttp.send();

    return false;
}


function validateNewUser(oldNode,newNode){
    let xhttp=new FXMLHttpRequest();
    let userEmail=document.getElementById("user-email").value;
    let userName=document.getElementById("full-name").value;
    let userPassword=document.getElementById("password1").value;
    let userValidatePassword=document.getElementById("validation-password").value;
    if(userPassword!==userValidatePassword){
        let wrongInputMsg=document.getElementById("wrong-input");
        wrongInputMsg.style.display='block';
        wrongInputMsg.style.color='red';
        wrongInputMsg.innerText="סיסמאות לא זהות"
        return false;
    }
    xhttp.Open('POST','addUser.json');
    let user=new User(userEmail, userName,userPassword,[]);
    function loginValidation1(){
        if(xhttp.status!=200){
            let wrongInputMsg=document.getElementById("wrong-input");
            wrongInputMsg.style.display='block';
            wrongInputMsg.style.color='red';
            wrongInputMsg.innerText="מייל קיים במערכת"
            return;
        }

       
        document.cookie = `username=${userEmail};`;
        let wrongInputMsg=document.getElementById("wrong-input");
        wrongInputMsg.style.display='none';
        switchTemplate(oldNode,newNode);
        loadListPage(user);
    }
    xhttp.OnLoad(loginValidation1);
    xhttp.send(JSON.stringify(user));

    return false;
}


function clean() {
    localStorage.clear();
}
