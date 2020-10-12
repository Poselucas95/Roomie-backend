/* eslint-disable consistent-return */
/* eslint-disable promise/always-return */
const sql = require('../database/sql')
const mssql = require( "mssql" );


const getParams = (body) => {
    return [
        { name: 'nombre', sqltype: mssql.NVarChar, value: body.nombre},
        { name: 'apellido', sqltype: mssql.NVarChar,  value: body.apellido},
        { name: 'edad', sqltype: mssql.NVarChar,  value: body.edad},
        { name: 'dni', sqltype: mssql.NVarChar,  value: body.dni},
        { name: 'email', sqltype: mssql.NVarChar,  value: body.email},
        { name: 'apodo', sqltype: mssql.NVarChar,  value: body.apodo},
        { name: 'genero', sqltype: mssql.NVarChar,  value: body.genero},
    ];
}
    

async function getUser(userId) {
    let result;
    const client = await sql.getConnection()
    try{
        let queryPrepared = await client.request()
        // Parametros a insertar
        queryPrepared.input('userId', mssql.NVarChar, userId)
        // Ejecución de la query
        await queryPrepared.query('SELECT * FROM Perfil WHERE IdFirebase = @userId').then((response) => {
            result = response.recordset
        })
        // Cerramos la conexión
        await client.close()
        console.dir(result)
        return result[0]
    }catch (err){
        console.dir(err)
    }
}

async function createUser(body) {
    let result;
    const client = await sql.getConnection()
    try{
        let queryPrepared = await client.request()
        // Parametros a insertar
        var parameters = getParams(body)
        // Injección de parametros
        // Ejecución de la query
        await queryPrepared.query('INSERT INTO usuarios (email) VALUES (@email)').then((response) => {
            result = response
        })
        // Cerramos la conexión
        await client.close()
        return result
    }catch (err){
        console.dir(err)
    }
}



module.exports = {createUser, getUser}