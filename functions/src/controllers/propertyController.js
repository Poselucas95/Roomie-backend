/* eslint-disable eqeqeq */
/* eslint-disable no-eq-null */
const validator = require('validator').default;
const propertyService = require('../services/propertyService')


async function getProperty(userId) {
    try{
        user = await userService.getUser(userId)
        if(user == null) return { 'result': {}, 'code': 404}
        property = await propertyService.getProperty(userId)
        return { 'result': property, 'code': 200}
    }catch(error){
        console.dir(error)
        return { 'result': 'Se produjo un error al buscar el usuario', 'code': 500}
    }

    
}


async function createProperty(body) {
    try{
        property = await property.getProperty(body.userId)
        if(property != null) return { 'result': "La propiedad ya existe", 'code': 404}
        response = await propertyService.createProperty(body)
        if(response.originalError && response.originalError.info.name === "ERROR" ) return { 'result': 'Ha ocurrido un error', "code": 400}
        return { 'result': response, 'code': 200}
    }catch(error){
        console.dir(error)
        return { 'result': 'Se produjo un error al registrar la propiedad', 'code': 500}
    }


}

async function updateProperty(body) {
    try{
        // Me traigo el usuario para verificar que existe.
        property = await propertyService.getProperty(body.userId)
        // Si el usuario no existe, devolvemos result y codigo 404.
        if(property == null) return { 'result': "El la propiedad no existe", 'code': 404}
        response = await propertyService.updateProperty(body, property)
        if(response.originalError && response.originalError.info.name === "ERROR" ) return { 'result': 'Ha ocurrido un error', "code": 400}
        return { 'result': response, 'code': 200}
    }catch(error){
        console.dir(error)
        return { 'result': 'Se produjo un error al modificar la propiedad', 'code': 500}
    }


}




module.exports = {getProperty, createProperty, updateProperty}