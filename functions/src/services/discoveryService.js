/* eslint-disable eqeqeq */
/* eslint-disable no-eq-null */
/* eslint-disable promise/always-return */
const sql = require('../database/sql')
const mssql = require( "mssql" );
const helper = require('../helpers/helper')
const getParams = (body) => {
    const page = (body.page - 1) * 10
    return [
        { name: 'IdFirebase', sqltype: mssql.NVarChar, value: body.userId},        
        { name: 'Barrio', sqltype: mssql.NVarChar, value: body.barrio},        
        { name: 'Page', sqltype: mssql.Int, value: page},        
    ];
}


const getDiscovery = async (body) => {
    let result;
    const client = await sql.getConnection()
    try{
        let queryPrepared = await client.request()
        var parameters = getParams(body)
        parameters.forEach(item => queryPrepared.input(item.name, item.sqltype, item.value))
        // Ejecución de la query
        await queryPrepared.query("SELECT CONCAT(p.Nombre, ', ', p.Edad) AS nombrePropietario, fp.Value as Foto, pr.AlgoMas AS descripcion, pr.AlquilerMensual, pr.Barrio, pr.Ciudad, pr.TituloAnuncio, pr.IdFirebase as idPropietario, pr.IdPropiedad FROM Propiedad pr LEFT JOIN Perfil p ON pr.IdFirebase = p.IdFirebase OUTER APPLY (SELECT TOP 1 * FROM  FotoPropiedad f WHERE  pr.IdPropiedad = f.IdPropiedad) fp LEFT JOIN Perfil propio ON propio.IdFirebase = @IdFirebase WHERE pr.IdPropiedad NOT IN (SELECT IdPropiedad from Matchs WHERE IdFirebase = @IdFirebase) AND pr.IdPropiedad NOT iN (SELECT IdPropiedad from Rechazos WHERE IdFirebase = @IdFirebase) AND pr.Barrio = @Barrio AND (propio.Genero = pr.Preferencia OR pr.Preferencia = 'sin_preferencia') AND (propio.Edad BETWEEN pr.EdadMin AND pr.EdadMax) AND (propio.Dedicacion = 'estudio_trabajo' OR propio.Dedicacion = pr.ActividadPrincipal OR pr.ActividadPrincipal = 'sin_preferencia') ORDER BY nombrePropietario OFFSET @Page ROWS FETCH NEXT 10 ROWS ONLY").then((response) => {
            result = response.recordset
        })
        await client.close()
        if(result[0] == null) return { "propiedades": []}
        // Formateamos la respuesta
        const resultado = []
        result.forEach(item => resultado.push(formatDiscover(item)))
        const object = { "propiedades": resultado}
        return object
    }catch (err){
        console.dir(err)
        return err
    }

}

const getPropertyPreview = async (propId) => {
    let result;
    const client = await sql.getConnection()
    try{
        let queryPrepared = await client.request()
        queryPrepared.input('IdProperty', mssql.Int, propId)
        // Ejecución de la query
        await queryPrepared.query("SELECT p.Nombre , p.Edad , fp.Value AS Foto, pr.IdFirebase, pr.Ciudad, pr.Barrio, pr.TipoHabitacion, pr.TipoCama, pr.TamanoHabitacion, pr.TamanoPropiedad, pr.Chicas, pr.Chicos, pr.Otros, pr.HabitacionesDob, pr.HabitacionesInd, pr.BanosCompletos, pr.Toilettes, pr.TV, pr.WIFI, pr.ACC, pr.Calefaccion, pr.Piscina, pr.PropiedadACcesible, pr.BanoPrivado, pr. ACCHabitacion, pr.Balcon, pr.Fumar, pr.Mascotas, pr.Parejas, pr.LGTB, pr.AlquilerMensual, pr.DepositoGarantia, pr.ServicioLimpieza, pr.Expensas, pr.TituloAnuncio, pr.AlgoMas, pr.Preferencia, pr.EdadMin, pr.EdadMax, pr.ActividadPrincipal FROM Propiedad pr LEFT JOIN Perfil p ON p.IdFirebase = pr.IdFirebase OUTER APPLY (SELECT TOP 1 * FROM  FotoPropiedad f WHERE  pr.IdPropiedad = f.IdPropiedad) fp WHERE pr.IdPropiedad = @IdProperty").then((response) => {
            result = response.recordset
        })
        await client.close()
        if(result[0] == null) return {}
        // Formateamos la respuesta
        return formatPreview(result[0])
    }catch (err){
        console.dir(err)
        return err
    }
}

const formatDiscover = (result) => {
    return { "idPropietario": result.idPropietario,
            "idPropiedad": result.IdPropiedad,
            "foto": result.Foto,
            "resumenPropietario": result.nombrePropietario,
            "alquiler": "$" + result.AlquilerMensual,
            "titulo": helper.capitalizeFirstLetter(result.TituloAnuncio),
            "desc": helper.capitalizeFirstLetter(result.descripcion),
            "barrio": helper.capitalizeLetters(result.Barrio),
            "ciudad": helper.capitalizeLetters(result.Ciudad)
        }
}


const formatPreview = (property) => {
    return {
        "propietario": {
            "userId": property.IdFirebase,
            "nombre": helper.capitalizeLetters(property.Nombre),
            "edad": property.Edad,
            "foto": property.Foto 
        },
        "ciudad": helper.capitalizeLetters(property.Ciudad),
        "barrio": helper.capitalizeLetters(property.Barrio),
        "tipoHabitacion": property.TipoHabitacion,
        "tipoCama": property.TipoCama,
        "tamanoHabitacion": property.TamanoHabitacion == 0 ? null : property.TamanoHabitacion,
        "tamanoPropiedad": property.TamanoPropiedad == 0 ? null : property.TamanoPropiedad,
        "chicas": property.Chicas == 0 ? null : property.Chicas,
        "chicos": property.Chicos == 0 ? null : property.Chicos,
        "otros": property.Otros == 0 ? null : property.Otros,
        "habitacionesInd": property.HabitacionesInd == 0 ? null : property.HabitacionesInd,
        "habitacionesDob": property.HabitacionesDob == 0 ? null : property.HabitacionesDob,
        "banosCompletos": property.BanosCompletos == 0 ? null : property.BanosCompletos,
        "toilettes": property.Toilettes == 0 ? null : property.Toilettes,
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
        "algoMas": property.AlgoMas,
        "preferencia": helper.capitalizeFirstLetter(property.Preferencia),
        "edadMin": property.EdadMin == 0 ? null : property.EdadMin,
        "edadMax": property.EdadMax == 0 ? null : property.EdadMax,
        "actividadPrincipal": helper.capitalizeFirstLetter(property.ActividadPrincipal),
    }
}

module.exports = {getDiscovery, getPropertyPreview}
