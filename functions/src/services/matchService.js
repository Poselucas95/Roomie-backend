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
        queryPrepared.input('IdFirebase', mssql.NVarChar, userId)
        // Ejecución de la query
        await queryPrepared.query('SELECT M.*, PR.IdFirebase as idPropietario, PR.AlquilerMensual,PR.TipoHabitacion, PR.TamanoHabitacion, PR.Ciudad , PR.Barrio, fp.Value as Foto, P.Nombre, P.Edad FROM Matchs M  INNER JOIN Propiedad PR ON PR.IdPropiedad = M.IdPropiedad INNER JOIN Perfil P ON P.IdFirebase = PR.IdFirebase OUTER APPLY (SELECT TOP 1 * FROM   FotoPropiedad f WHERE  M.IdPropiedad = f.IdPropiedad) fp WHERE M.IdFirebase =  @IdFirebase').then((response) => {
            result = response.recordset
        })
        // Cerramos la conexión
        await client.close()
        if(result[0] == null) return null
        const resultado = []
        result.forEach(item => resultado.push(formatMatchsByUserId(item)))
        return resultado
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
        queryPrepared.input('IdPropiedad', mssql.Int, propertyId)
        // Ejecución de la query
        await queryPrepared.query('SELECT M.*, P.Nombre, P.Edad, P.Genero, P.Dedicacion, fp.Value as Foto FROM Matchs M  INNER JOIN Perfil P ON P.IdFirebase = M.IdFirebase  OUTER APPLY (SELECT TOP 1 * FROM   FotoPerfil f WHERE  M.IdFirebase = f.IdFirebase) fp WHERE M.IdPropiedad = @IdPropiedad').then((response) => {
            result = response.recordset
        })
        // Cerramos la conexión
        await client.close()
        if(result[0] == null) return null
        const resultado = []
        result.forEach(item => resultado.push(formatMatchsByPropId(item)))
        return resultado
    }catch (err){
        console.dir(err)
        return err
    }
}
async function getMatchsPending(propertyId) {
    let result;
    const client = await sql.getConnection()
    try{
        let queryPrepared = await client.request()
        // Parametros a insertar
        queryPrepared.input('IdPropiedad', mssql.Int, propertyId)
        // Ejecución de la query
        await queryPrepared.query("SELECT COUNT(IdFirebase) AS notificacion FROM Matchs WHERE Estado = 'Pendiente' AND IdPropiedad = @IdPropiedad").then((response) => {
            result = response.recordset
        })
        // Cerramos la conexión
        await client.close()
        if(result[0] === null) return null
        if (result[0].notificacion === 1){
            result[0].notificacion = 'Tienes '+ result[0].notificacion +' interesado en la seccion favoritos';
        }else if (result[0].notificacion === 0){
            result[0].notificacion = 'No tienes interesados en la seccion favoritos';
        }else{
            result[0].notificacion = 'Tienes '+ result[0].notificacion +' interesados en la seccion favoritos';
        }
        // console.log(result[0]);
        return result
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

async function existMatch(userId, propId) {
    let result;
    const client = await sql.getConnection()
    try{
        let queryPrepared = await client.request()
        // Parametros a insertar
        queryPrepared.input('IdFirebase', mssql.NVarChar, userId)
        queryPrepared.input('IdPropiedad', mssql.NVarChar, propId)
        // Ejecución de la query
        await queryPrepared.query('SELECT * FROM Matchs where IdFirebase = @IdFirebase AND IdPropiedad = @IdPropiedad').then((response) => {
            result = response.recordset
        })
        // Cerramos la conexión
        await client.close()
        if(result[0] == null) return null
        return result[0]
    }catch (err){
        console.dir(err)
        return err
    }
}


const formatMatchsByUserId = (match) => {
    return { "userId": match.IdFirebase,
            "idPropiedad": match.IdPropiedad,
            "estado": match.Estado,
            "idPropietario": match.idPropietario,
            "alquilerMensual": match.AlquilerMensual,
            "tipoHabitacion": match.TipoHabitacion,
            "tamanoHabitacion": match.TamanoHabitacion,
            "ciudad": match.Ciudad,
            "barrio": match.Barrio,
            "foto": match.Foto,
            "nombre": match.Nombre,
            "edad": match.Edad
        }
}

const formatMatchsByPropId = (match) => {
    return { "userId": match.IdFirebase,
            "idPropiedad": match.IdPropiedad,
            "estado": match.Estado,
            "nombre": match.Nombre,
            "edad": match.Edad,
            "genero": match.Genero,
            "dedicacion": match.Dedicacion,
            "foto": match.Foto
        }
}


module.exports = {createMatch, getMatchsByPropId,getMatchsByUserId, updateMatch, getMatchsPending, existMatch}