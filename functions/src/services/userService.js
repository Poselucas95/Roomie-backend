/* eslint-disable consistent-return */
/* eslint-disable promise/always-return */
const sql = require('../database/sql')
const mssql = require( "mssql" );


const getParams = (body) => {
    return [
        { name: 'IdFirebase', sqltype: mssql.NVarChar, value: body.userId},
        { name: 'Nombre', sqltype: mssql.NVarChar, value: body.nombre},
        { name: 'Apellido', sqltype: mssql.NVarChar,  value: body.apellido},
        { name: 'Edad', sqltype: mssql.Int,  value: body.edad},
        { name: 'Dni', sqltype: mssql.NVarChar,  value: body.dni},
        { name: 'Mail', sqltype: mssql.NVarChar,  value: body.email},
        { name: 'Apodo', sqltype: mssql.NVarChar,  value: body.apodo},
        { name: 'Genero', sqltype: mssql.Int,  value: body.genero},
        { name: 'Dedicacion', sqltype: mssql.Int,  value: body.dedicacion},
        { name: 'Activo', sqltype: mssql.Bit,  value: body.personalidad.activo || false},
        { name: 'Colaborador', sqltype: mssql.Bit,  value: body.personalidad.colaborador || false},
        { name: 'FacilDeLlevar', sqltype: mssql.Bit,  value: body.personalidad.facilDeLlevar || false},
        { name: 'Ordenado', sqltype: mssql.Bit,  value: body.personalidad.ordenado || false},
        { name: 'Relajado', sqltype: mssql.Bit,  value: body.personalidad.relajado || false},
        { name: 'Sociable', sqltype: mssql.Bit,  value: body.personalidad.sociable || false},
        { name: 'Artista', sqltype: mssql.Bit,  value: body.estilo.artista || false},
        { name: 'Deportista', sqltype: mssql.Bit,  value: body.estilo.deportista || false},
        { name: 'Cinefilo', sqltype: mssql.Bit,  value: body.estilo.cinefilo || false},
        { name: 'Madrugador', sqltype: mssql.Bit,  value: body.estilo.madrugador || false},
        { name: 'Melomano', sqltype: mssql.Bit,  value: body.estilo.melomano || false},
        { name: 'Nocturno', sqltype: mssql.Bit,  value: body.estilo.nocturno || false},
        { name: 'Electronica', sqltype: mssql.Bit,  value: body.musica.electronica || false},
        { name: 'Latina', sqltype: mssql.Bit,  value: body.musica.latina || false},
        { name: 'Metal', sqltype: mssql.Bit,  value: body.musica.metal || false},
        { name: 'Punk', sqltype: mssql.Bit,  value: body.musica.punk || false},
        { name: 'Reggaeton', sqltype: mssql.Bit,  value: body.musica.reggaeton || false},
        { name: 'Boxeo', sqltype: mssql.Bit,  value: body.deporte.boxeo || false},
        { name: 'Rugby', sqltype: mssql.Bit,  value: body.deporte.rugby || false},
        { name: 'Running', sqltype: mssql.Bit,  value: body.deporte.running || false},
        { name: 'Tennis', sqltype: mssql.Bit,  value: body.deporte.tennis || false},
        { name: 'Baloncesto', sqltype: mssql.Bit,  value: body.deporte.baloncesto || false},
        { name: 'Futbol', sqltype: mssql.Bit,  value: body.deporte.futboll || false},
        { name: 'Accion', sqltype: mssql.Bit,  value: body.peliculas.accion || false},
        { name: 'Animacion', sqltype: mssql.Bit,  value: body.peliculas.animacion},
        { name: 'Comedia', sqltype: mssql.Bit,  value: body.peliculas.comedia || false},
        { name: 'Terror', sqltype: mssql.Bit,  value: body.peliculas.terror || false},
        { name: 'Romanticas', sqltype: mssql.Bit,  value: body.peliculas.romanticas || false},
        { name: 'CienciaFiccion', sqltype: mssql.Bit,  value: body.peliculas.cienciaFiccion || false},
        { name: 'Instagram', sqltype: mssql.NVarChar,  value: body.instagram},
        { name: 'Twitter', sqltype: mssql.NVarChar,  value: body.twitter},
        { name: 'LinkedIn', sqltype: mssql.NVarChar,  value: body.linkedin},
        { name: 'Facebook', sqltype: mssql.NVarChar,  value: body.facebook},
        { name: 'Descripcion', sqltype: mssql.NVarChar,  value: body.descripcion},
    ];
}

async function getUser(userId) {
    let result;
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
        console.dir(result)
        return result[0]
    }catch (err){
        console.dir(err)
    }
}

async function createUser(body) {
    let result;
    const client = await sql.getConnection()
    try{
        let queryPrepared = await client.request()
        // Parametros a insertar
        var parameters = getParams(body)
        // Injección de parametros
        parameters.forEach(item => queryPrepared.input(item.name, item.sqltype, item.value))
        // Ejecución de la query
        await queryPrepared.query('INSERT INTO Perfil (IdFirebase, Nombre, Apellido, Edad, Dni, Mail, Apodo, Genero, Dedicacion, Activo, Colaborador, FacilDeLlevar, Ordenado, Relajado, Sociable, Artista, Deportista, Cinefilo, Madrugador, Melomano , Nocturno, Electronica, Latina, Metal, Punk, Reggaeton, Boxeo, Rugby, Running, Tennis, Baloncesto, Futbol, Accion, Animacion, Comedia, Terror, Romanticas, CienciaFiccion, Instagram, Twitter, LinkedIn, Facebook, Descripcion) VALUES (@IdFirebase, @Nombre, @Apellido, @Edad, @Dni, @Mail, @Apodo, @Genero, @Dedicacion, @Activo, @Colaborador, @FacilDeLlevar, @Ordenado, @Relajado, @Sociable, @Artista, @Deportista, @Cinefilo, @Madrugador, @Melomano, @Nocturno, @Electronica, @Latina, @Metal, @Punk, @Reggaeton, @Boxeo, @Rugby, @Running, @Tennis, @Baloncesto, @Futbol, @Accion, @Animacion, @Comedia, @Terror, @Romanticas, @CienciaFiccion, @Instagram, @Twitter, @LinkedIn, @Facebook, @Descripcion)').then((response) => {
            result = response
        })
        // Cerramos la conexión
        await client.close()
        return result
    }catch (err){
        console.dir(err)
    }
}

async function updateUser(body) {
    let result;
    const client = await sql.getConnection()
    try{
        let queryPrepared = await client.request()
        // Parametros a insertar
        var parameters = getParams(body)
        // Injección de parametros
        parameters.forEach(item => queryPrepared.input(item.name, item.sqltype, item.value))
        // Ejecución de la query
        await queryPrepared.query('UPDATE Perfil SET Nombre = @Nombre, Apellido = @Apellido, Edad = @Edad, Dni = @Dni, Mail = @Mail, Apodo = @Apodo, Genero = @Genero, Dedicacion = @Dedicacion, Activo = @Activo, Colaborador = @Colaborador, FacilDeLlevar = @FacilDeLlevar, Ordenado = @Ordenado, Relajado = @Relajado, Sociable = @Sociable, Artista = @Artista, Deportista = @Deportista, Cinefilo = @Cinefilo, Madrugador = @Madrugador, Melomano = @Melomano , Nocturno = @Nocturno, Electronica = @Electronica, Latina = @Latina, Metal = @Metal, Punk = @Punk, Reggaeton = @Reggaeton, Boxeo = @Boxeo, Rugby = @Rugby, Running = @Running, Tennis = @Tennis, Baloncesto = @Baloncesto, Futbol = @Futbol, Accion = @Accion, Animacion = @Animacion, Comedia = @Comedia, Terror = @Terror, Romanticas = @Romanticas, CienciaFiccion = @CienciaFiccion, Instagram = @Instagram, Twitter = @Twitter, LinkedIn = @LinkedIn, Facebook = @Facebook, Descripcion = @Descripcion WHERE IdFirebase = @IdFirebase').then((response) => {
            result = response
        })
        // Cerramos la conexión
        await client.close()
        return result
    }catch (err){
        console.dir(err)
    }
}



module.exports = {createUser, getUser, updateUser}