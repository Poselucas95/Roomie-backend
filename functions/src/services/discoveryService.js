/* eslint-disable eqeqeq */
/* eslint-disable no-eq-null */
/* eslint-disable promise/always-return */
const sql = require('../database/sql')
const mssql = require( "mssql" );

const getParams = (body) => {
    return [
        { name: 'IdFirebase', sqltype: mssql.NVarChar, value: body.userId},        
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
        await queryPrepared.query("SELECT pr.AlquilerMensual, pr.Direccion, pr.TituloAnuncio, pr.IdFirebase as idPropietario, pr.IdPropiedad FROM Propiedad pr WHERE pr.IdPropiedad NOT iN (SELECT IdPropiedad from Matchs WHERE IdFirebase = IdFirebase) AND pr.IdPropiedad NOT iN (SELECT IdPropiedad from Rechazos WHERE IdFirebase = @IdFirebase)").then((response) => {
            result = response.recordset
        })
        await client.close()
        if(result[0] == null) return []
        // Formateamos la respuesta
        const resultado = []
        result.forEach(item => resultado.push(formatDiscover(item)))
        return resultado
    }catch (err){
        console.dir(err)
        return err
    }

}

const formatDiscover = (result) => {
    return { "idPropietario": result.idPropietario,
            "idPropiedad": result.IdPropiedad,
            "alquiler": result.AlquilerMensual,
            "direccion": result.Direccion,
            "titulo": result.TituloAnuncio,
        }
}

module.exports = {getDiscovery}
