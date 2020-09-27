const sql = require('../database/sql')
const mssql = require( "mssql" );


async function setNewUser(email) {
    let result;
    const client = await sql.getConnection()
    try{
        let queryPrepared = await client.request()
        // Parametros a insertar
        queryPrepared.input('email', mssql.NVarChar, email)
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


async function getUser(email) {
    let result;
    const client = await sql.getConnection()
    try{
        let queryPrepared = await client.request()
        // Parametros a insertar
        queryPrepared.input('email', mssql.NVarChar, email)
        // Ejecución de la query
        await queryPrepared.query('SELECT * FROM usuarios WHERE usuarios.email = @email').then((response) => {
            result = response.recordset
        })
        // Cerramos la conexión
        await client.close()
        
        return result[0]
    }catch (err){
        console.dir(err)
    }
}


module.exports = {setNewUser, getUser}