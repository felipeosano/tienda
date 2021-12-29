
const isEmpty = (imput) => {
    const inputWithoutSpaces = imput.replace(/\s+/g, ''); 
    if(inputWithoutSpaces == ""){
        return true;
    }else{
        return false;
    }
}

module.exports = isEmpty;