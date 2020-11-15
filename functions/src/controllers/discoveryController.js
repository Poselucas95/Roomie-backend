/* eslint-disable no-const-assign */
/* eslint-disable eqeqeq */
/* eslint-disable no-eq-null */
const validator = require('validator').default;
const discoveryService = require('../services/discoveryService')

async function getDiscovery(body) {
    try{
        // discovery = await discoveryService.getDiscovery(body.userId)
        // if(discovery != null) return { 'result': "El match ya existe", 'code': 404}
        response = await discoveryService.getDiscovery(body)
        if(response.originalError && response.originalError.info.name === "ERROR" ) return { 'result': 'Ha ocurrido un error', "code": 400}
        return { 'result': response, 'code': 200}
    }catch(error){
        console.dir(error)
        return { 'result': 'Se produjo un error al obtener el discovery', 'code': 500}
    }
}


async function getPreviewProp(propId) {
    try{
        response = await discoveryService.getPropertyPreview(propId)
        if(response.originalError && response.originalError.info.name === "ERROR" ) return { 'result': 'Ha ocurrido un error', "code": 400}
        return { 'result': response, 'code': 200}
    }catch(error){
        console.dir(error)
        return { 'result': 'Se produjo un error al obtener el preview', 'code': 500}
    }
}


module.exports = {getDiscovery, getPreviewProp}