/* eslint-disable consistent-return */
/* eslint-disable eqeqeq */
/* eslint-disable no-eq-null */
/* eslint-disable promise/always-return */
const sql = require('../database/sql')
const mssql = require( "mssql" );
var dbConfig = {
    server: '35.198.31.187',
    database: 'rumi-backend',
    user:'admin',
    password:'admin',
    options: {
        encrypt: true,
        enableArithAbort: true
        },
};

const helper = require('../helpers/helper')

const getParams = (body) => {
    return [
        { name: 'IdFirebase', sqltype: mssql.NVarChar, value: body.userId},
        { name: 'Ciudad', sqltype: mssql.NVarChar, value: body.ciudad},
        { name: 'Barrio', sqltype: mssql.NVarChar, value: body.barrio},
        { name: 'Direccion', sqltype: mssql.NVarChar,  value: body.direccion},
        { name: 'TipoHabitacion', sqltype: mssql.Bit,  value: body.tipoHabitacion},
        { name: 'TipoCama', sqltype: mssql.Bit,  value: body.tipoCama || false} ,
        { name: 'TamanoHabitacion', sqltype: mssql.Int,  value: body.tamanoHabitacion},
        { name: 'TamanoPropiedad', sqltype: mssql.Int,  value: body.tamanoPropiedad},
        { name: 'Chicas', sqltype: mssql.Int,  value: body.chicas},
        { name: 'Chicos', sqltype: mssql.Int,  value: body.chicos},
        { name: 'Otros', sqltype: mssql.Int,  value: body.otros },
        { name: 'HabitacionesInd', sqltype: mssql.Int,  value: body.habitacionesInd },
        { name: 'HabitacionesDob', sqltype: mssql.Int,  value: body.habitacionesDob },
        { name: 'BanosCompletos', sqltype: mssql.Int,  value: body.banosCompletos},
        { name: 'Toilettes', sqltype: mssql.Int,  value: body.toilettes },
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
        { name: 'AlquilerMensual', sqltype: mssql.Float,  value: body.alquilerMensual == 0.0 ? 0 : body.alquilerMensual},
        { name: 'DepositoGarantia', sqltype: mssql.Float,  value: body.depositoGarantia == 0.0 ? 0 : body.depositoGarantia},
        { name: 'ServicioLimpieza', sqltype: mssql.Bit,  value: body.servicioLimpieza || false},
        { name: 'Expensas', sqltype: mssql.Bit,  value: body.expensas || false},
        { name: 'TituloAnuncio', sqltype: mssql.NVarChar,  value: body.tituloAnuncio},
        { name: 'AlgoMas', sqltype: mssql.NVarChar,  value: body.algoMas },
        { name: 'Preferencia', sqltype: mssql.NVarChar,  value: body.preferencia},
        { name: 'EdadMin', sqltype: mssql.Int,  value: body.edadMin},
        { name: 'EdadMax', sqltype: mssql.Int,  value: body.edadMax},
        { name: 'ActividadPrincipal', sqltype: mssql.NVarChar,  value: body.actividadPrincipal},
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
        fotos.forEach(foto => fotosArray.push(foto.Value))
        result[0].Fotos = fotosArray
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
        await queryPrepared.query('INSERT INTO Propiedad (IdFirebase, Ciudad, Barrio, Direccion, TipoHabitacion, TipoCama, TamanoHabitacion, TamanoPropiedad, Chicas, Chicos, Otros, HabitacionesInd, HabitacionesDob, BanosCompletos, Toilettes, TV, WIFI, ACC, Calefaccion, Piscina, PropiedadACcesible , BanoPrivado, ACCHabitacion, Balcon, Fumar, Mascotas, Parejas, LGTB, AlquilerMensual, DepositoGarantia, ServicioLimpieza, Expensas, TituloAnuncio, AlgoMas, Preferencia, EdadMin, EdadMax, ActividadPrincipal) VALUES (@IdFirebase, @Ciudad, @Barrio, @Direccion, @TipoHabitacion, @TipoCama, @TamanoHabitacion, @TamanoPropiedad, @Chicas, @Chicos, @Otros, @HabitacionesInd, @HabitacionesDob, @BanosCompletos, @Toilettes, @TV, @WIFI, @ACC, @Calefaccion, @Piscina, @PropiedadACcesible , @BanoPrivado, @ACCHabitacion, @Balcon, @Fumar, @Mascotas, @Parejas, @LGTB, @AlquilerMensual, @DepositoGarantia, @ServicioLimpieza, @Expensas, @TituloAnuncio, @AlgoMas, @Preferencia, @EdadMin, @EdadMax, @ActividadPrincipal)').then((response) => {
        })
        const insertProperty = await getProperty(body.userId)
        await client.close()
        await insertFotos(insertProperty.idPropiedad, body.fotos)
        await updatePerfilProp(body.userId)
        result = insertProperty;
        // Cerramos la conexión
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
        queryPrepared.input('IdPropiedad', mssql.Int, property.IdPropiedad)
        // Ejecución de la query
        await queryPrepared.query('UPDATE Propiedad SET Ciudad = @Ciudad, Barrio = @Barrio, Direccion = @Direccion, TipoHabitacion = @TipoHabitacion, TipoCama = @TipoCama, TamanoHabitacion = @TamanoHabitacion, TamanoPropiedad = @TamanoPropiedad, Chicas = @Chicas, Chicos = @Chicos, Otros = @Otros, HabitacionesInd = @HabitacionesInd, HabitacionesDob = @HabitacionesDob, BanosCompletos = @BanosCompletos, Toilettes = @Toilettes, TV = @TV, WIFI = @WIFI, ACC = @ACC, Calefaccion = @Calefaccion, Piscina = @Piscina, PropiedadACcesible = @PropiedadACcesible, BanoPrivado = @BanoPrivado, ACCHabitacion = @ACCHabitacion, Balcon = @Balcon, Fumar = @Fumar, Mascotas = @Mascotas, Parejas = @Parejas, LGTB = @LGTB, AlquilerMensual = @AlquilerMensual, DepositoGarantia = @DepositoGarantia, ServicioLimpieza = @ServicioLimpieza, Expensas = @Expensas, TituloAnuncio = @TituloAnuncio, AlgoMas = @AlgoMas, Preferencia = @Preferencia, EdadMin = @EdadMin, EdadMax = @EdadMax, ActividadPrincipal = @ActividadPrincipal  WHERE IdPropiedad = @IdPropiedad').then((response) => {
            result = response
        })
        // Cerramos la conexión
        await client.close()
        await deleteFotos(property.IdPropiedad);
        await insertFotos(property.IdPropiedad, body.fotos);
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
                table.columns.add('IdPropiedad', mssql.Int, {nullable: true})
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

const updatePerfilProp = async (idFirebase) => {
    const client = await sql.getConnection()
    try{
        let queryPrepared = await client.request()
        // Injección de parametros
        queryPrepared.input('IdFirebase', mssql.NVarChar, idFirebase)
        // Ejecución de la query
        await queryPrepared.query('UPDATE Perfil SET TienePropiedad = 1  WHERE IdFirebase = @IdFirebase').then((response) => {
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


const deleteFotos = async (propertyId) => {
    const client = await sql.getConnection()
    try{
        let queryPrepared = await client.request()
        // Injección de parametros
        queryPrepared.input('IdPropiedad', mssql.NVarChar, propertyId)
        // Ejecución de la query
        await queryPrepared.query('DELETE FROM FotoPropiedad WHERE IdPropiedad = @IdPropiedad').then((response) => {
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



const formatProperty = (property) => {
    return { "userId": property.IdFirebase,
    "idPropiedad": property.IdPropiedad,
    "fotos": property.Fotos,
    "ciudad": helper.capitalizeLetters(property.Ciudad),
    "barrio": helper.capitalizeLetters(property.Barrio),
    "direccion": helper.capitalizeFirstLetter(property.Direccion),
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
    "tituloAnuncio": helper.capitalizeFirstLetter(property.TituloAnuncio),
    "algoMas": property.AlgoMas.charAt(0).toUpperCase() + property.AlgoMas.slice(1),
    "preferencia": helper.capitalizeFirstLetter(property.Preferencia),
    "edadMin": property.EdadMin,
    "edadMax": property.EdadMax,
    "actividadPrincipal": helper.capitalizeFirstLetter(property.ActividadPrincipal),
}
}

async function getPropertyDetails(propId) {
    let result;
    const client = await sql.getConnection()
    try{
        let queryPrepared = await client.request()
        // Parametros a insertar
        queryPrepared.input('propId', mssql.NVarChar, propId)
        // Ejecución de la query
        await queryPrepared.query('SELECT * FROM Propiedad WHERE IdPropiedad = @propId').then((response) => {
            result = response.recordset
        })
        // Cerramos la conexión
        await client.close()
        if(result[0] == null) return null
        fotos = await getFotos(result[0].IdPropiedad);
        fotosArray =[]
        fotos.forEach(foto => fotosArray.push(foto.Value))
        result[0].Fotos = fotosArray
        return formatDetails(result[0])
    }catch (err){
        console.dir(err)
        return err
    }
}

const formatDetails = (property) => {
    return { "userId": property.IdFirebase,
            "idPropiedad": property.IdPropiedad,
            "fotos": property.Fotos,
            "ciudad": helper.capitalizeLetters(property.Ciudad),
            "barrio": helper.capitalizeLetters(property.Barrio),
            "tipoHabitacion": property.TipoHabitacion,
            "tipoCama": property.TipoCama,
            "tamano": "Habitación " + property.TamanoHabitacion + "m2" + "\n" + "Propiedad " + property.TamanoPropiedad + "m2",
            "companeros": formatCompas(property.Chicas, "Chica") + formatCompas(property.Chicos, "Chico") + formatCompas(property.Otros, "Otros"),
            "habitaciones": property.HabitacionesInd + " Habitacion/es individual/es" + "\n" + property.HabitacionesDob + " Habitacion/es doble/s",
            "banos": property.BanosCompletos + " Baño/s completo/s" + "\n" + property.Toilettes + " Toilette/s",
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
            "tituloAnuncio": helper.capitalizeLetters(property.TituloAnuncio),
            "algoMas": property.AlgoMas.charAt(0).toUpperCase() + property.AlgoMas.slice(1),
            "preferenciaCompanero": property.Preferencia + "\n" + property.EdadMin + " a " + property.EdadMax + " años",
            "actividadPrincipal": helper.capitalizeFirstLetter(property.ActividadPrincipal),
        }
}


const formatCompas = (genero, texto) => {
    if(genero == 0){
        return ""
    }
    if(texto == "Otros" || genero == 1){
        return texto + " " + genero + " \n"
    }
    return texto + "/s " + genero + "\n"
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


module.exports = {createProperty, getProperty, updateProperty, getPropertyDetails}