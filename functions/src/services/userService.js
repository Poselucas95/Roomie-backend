/* eslint-disable prefer-arrow-callback */
/* eslint-disable promise/catch-or-return */
/* eslint-disable no-eq-null */
/* eslint-disable eqeqeq */
/* eslint-disable consistent-return */
/* eslint-disable promise/always-return */
const sql = require('../database/sql');
const api = require('../api/azureApi');
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

const helper = require('../helpers/helper');

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
        // Si el usuario NO existe, devolvemos null
        if(result[0] == null) return null
        // Me traigo las fotos
        fotos = await getFotos(userId);
        // Inyectamos en un array el value directamente
        fotosArray = []
        fotos.forEach(foto => fotosArray.push(foto.Value))
        // Le inyectamos las fotos
        result[0].Fotos = fotosArray
        // Formateamos la respuesta
        return formatUser(result[0])
    }catch (err){
        console.dir(err)
        return err
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
        await queryPrepared.query('INSERT INTO Perfil (IdFirebase, Nombre, Apellido, Edad, Dni, Mail, EsPropietario, Apodo, Genero, Dedicacion, Activo, Colaborador, FacilDeLlevar, Ordenado, Relajado, Sociable, Artista, Deportista, Cinefilo, Madrugador, Melomano , Nocturno, Electronica, Rock, Latina, Metal, Punk, Reggaeton, Boxeo, Rugby, Running, Tennis, Baloncesto, Futbol, Accion, Animacion, Comedia, Terror, Romanticas, CienciaFiccion, Instagram, Twitter, LinkedIn, Facebook, Descripcion) VALUES (@IdFirebase, @Nombre, @Apellido, @Edad, @Dni, @Mail, @EsPropietario, @Apodo, @Genero, @Dedicacion, @Activo, @Colaborador, @FacilDeLlevar, @Ordenado, @Relajado, @Sociable, @Artista, @Deportista, @Cinefilo, @Madrugador, @Melomano, @Nocturno, @Electronica, @Rock, @Latina, @Metal, @Punk, @Reggaeton, @Boxeo, @Rugby, @Running, @Tennis, @Baloncesto, @Futbol, @Accion, @Animacion, @Comedia, @Terror, @Romanticas, @CienciaFiccion, @Instagram, @Twitter, @LinkedIn, @Facebook, @Descripcion)').then((response) => {
            result = response
        })
        // Cerramos la conexión
        await client.close()
        await insertFotos(body.userId, body.fotos)
        return result
    }catch (err){
        console.dir(err)
        return err
    }
}

async function updateUser(body, user) {
    let result;
    const client = await sql.getConnection()
    try{
        let queryPrepared = await client.request()
        // Parametros a insertar
        var parameters = getParams(body, user)
        // Injección de parametros
        parameters.forEach(item => queryPrepared.input(item.name, item.sqltype, item.value))
        // Ejecución de la query
        await queryPrepared.query('UPDATE Perfil SET Nombre = @Nombre, Apellido = @Apellido, EsPropietario = @EsPropietario, Edad = @Edad, Dni = @Dni, Mail = @Mail, Apodo = @Apodo, Genero = @Genero, Dedicacion = @Dedicacion, Activo = @Activo, Colaborador = @Colaborador, FacilDeLlevar = @FacilDeLlevar, Ordenado = @Ordenado, Relajado = @Relajado, Sociable = @Sociable, Artista = @Artista, Deportista = @Deportista, Cinefilo = @Cinefilo, Madrugador = @Madrugador, Melomano = @Melomano , Nocturno = @Nocturno, Electronica = @Electronica, Rock = @Rock, Latina = @Latina, Metal = @Metal, Punk = @Punk, Reggaeton = @Reggaeton, Boxeo = @Boxeo, Rugby = @Rugby, Running = @Running, Tennis = @Tennis, Baloncesto = @Baloncesto, Futbol = @Futbol, Accion = @Accion, Animacion = @Animacion, Comedia = @Comedia, Terror = @Terror, Romanticas = @Romanticas, CienciaFiccion = @CienciaFiccion, Instagram = @Instagram, Twitter = @Twitter, LinkedIn = @LinkedIn, Facebook = @Facebook, Descripcion = @Descripcion WHERE IdFirebase = @IdFirebase').then((response) => {
            result = response
        })
        // Cerramos la conexión
        await deleteFotos(body.userId)
        await insertFotos(body.userId, body.fotos)
        await client.close()
        return result
    }catch (err){
        console.dir(err)
        return err
    }
}


const insertFotos = async (userId, fotos) => {
    try{
        await mssql.connect(dbConfig)
        .then(() => {
                const table = new mssql.Table('FotoPerfil')
                table.create = false
                table.columns.add('IdFirebase', mssql.NVarChar(64), {nullable: true})
                table.columns.add('Value', mssql.NVarChar(mssql.MAX), {nullable: true})
                if (fotos != null){
                    fotos.forEach(foto => {
                        table.rows.add(userId, foto)
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

const deleteFotos = async (userId) => {
    const client = await sql.getConnection()
    try{
        let queryPrepared = await client.request()
        // Injección de parametros
        queryPrepared.input('IdFirebase', mssql.NVarChar, userId)
        // Ejecución de la query
        await queryPrepared.query('DELETE FROM FotoPerfil WHERE IdFirebase = @IdFirebase').then((response) => {
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

const getFotos = async (userId) => {
    let result;
    const client = await sql.getConnection()
    try{
        let queryPrepared = await client.request()
        // Parametros a insertar
        queryPrepared.input('userId', mssql.NVarChar, userId)
        // Ejecución de la query
        await queryPrepared.query('SELECT Value FROM FotoPerfil WHERE IdFirebase = @userId').then((response) => {
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


const verifyUser = async (fotoDni, fotoUser) => {
    var dni = await api.getId(fotoDni)
    var user = await api.getId(fotoUser)
    var response = await api.verifyUsers(dni.data[0].faceId, user.data[0].faceId)
/*     if(response.data.isIdentical){
        await deleteImage(fotoDni, fotoUser);
    } */
    return response.data.isIdentical
}

/* const deleteImage = async (fotoDni, fotoUser) => {
    const admin = require("firebase-admin");
admin.initializeApp({
    storageBucket: "gs://rumi-acdfa.appspot.com"
});

const bucket = admin.storage().bucket();
bucket.deleteFiles({
    prefix: fotoDni
  });
bucket.deleteFiles({
    prefix: fotoUser
})
}
 */
// Formatea la salida de json que reciben desde front para GET
const formatUser = (user) => {
    return { "userId": user.IdFirebase,
            "nombre": helper.capitalizeLetters(user.Nombre),
            "apellido": helper.capitalizeLetters(user.Apellido),
            "edad": user.Edad,
            "dni": user.Dni,
            "email": user.Mail,
            "apodo": helper.capitalizeFirstLetter(user.Apodo),
            "esPropietario": user.EsPropietario,
            "tienePropiedad": user.TienePropiedad,
            "genero": helper.capitalizeFirstLetter(user.Genero),
            "dedicacion": helper.capitalizeFirstLetter(user.Dedicacion),
            "fotos": user.Fotos,
            "personalidad": {
                "activo": user.Activo,
                "colaborador": user.Colaborador,
                "facilDeLlevar": user.FacilDeLlevar,
                "ordenado": user.Ordenado,
                "relajado": user.Relajado,
                "sociable": user.Sociable
            },
            "estilo": {
                "artista": user.Artista,
                "deportista": user.Deportista,
                "cinefilo": user.Cinefilo,
                "madrugador": user.Madrugador,
                "melomano": user.Melomano,
                "nocturno": user.Nocturno
            },
            "musica": {
                "electronica": user.Electronica,
                "latina": user.Latina,
                "metal": user.Metal,
                "punk": user.Punk,
                "reggaeton": user.Reggaeton,
                "rock": user.Rock
            },
            "deporte": {
                "boxeo": user.Boxeo,
                "rugby": user.Rugby,
                "running": user.Running,
                "tennis": user.Tennis,
                "baloncesto": user.Baloncesto,
                "futbol": user.Futbol
            },
            "peliculas": {
                "accion": user.Accion,
                "animacion": user.Animacion,
                "comedia": user.Comedia,
                "terror": user.Terror,
                "romanticas": user.Romanticas,
                "cienciaFiccion": user.CienciaFiccion
            },
            "instagram": helper.capitalizeFirstLetter(user.Instagram),
            "twitter": helper.capitalizeFirstLetter(user.Twitter),
            "linkedin": helper.capitalizeFirstLetter(user.LinkedIn),
            "facebook": helper.capitalizeFirstLetter(user.Facebook),
            "descripcion": user.Descripcion.charAt(0).toUpperCase() + user.Descripcion.slice(1)
        }
}


const getParams = (body, user) => {
    return [
        { name: 'IdFirebase', sqltype: mssql.NVarChar, value: body.userId},
        { name: 'Nombre', sqltype: mssql.NVarChar, value: body.nombre},
        { name: 'Apellido', sqltype: mssql.NVarChar,  value: body.apellido},
        { name: 'Edad', sqltype: mssql.Int,  value: body.edad},
        { name: 'Dni', sqltype: mssql.NVarChar,  value: body.dni},
        { name: 'Mail', sqltype: mssql.NVarChar,  value: body.email},
        { name: 'Apodo', sqltype: mssql.NVarChar,  value: body.apodo},
        { name: 'EsPropietario', sqltype: mssql.Bit, value: body.esPropietario},
        { name: 'Genero', sqltype: mssql.NVarChar,  value: body.genero},
        { name: 'Dedicacion', sqltype: mssql.NVarChar,  value: body.dedicacion},
        { name: 'Activo', sqltype: mssql.Bit,  value: body.personalidad.activo != null ? body.personalidad.activo : (user != null ? user.personalidad.activo : false) },
        { name: 'Colaborador', sqltype: mssql.Bit,  value: body.personalidad.colaborador != null ? body.personalidad.colaborador : (user != null ? user.personalidad.colaborador : false)},
        { name: 'FacilDeLlevar', sqltype: mssql.Bit,  value: body.personalidad.facilDeLlevar != null ? body.personalidad.facilDeLlevar : (user != null ? user.personalidad.facilDeLlevar : false)},
        { name: 'Ordenado', sqltype: mssql.Bit,  value: body.personalidad.ordenado != null ? body.personalidad.ordenado : (user != null ? user.personalidad.ordenado : false)},
        { name: 'Relajado', sqltype: mssql.Bit,  value: body.personalidad.relajado != null ? body.personalidad.relajado : (user != null ? user.personalidad.relajado : false)},
        { name: 'Sociable', sqltype: mssql.Bit,  value: body.personalidad.sociable != null ? body.personalidad.sociable : (user != null ? user.personalidad.sociable : false)},
        { name: 'Artista', sqltype: mssql.Bit,  value: body.estilo.artista != null ? body.estilo.artista : (user != null ? user.estilo.artista : false)},
        { name: 'Deportista', sqltype: mssql.Bit,  value: body.estilo.deportista != null ? body.estilo.deportista : (user != null ? user.estilo.deportista : false)},
        { name: 'Cinefilo', sqltype: mssql.Bit,  value: body.estilo.cinefilo != null ? body.estilo.cinefilo : (user != null ? user.estilo.cinefilo : false)},
        { name: 'Madrugador', sqltype: mssql.Bit,  value: body.estilo.madrugador != null ? body.estilo.madrugador : (user != null ? user.estilo.madrugador : false)},
        { name: 'Melomano', sqltype: mssql.Bit,  value: body.estilo.melomano != null ? body.estilo.melomano : (user != null ? user.estilo.melomano : false)},
        { name: 'Nocturno', sqltype: mssql.Bit,  value: body.estilo.nocturno != null ? body.estilo.nocturno : (user != null ? user.estilo.nocturno : false)},
        { name: 'Electronica', sqltype: mssql.Bit,  value: body.musica.electronica != null ? body.musica.electronica : (user != null ? user.musica.electronica : false)},
        { name: 'Rock', sqltype: mssql.Bit,  value: body.musica.rock != null ? body.musica.rock : (user != null ? user.musica.rock : false)},
        { name: 'Latina', sqltype: mssql.Bit,  value: body.musica.latina != null ? body.musica.latina : (user != null ? user.musica.latina : false)},
        { name: 'Metal', sqltype: mssql.Bit,  value: body.musica.metal != null ? body.musica.metal : (user != null ? user.musica.metal : false)},
        { name: 'Punk', sqltype: mssql.Bit,  value: body.musica.punk != null ? body.musica.punk : (user !=null ? user.musica.punk : false)},
        { name: 'Reggaeton', sqltype: mssql.Bit,  value: body.musica.reggaeton != null ? body.musica.reggaeton : (user != null ? user.musica.reggaeton : false)},
        { name: 'Boxeo', sqltype: mssql.Bit,  value: body.deporte.boxeo != null ? body.deporte.boxeo : (user != null ? user.deporte.boxeo : false)},
        { name: 'Rugby', sqltype: mssql.Bit,  value: body.deporte.rugby != null ? body.deporte.rugby : (user != null ? user.deporte.rugby : false)},
        { name: 'Running', sqltype: mssql.Bit,  value: body.deporte.running != null ? body.deporte.running : (user != null ? user.deporte.running : false)},
        { name: 'Tennis', sqltype: mssql.Bit,  value: body.deporte.tennis != null ? body.deporte.tennis : (user != null ? user.deporte.tennis : false)},
        { name: 'Baloncesto', sqltype: mssql.Bit,  value: body.deporte.baloncesto != null ? body.deporte.baloncesto : (user != null ? user.deporte.baloncesto : false)},
        { name: 'Futbol', sqltype: mssql.Bit,  value: body.deporte.futbol != null ? body.deporte.futbol : (user != null ? user.deporte.futbol : false)},
        { name: 'Accion', sqltype: mssql.Bit,  value: body.peliculas.accion != null ? body.peliculas.accion : (user != null ? user.peliculas.accion : false)},
        { name: 'Animacion', sqltype: mssql.Bit,  value: body.peliculas.animacion != null ? body.peliculas.animacion : (user != null ? user.peliculas.animacion : false)},
        { name: 'Comedia', sqltype: mssql.Bit,  value: body.peliculas.comedia != null ? body.peliculas.comedia : (user != null ? user.peliculas.comedia : false)},
        { name: 'Terror', sqltype: mssql.Bit,  value: body.peliculas.terror != null ? body.peliculas.terror : (user != null ? user.peliculas.terror : false)},
        { name: 'Romanticas', sqltype: mssql.Bit,  value: body.peliculas.romanticas != null ? body.peliculas.romanticas : (user != null ? user.peliculas.romanticas : false)},
        { name: 'CienciaFiccion', sqltype: mssql.Bit,  value: body.peliculas.cienciaFiccion != null ? body.peliculas.cienciaFiccion : (user != null ? user.peliculas.cienciaFiccion : false)},
        { name: 'Instagram', sqltype: mssql.NVarChar,  value: body.instagram},
        { name: 'Twitter', sqltype: mssql.NVarChar,  value: body.twitter},
        { name: 'LinkedIn', sqltype: mssql.NVarChar,  value: body.linkedin},
        { name: 'Facebook', sqltype: mssql.NVarChar,  value: body.facebook},
        { name: 'Descripcion', sqltype: mssql.NVarChar,  value: body.descripcion},
    ];
}


module.exports = {createUser, getUser, updateUser, verifyUser}