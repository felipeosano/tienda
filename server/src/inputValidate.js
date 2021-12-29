
const validate = {};

validate.nameValidate = (name) =>{
    if(name == ""){
        return false;
    }
    if(name.length > 35){
        return false;
    }
    const validate = new RegExp('^[A-Z]+$', 'i');
    if(!validate.test(name)){
        return false;
    }
    return true;
};

validate.passwordValidate = (password) =>{
    if(password == ""){
        return false;
    }
    const validate = /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{6,16}$/; //1 number, 1 special character, length 6-16
    if (!validate.test(password)) {
        return false;
    }
    return true;
}

validate.emailValidate = (email) => {
    if(email == ""){
        return false;
    }
    const validate = /^(?:[^<>()[\].,;:\s@"]+(\.[^<>()[\].,;:\s@"]+)*|"[^\n"]+")@(?:[^<>()[\].,;:\s@"]+\.)+[^<>()[\]\.,;:\s@"]{2,63}$/i;
    if(!validate.test(email)){
        return false;
    }
    return true;
}


module.exports = validate;