/* eslint-disable consistent-return */
/* eslint-disable eqeqeq */
/* eslint-disable no-eq-null */
/* eslint-disable promise/always-return */
const sql = require('../database/sql')
const mssql = require( "mssql" );

const getParams = (body) => {
    return [
        { name: 'IdFirebase', sqltype: mssql.NVarChar, value: body.userId},
        { name: 'Ciudad', sqltype: mssql.NVarChar, value: body.ciudad},
        { name: 'Direccion', sqltype: mssql.NVarChar,  value: body.direccion},
        { name: 'TipoHabitacion', sqltype: mssql.Int,  value: body.tipoHabitacion},
        { name: 'TipoCama', sqltype: mssql.NVarChar,  value: body.tipoCama},
        { name: 'TamanoHabitacion', sqltype: mssql.NVarChar,  value: body.tamanoHabitacion},
        { name: 'TamanoPropiedad', sqltype: mssql.NVarChar,  value: body.tamanoPropiedad},
        { name: 'Chicas', sqltype: mssql.Int,  value: body.chicas},
        { name: 'Chicos', sqltype: mssql.Int,  value: body.chicos},
        { name: 'Otros', sqltype: mssql.Bit,  value: body.otros || false},
        { name: 'HabitacionesInd', sqltype: mssql.Bit,  value: body.habitacionesInd || false},
        { name: 'HabitacionesDob', sqltype: mssql.Bit,  value: body.habitacionesDob || false},
        { name: 'BanosCompletos', sqltype: mssql.Bit,  value: body.banosCompletos || false},
        { name: 'Toilettes', sqltype: mssql.Bit,  value: body.toilettes || false},
        { name: 'TV', sqltype: mssql.Bit,  value: body.comodidadProp.tv || false},
        { name: 'WIFI', sqltype: mssql.Bit,  value: body.comodidadProp.wifi || false},
        { name: 'ACC', sqltype: mssql.Bit,  value: body.comodidadProp.acc || false},
        { name: 'Calefaccion', sqltype: mssql.Bit,  value: body.comodidadProp.calefaccion || false},
        { name: 'Piscina', sqltype: mssql.Bit,  value: body.comodidadProp.piscina || false},
        { name: 'PropiedadACcesible', sqltype: mssql.Bit,  value: body.comodidadProp.propidadAccesible || false},
        { name: 'BanoPrivado', sqltype: mssql.Bit,  value: body.comodidadHab.banoPrivado || false},
        { name: 'ACCHabitacion', sqltype: mssql.Bit,  value: body.comodidadHab.accHabitacion || false},
        { name: 'Balcon', sqltype: mssql.Bit,  value: body.comodidadHab.balcon || false},
        { name: 'Fumar', sqltype: mssql.Bit,  value: body.normas.fumar || false},
        { name: 'Mascotas', sqltype: mssql.Bit,  value: body.normas.mascotas || false},
        { name: 'Parejas', sqltype: mssql.Bit,  value: body.normas.parejas || false},
        { name: 'LGTB', sqltype: mssql.Bit,  value: body.normas.lgtb || false},
        { name: 'AlquilerMensual', sqltype: mssql.Bit,  value: body.alquilerMensual || false},
        { name: 'DepositoGarantia', sqltype: mssql.Bit,  value: body.depositoGarantia || false},
        { name: 'ServicioLimpieza', sqltype: mssql.Bit,  value: body.servicioLimpieza || false},
        { name: 'Expensas', sqltype: mssql.Bit,  value: body.expensas || false},
        { name: 'TituloAnuncio', sqltype: mssql.Bit,  value: body.tituloAnuncio || false},
        { name: 'AlgoMas', sqltype: mssql.Bit,  value: body.algoMas || false},
        { name: 'Preferencia', sqltype: mssql.Bit,  value: body.preferencia},
        { name: 'EdadMin', sqltype: mssql.Bit,  value: body.edadMin || false},
        { name: 'EdadMax', sqltype: mssql.Bit,  value: body.edadMax || false},
        { name: 'ActividadPrincipal', sqltype: mssql.Bit,  value: body.actividadPrincipal || false},
    ];
}

async function getProperty(userId) {
    let result;
    const client = await sql.getConnection()
    try{
        let queryPrepared = await client.request()
        // Parametros a insertar
        queryPrepared.input('userId', mssql.NVarChar, userId)
        // Ejecución de la query
        await queryPrepared.query('SELECT * FROM Propiedad WHERE IdFirebase = @userId').then((response) => {
            result = response.recordset
        })
        // Cerramos la conexión
        await client.close()
        if(result[0] == null) return null
        fotos = await getFotos(result[0].IdPropiedad);

        fotosArray =[]

        fotos.forEach(foto => fotosArray.push(foto.value))
        return formatProperty(result[0])
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
        const insertProperty = await getProperty(body.userId)
        await insertFotos(insertProperty.idPropiedad, body.fotos)
        // Cerramos la conexión
        await client.close()
        return result
    }catch (err){
        console.dir(err)
        return err
    }
}

async function updateProperty(body, property) {
    let result;
    const client = await sql.getConnection()
    try{
        let queryPrepared = await client.request()
        // Parametros a insertar
        var parameters = getParams(body)
        // Injección de parametros
        parameters.forEach(item => queryPrepared.input(item.name, item.sqltype, item.value))
        queryPrepared.input( { name: 'IdPropiedad', sqltype: mssql.Int, value: property.IdPropiedad},)
        // Ejecución de la query
        await queryPrepared.query('UPDATE Propiedad SET Ciudad = @Ciudad, Direccion = @Direccion, TipoHabitacion = @TipoHabitacion, TipoCama = @TipoCama, TamanoHabitacion = @TamanoHabitacion, TamanoPropiedad = @TamanoPropiedad, Chicas = @Chicas, Chicos = @Chicos, Otros = @Otros, HabitacionesInd = @HabitacionesInd, HabitacionesDob = @HabitacionesDob, BanosCompletos = @BanosCompletos, Toilettes = @Toilettes, TV = @TV, WIFI = @WIFI, ACC = @ACC, Calefaccion = @Calefaccion, Piscina = @Piscina, PropiedadACcesible = @PropiedadACcesible, BanoPrivado = @BanoPrivado, ACCHabitacion = @ACCHabitacion, Balcon = @Balcon, Fumar = @Fumar, Mascotas = @Mascotas, Parejas = @Parejas, LGTB = @LGTB, AlquilerMensual = @AlquilerMensual, DepositoGarantia = @DepositoGarantia, ServicioLimpieza = @ServicioLimpieza, Expensas = @Expensas, TituloAnuncio = @TituloAnuncio, AlgoMas = @AlgoMas, Preferencia = @Preferencia, EdadMin = @EdadMin, EdadMax = @EdadMax, ActividadPrincipal = @ActividadPrincipal  WHERE IdPropiedad = @IdPropiedad').then((response) => {
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


const insertFotos = async (propertyId, fotos) => {
    try{
        await mssql.connect(dbConfig)
        .then(() => {
                const table = new mssql.Table('FotoPropiedad')
                table.create = false
                table.columns.add('IdPropiedad', mssql.NVarChar(65), {nullable: true})
                table.columns.add('Value', mssql.NVarChar(mssql.MAX), {nullable: true})
                if (fotos != null){
                    fotos.forEach(foto => {
                        table.rows.add(propertyId, foto)
                    })
                }
                const request = new mssql.Request();
                request.bulk(table, (err, result) => {
                    if(err != null){
                        console.dir(err)
                    }else{
                        console.dir(result)
                    }
                })
            })
    }
    catch (err){
        console.dir(err)
        return err
    }
}



const formatProperty = (property) => {
    return { "userId": property.IdFirebase,
            "idPropiedad": property.IdPropiedad,
            "fotos": property.fotos,
            "ciudad": property.Ciudad,
            "direccion": property.Direccion,
            "tipoHabitacion": property.TipoHabitacion,
            "tipoCama": property.TipoCama,
            "tamanoHabitacion": property.TamanoHabitacion,
            "tamanoPropiedad": property.TamanoPropiedad,
            "chicas": property.Chicas,
            "chicos": property.Chicos,
            "otros": property.Otros,
            "habitacionesInd": property.HabitacionesInd,
            "habitacionesDob": property.HabitacionesDob,
            "banosCompletos": property.BanosCompletos,
            "toilettes": property.Toilettes,
            "comodidadProp": {
                "tv": property.TV,
                "wifi": property.WIFI,
                "acc": property.ACC,
                "calefaccion": property.Calefaccion,
                "piscina": property.Piscina,
                "propidadAccesible": property.PropiedadACcesible
            },
            "comodidadHab": {
                "banoPrivado": property.BanoPrivado,
                "accHabitacion": property.ACCHabitacion,
                "balcon": property.Balcon,
            },
            "normas": {
                "fumar": property.Fumar,
                "mascotas": property.Mascotas,
                "parejas": property.Parejas,
                "lgtb": property.LGTB,
                
            },
            "alquilerMensual": property.AlquilerMensual,
            "depositoGarantia": property.DepositoGarantia,
            "servicioLimpieza": property.ServicioLimpieza,
            "expensas": property.Expensas,
            "tituloAnuncio": property.TituloAnuncio,
            "algoMas": property.AlgoMas,
            "preferencia": property.Preferencia,
            "edadMin": property.EdadMin,
            "edadMax": property.EdadMax,
            "actividadPrincipal": property.ActividadPrincipal,
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


module.exports = {createProperty, getProperty, updateProperty}