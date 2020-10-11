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




module.exports = {getUser}