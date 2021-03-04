let privkeyinput = document.getElementById("keything");
let passwordinput = document.getElementById("password");
let submitPassword = document.getElementById("genkey");

let hasKey = true;

let userDetails = {
    uid: "",
}

auth.onAuthStateChanged((user) => {
    if(user){
        userDetails.uid = user.uid;        
    }
});

if(localStorage.getItem('key') == null){
    hasKey = false;    
}else{
    document.removeChild(privkeyinput);
}

submitPassword.onclick = function(){
    const key = genKey(passwordinput.value).private;
    localStorage.setItem('key', key);
    db.collection("users").doc(userDetails.uid).update(key);
}

function send(msg, key){
    
}