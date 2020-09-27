const validator = require('validator');
const userService = require('../services/userService')

async function register(email) {
    // Chequeamos que el email sea valido
    if(!validator.isEmail(email)) return { 'result': 'El email no es valido', 'code': 400}
    // Chequeamos si el email ya se encuentra registrado
    user = await userService.getUser(email)
    if(user != null) return { 'result': 'El email ya se encuentra registrado', 'code': 409}

    try{
        result = await userService.setNewUser(email)
        return { 'result': "Se ha registrado el email correctamente", 'code': 200}
    }catch(error){
        console.dir(error)
        return { 'result': 'Se produjo un error al registrar el email', 'code': 500}
    }
}


module.exports = {register}