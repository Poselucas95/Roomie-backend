/* eslint-disable eqeqeq */
/* eslint-disable no-eq-null */
/* eslint-disable promise/always-return */
const sql = require('../database/sql')
const mssql = require( "mssql" );

const getParams = (body) => {
    return [
        { name: 'IdFirebase', sqltype: mssql.NVarChar, value: body.userId},
        { name: 'IdPropiedad', sqltype: mssql.Int, value: body.idPropiedad},
        { name: 'Estado', sqltype: mssql.NVarChar,  value: body.estado},
        
    ];
}

async function getMatchsByUserId(userId) {
    let result;
    const client = await sql.getConnection()
    try{
        let queryPrepared = await client.request()
        // Parametros a insertar
        queryPrepared.input('userId', mssql.NVarChar, userId)
        // Ejecución de la query
        await queryPrepared.query('SELECT * FROM Matchs WHERE IdFirebase = @userId').then((response) => {
            result = response.recordset
        })
        // Cerramos la conexión
        await client.close()
        if(result[0] == null) return null
        return formatMatchs(result[0])
    }catch (err){
        console.dir(err)
        return err
    }
}
async function getMatchsByPropId(propertyId) {
    let result;
    const client = await sql.getConnection()
    try{
        let queryPrepared = await client.request()
        // Parametros a insertar
        queryPrepared.input('propertyId', mssql.Int, propertyId)
        // Ejecución de la query
        await queryPrepared.query('SELECT * FROM Matchs WHERE IdPropiedad = @propertyId').then((response) => {
            result = response.recordset
        })
        // Cerramos la conexión
        await client.close()
        if(result[0] == null) return null
        return formatMatchs(result[0])
    }catch (err){
        console.dir(err)
        return err
    }
}

async function createMatch(body) {
    let result;
    const client = await sql.getConnection()
    try{
        let queryPrepared = await client.request()
        // Parametros a insertar
        var parameters = getParams(body)
        // Injección de parametros
        parameters.forEach(item => queryPrepared.input(item.name, item.sqltype, item.value))
        // Ejecución de la query
        await queryPrepared.query('INSERT INTO Matchs (IdFirebase, IdPropiedad, Estado) VALUES (@IdFirebase, @IdPropiedad, @Estado)').then((response) => {
            result = response
        })
        // Cerramos la conexión
        await client.close()
        return result
    }catch (err){
        console.dir(err)
        return err
    }
}

async function updateMatch(body) {
    let result;
    const client = await sql.getConnection()
    try{
        let queryPrepared = await client.request()
        // Parametros a insertar
        var parameters = getParams(body)
        // Injección de parametros
        parameters.forEach(item => queryPrepared.input(item.name, item.sqltype, item.value))
        // Ejecución de la query
        await queryPrepared.query('UPDATE Matchs SET Estado = @estado  WHERE IdFirebase = @IdFirebase OR IdPropiedad = @IdPropiedad').then((response) => {
            result = response
        })
        // Cerramos la conexión
        await client.close()
        return result
    }catch (err){
        console.dir(err)
        return err
    }
}


const formatMatchs = (match) => {
    return { "IdFirebase": match.IdFirebase,
            "idPropiedad": match.IdPropiedad,
            "estado": match.Estado
        }
}

const getFotos = async (propertyId) => {
    let result;
    const client = await sql.getConnection()
    try{
        let queryPrepared = await client.request()
        // Parametros a insertar
        queryPrepared.input('propertyId', mssql.NVarChar, propertyId)
        // Ejecución de la query
        await queryPrepared.query('SELECT Value FROM FotoPropiedad WHERE IdPropiedad = @propertyId').then((response) => {
            result = response.recordset
        })
        // Cerramos la conexión
        await client.close()
        if(result[0] == null) return []
        return result
    }catch (err){
        console.dir(err)
        return err
    }
}


module.exports = {createMatch, getMatchsByPropId,getMatchsByUserId, updateMatch}