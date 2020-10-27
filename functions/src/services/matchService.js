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

async function createProperty(body) {
    let result;
    const client = await sql.getConnection()
    try{
        let queryPrepared = await client.request()
        // Parametros a insertar
        var parameters = getParams(body)
        // Injección de parametros
        parameters.forEach(item => queryPrepared.input(item.name, item.sqltype, item.value))
        // Ejecución de la query
        await queryPrepared.query('INSERT INTO Propiedad (IdFirebase, Ciudad, Direccion, TipoHabitacion, TipoCama, TamanoHabitacion, TamanoPropiedad, Chicas, Chicos, Otros, HabitacionesInd, HabitacionesDob, BanosCompletos, Toilettes, TV, WIFI, ACC, Calefaccion, Piscina, PropiedadACcesible , BanoPrivado, ACCHabitacion, Balcon, Fumar, Mascotas, Parejas, LGTB, AlquilerMensual, DepositoGarantia, ServicioLimpieza, Expensas, TituloAnuncio, AlgoMas, Preferencia, EdadMin, EdadMax, ActividadPrincipal) VALUES (@IdFirebase, @Ciudad, @Direccion, @TipoHabitacion, @TipoCama, @TamanoHabitacion, @TamanoPropiedad, @Chicas, @Chicos, @Otros, @HabitacionesInd, @HabitacionesDob, @BanosCompletos, @Toilettes, @TV, @WIFI, @ACC, @Calefaccion, @Piscina, @PropiedadACcesible , @BanoPrivado, @ACCHabitacion, @Balcon, @Fumar, @Mascotas, @Parejas, @LGTB, @AlquilerMensual, @DepositoGarantia, @ServicioLimpieza, @Expensas, @TituloAnuncio, @AlgoMas, @Preferencia, @EdadMin, @EdadMax, @ActividadPrincipal)').then((response) => {
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

async function updateProperty(body) {
    let result;
    const client = await sql.getConnection()
    try{
        let queryPrepared = await client.request()
        // Parametros a insertar
        var parameters = getParams(body)
        // Injección de parametros
        parameters.forEach(item => queryPrepared.input(item.name, item.sqltype, item.value))
        // Ejecución de la query
        await queryPrepared.query('UPDATE Propiedad SET IdFirebase = @IdFirebase, Ciudad = @Ciudad, Direccion = @Direccion, TipoHabitacion = @TipoHabitacion, TipoCama = @TipoCama, TamanoHabitacion = @TamanoHabitacion, TamanoPropiedad = @TamanoPropiedad, Chicas = @Chicas, Chicos = @Chicos, Otros = @Otros, HabitacionesInd = @HabitacionesInd, HabitacionesDob = @HabitacionesDob, BanosCompletos = @BanosCompletos, Toilettes = @Toilettes, TV = @TV, WIFI = @WIFI, ACC = @ACC, Calefaccion = @Calefaccion, Piscina = @Piscina, PropiedadACcesible = @PropiedadACcesible, BanoPrivado = @BanoPrivado, ACCHabitacion = @ACCHabitacion, Balcon = @Balcon, Fumar = @Fumar, Mascotas = @Mascotas, Parejas = @Parejas, LGTB = @LGTB, AlquilerMensual = @AlquilerMensual, DepositoGarantia = @DepositoGarantia, ServicioLimpieza = @ServicioLimpieza, Expensas = @Expensas, TituloAnuncio = @TituloAnuncio, AlgoMas = @AlgoMas, Preferencia = @Preferencia, EdadMin = @EdadMin, EdadMax = @EdadMax, ActividadPrincipal = @ActividadPrincipal  WHERE IdFirebase = @IdFirebase').then((response) => {
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


module.exports = {createProperty, getMatchsByPropId,getMatchsByUserId, updateProperty}