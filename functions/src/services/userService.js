const sql = require('../database/sql')
const mssql = require( "mssql" );

let result;
    async function getUser(userId) {
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
        
        return result[0]
    }catch (err){
        console.dir(err)
    }
}

async function createUser(userId) {
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





module.exports = {setNewUser, getUser}