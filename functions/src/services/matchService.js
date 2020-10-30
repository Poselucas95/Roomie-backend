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
        await queryPrepared.query('SELECT M.*, P.Nombre, P.Edad, P.Genero, P.Dedicacion FROM Matchs M INNER JOIN Perfil P ON P.IdFirebase = M.IdFirebase WHERE M.IdFirebase = @userId').then((response) => {
            result = response.recordset
        })
        // Cerramos la conexión
        await client.close()
        if(result[0] == null) return null
        foto = await getFotosPerfil(result[0].IdFirebase);

        result[0].Foto = foto
        return formatMatchsByUserId(result[0])
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
        await queryPrepared.query('SELECT M.*, PR.AlquilerMensual,PR.TipoHabitacion, PR.TamanoHabitacion, PR.Ciudad ,P.Nombre, P.Edad FROM Matchs M INNER JOIN Propiedad PR ON PR.IdPropiedad = M.IdPropiedad INNER JOIN Perfil P ON P.IdFirebase = PR.IdFirebase WHERE M.IdPropiedad = @propertyId').then((response) => {
            result = response.recordset
        })
        // Cerramos la conexión
        await client.close()
        if(result[0] == null) return null
        foto = await getFotosPropiedad(result[0].IdPropiedad);

        result[0].Foto = foto
        return formatMatchsByPropId(result[0])
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


const formatMatchsByPropId = (match) => {
    return { "userId": match.IdFirebase,
            "idPropiedad": match.IdPropiedad,
            "estado": match.Estado,
            "alquilerMensual": match.AlquilerMensual,
            "tipoHabitacion": match.TipoHabitacion,
            "tamanoHabitacion": match.TamanoHabitacion,
            "ciudad": match.Ciudad,
            "nombre": match.Nombre,
            "edad": match.Edad,
            "foto": match.Foto
        }
}


const formatMatchsByUserId = (match) => {
    return { "userId": match.IdFirebase,
            "idPropiedad": match.IdPropiedad,
            "estado": match.Estado,
            "nombre": match.Nombre,
            "Edad": match.Edad,
            "Genero": match.Genero,
            "Dedicacion": match.Dedicacion,
            "Foto": match.Foto
        }
}

const getFotosPropiedad = async (propertyId) => {
    let result;
    const client = await sql.getConnection()
    try{
        let queryPrepared = await client.request()
        // Parametros a insertar
        queryPrepared.input('propertyId', mssql.NVarChar, propertyId)
        // Ejecución de la query
        await queryPrepared.query('SELECT TOP 1 Value FROM FotoPropiedad WHERE IdPropiedad = @propertyId').then((response) => {
            result = response.recordset[0].Value
        })
        // Cerramos la conexión
        await client.close()
        if(result == null) return null
        return result
    }catch (err){
        console.dir(err)
        return err
    }
}

const getFotosPerfil = async (userId) => {
    let result;
    const client = await sql.getConnection()
    try{
        let queryPrepared = await client.request()
        // Parametros a insertar
        queryPrepared.input('userId', mssql.NVarChar, userId)
        // Ejecución de la query
        await queryPrepared.query('SELECT TOP 1 Value FROM FotoPerfil WHERE IdFirebase = @userId').then((response) => {
            result = response.recordset[0].Value
        })
        // Cerramos la conexión
        await client.close()
        if(result == null) return null
        return result
    }catch (err){
        console.dir(err)
        return err
    }
}


module.exports = {createMatch, getMatchsByPropId,getMatchsByUserId, updateMatch}