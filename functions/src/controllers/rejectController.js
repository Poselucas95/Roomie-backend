/* eslint-disable no-const-assign */
/* eslint-disable eqeqeq */
/* eslint-disable no-eq-null */
const validator = require('validator').default;
const rejectService = require('../services/rejectService');

async function createReject(body) {
    try{
        // reject = await rejectService.createReject(body.userId)
        // if(reject != null) return { 'result': "El rechazo ya existe", 'code': 404}
        response = await rejectService.createReject(body)
        if(response.originalError && response.originalError.info.name === "ERROR" ) return { 'result': 'Ha ocurrido un error', "code": 400}
        return { 'result': response, 'code': 200}
    }catch(error){
        console.dir(error)
        return { 'result': 'Se produjo un error al registrar el rechazo', 'code': 500}
    }
}

module.exports = {createReject}