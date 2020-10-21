/* eslint-disable no-eq-null */
const validator = require('validator').default;
const propertyService = require('../services/propertyService')


async function getProperty(propertyId) {
    try{
        property = await propertyService.getProperty(propertyId)
        if(property === null) return { 'result': 'No se encuentra la propiedad', 'code': 404}
        return { 'result': property, 'code': 200}
    }catch(error){
        console.dir(error)
        return { 'result': 'Se produjo un error al buscar la propiedad', 'code': 500}
    }


}




module.exports = {getUser}