/* eslint-disable eqeqeq */
/* eslint-disable no-eq-null */
const validator = require('validator').default;
const userService = require('../services/userService')


async function getUser(userId) {
    try{
        user = await userService.getUser(userId)
        if(user == null) return { 'result': {}, 'code': 404}
        return { 'result': user, 'code': 200}
    }catch(error){
        console.dir(error)
        return { 'result': 'Se produjo un error al buscar el usuario', 'code': 500}
    }


}


async function createUser(body) {
    try{
        user = await userService.getUser(body.userId)
        if(user != null) return { 'result': "El usuario ya existe", 'code': 404}
        response = await userService.createUser(body)
        if(response.originalError && response.originalError.info.name === "ERROR" ) return { 'result': 'Ha ocurrido un error', "code": 400}
        return { 'result': response, 'code': 200}
    }catch(error){
        console.dir(error)
        return { 'result': 'Se produjo un error al registrar el usuario', 'code': 500}
    }


}

async function updateUser(body) {
    try{
        // Me traigo el usuario para verificar que existe.
        user = await userService.getUser(body.userId)
        // Si el usuario no existe, devolvemos result y codigo 404.
        if(user == null) return { 'result': "El usuario no existe", 'code': 404}
        response = await userService.updateUser(body, user)
        if(response.originalError && response.originalError.info.name === "ERROR" ) return { 'result': 'Ha ocurrido un error', "code": 400}
        return { 'result': response, 'code': 200}
    }catch(error){
        console.dir(error)
        return { 'result': 'Se produjo un error al modificar el usuario', 'code': 500}
    }


}




module.exports = {getUser, createUser, updateUser}