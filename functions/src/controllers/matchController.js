/* eslint-disable no-const-assign */
/* eslint-disable eqeqeq */
/* eslint-disable no-eq-null */
const validator = require('validator').default;
const matchService = require('../services/matchService')


async function getMatchsByPropId(propertyId) {
    try{
        match = await matchService.getMatchsByPropId(propertyId)
        if(match == null) return { 'result': "No hay match con el property ID solicitado", 'code': 404}
        return { 'result': match, 'code': 200}
    }catch(error){
        console.dir(error)
        return { 'result': 'Se produjo un error al buscar el match', 'code': 500}
    }
}
async function getMatchsPending(propertyId) {
    try{
        match = await matchService.getMatchsPending(propertyId)
        if(match == null) return { 'result': "No hay match con el property ID solicitado", 'code': 404}
        return { 'result': match, 'code': 200}
    }catch(error){
        console.dir(error)
        return { 'result': 'Se produjo un error al buscar el match', 'code': 500}
    }
}

async function getMatchsByUserId(userId) {
    try{
        match = await matchService.getMatchsByUserId(userId)
        if(match == null) return { 'result': "No hay match con el user ID solicitado", 'code': 404}
        return { 'result': match, 'code': 200}
    }catch(error){
        console.dir(error)
        return { 'result': 'Se produjo un error al buscar el match', 'code': 500}
    }
}

async function getMatches(userId, prop) {
    try{
        match = await matchService.getMatches(userId, prop)
        if(match == null) return { 'result': "No hay match con el user ID solicitado", 'code': 404}
        return { 'result': match, 'code': 200}
    }catch(error){
        console.dir(error)
        return { 'result': 'Se produjo un error al buscar el match', 'code': 500}
    }
}

async function createMatch(body) {
    try{
        match = await matchService.existMatch(body.userId, body.idPropiedad)
        if(match != null) return { 'result': "El match ya existe", 'code': 404}
        response = await matchService.createMatch(body)
        if(response.originalError && response.originalError.info.name === "ERROR" ) return { 'result': 'Ha ocurrido un error', "code": 400}
        return { 'result': response, 'code': 200}
    }catch(error){
        console.dir(error)
        return { 'result': 'Se produjo un error al registrar el match', 'code': 500}
    }
}

async function updateMatch(body) {
    try{
        // Me traigo el match para verificar que existe.
        auxMatch = await matchService.existMatch(body.userId, body.idPropiedad)
        // Si el match existe, devolvemos result y codigo 404.
        if(auxMatch == null) return { 'result': "El match no existe", 'code': 404}
        response = await matchService.updateMatch(body)
        if(response.originalError && response.originalError.info.name === "ERROR" ) return { 'result': 'Ha ocurrido un error', "code": 400}
        return { 'result': response, 'code': 200}
    }catch(error){
        console.dir(error)
        return { 'result': 'Se produjo un error al modificar el match', 'code': 500}
    }
}


module.exports = {getMatchsByUserId, getMatchsByPropId, createMatch, updateMatch, getMatchsPending,getMatches}
