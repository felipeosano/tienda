
const validate = {};

validate.nameValidate = (name) =>{
    if(name == ""){
        return false;
    }
    if(name.length > 35){
        return false;
    }
    return true;
};

validate.passwordValidate = (password) =>{
    if(password.length < 6){
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