/* eslint-disable eqeqeq */
/* eslint-disable no-eq-null */
/* eslint-disable promise/always-return */
const sql = require('../database/sql')
const mssql = require( "mssql" );

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
        await queryPrepared.query("SELECT CONCAT(p.Nombre, ', ', p.Edad) AS nombrePropietario, fp.Value as Foto, pr.AlgoMas AS descripcion, pr.AlquilerMensual, pr.Barrio, pr.Ciudad, pr.TituloAnuncio, pr.IdFirebase as idPropietario, pr.IdPropiedad FROM Propiedad pr LEFT JOIN Perfil p ON pr.IdFirebase = p.IdFirebase OUTER APPLY (SELECT TOP 1 * FROM  FotoPropiedad f WHERE  pr.IdPropiedad = f.IdPropiedad) fp WHERE pr.IdPropiedad NOT iN (SELECT IdPropiedad from Matchs WHERE IdFirebase = @IdFirebase) AND pr.IdPropiedad NOT iN (SELECT IdPropiedad from Rechazos WHERE IdFirebase = @IdFirebase) AND pr.Barrio = @Barrio ORDER BY nombrePropietario OFFSET @Page ROWS FETCH NEXT 10 ROWS ONLY").then((response) => {
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

const formatDiscover = (result) => {
    return { "idPropietario": result.idPropietario,
            "idPropiedad": result.IdPropiedad,
            "foto": result.Foto,
            "resumenPropietario": result.nombrePropietario,
            "alquiler": "$" + result.AlquilerMensual,
            "titulo": result.TituloAnuncio,
            "desc": result.descripcion,
            "barrio": result.Barrio,
            "ciudad": result.Ciudad
        }
}

module.exports = {getDiscovery}
