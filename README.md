<h1 align="center">Roomie Backend</h1>

<!-- Status -->

<!-- <h4 align="center"> 
	🚧  Roomie Backend 🚀 Under construction...  🚧
</h4> 

<hr> -->

<p align="center">
  <a href="#dart-about">About</a> &#xa0; | &#xa0; 
  <a href="#sparkles-features">Features</a> &#xa0; | &#xa0;
  <a href="#rocket-technologies">Technologies</a> &#xa0; | &#xa0;
  <a href="#white_check_mark-requirements">Requirements</a> &#xa0; | &#xa0;
  <a href="#checkered_flag-starting">Starting</a> &#xa0; | &#xa0;
  <a href="#memo-license">License</a> &#xa0; | &#xa0;
  <a href="https://github.com/{{YOUR_GITHUB_USERNAME}}" target="_blank">Author</a>
</p>

<br>

## :dart: About ##

Es una app android con orientación social que permite la publicación de perfiles, generación de comunidad y oferta de habitaciones en domicilios particulares en alquiler por periodos de mediano y largo plazo.

## :sparkles: Features ##

:heavy_check_mark: Feature 1;\
:heavy_check_mark: Feature 2;\
:heavy_check_mark: Feature 3;

## :rocket: Technologies ##

The following tools were used in this project:

- [ExpressJs](https://expressjs.com/es/)
- [Node.js](https://nodejs.org/en/)
- [Firebase](https://firebase.google.com/?hl=es)

## :white_check_mark: Requirements ##

Before starting :checkered_flag:, you need to have [Git](https://git-scm.com) and [Node](https://nodejs.org/en/) installed.

## :checkered_flag: Starting ##

```bash
# Clone this project
$ git clone https://github.com/{{YOUR_GITHUB_USERNAME}}/roomie-backend

# Access
$ cd roomie-backend
$ cd functions

# Install dependencies
$ npm install

# Run the project locally
$ cd ..
$ firebase serve

# The server will initialize in the <http://localhost:3000>
```

## :memo: License ##

This project is under license from Roomie Team.


Made with :heart:


# Uso

 Endpoint                                                            | Metodo | Descripción                                           
 ------------------------------------------------------------------- | ------ | ----------------------------------------------------- 
[`/api/user/{userId}`](#buscar-usuario)                              | GET    | Buscar un usuario
[`/api/user/`](#crear-usuario)                                       | POST   | Registra un nuevo usuario
[`/api/user/`](#modificar-usuario)                                   | PUT    | Modificar un usuario
[`/api/property/{userId}`](#buscar-propiedad)                        | GET    | Buscar una propiedad
[`/api/property/`](#crear-propiedad)                                 | POST   | Registra una propiedad
[`/api/property/`](#modificar-propiedad)                             | PUT    | Modificar una propiedad
[`/api/match/prop/{propertyId}`](#buscar-match-by-PropId)            | GET    | Buscar un match por id de propiedad
[`/api/match/user/{userId}`](#buscar-match-by-UserId)                | GET    | Buscar un match por id de usuario
[`/api/match/`](#crear-match)                                        | POST   | Crear un match
[`/api/match/`](#modificar-match)                                    | PUT    | Modificar un match
[`/api/match/prop/pending`](#Obtener-Matchs-Pendientes-by-propId)    | GET    | Obtener cantidad de matchs pendientes
[`/api/reject/`](#crear-rechazo)                                     | POST   | Crear un rechazo

## Ejemplos
### Buscar Usuario

###### Response:
 ```javascript
{
    "userId": "test",
    "nombre": "Probando Probando",
    "apellido": "test",
    "edad": 10,
    "dni": "test",
    "email": "test",
    "apodo": "test",
    "esPropietario": true
    "fotos": ["foto1", "foto2", "foto3"],
    "genero": "varon",
    "dedicacion": "trabajador",
    "personalidad": {
        "activo": true,
        "colaborador": true,
        "facilDeLlevar": true,
        "ordenado": true,
        "relajado": true,
        "sociable": true
    },
    "estilo": {
        "artista": true,
        "deportista": true,
        "cinefilo": true,
        "madrugador": true,
        "melomano": true,
        "nocturno": true
    },
    "musica": {
        "electronica": true,
        "latina": true,
        "metal": true,
        "punk": true,
        "reggaeton": true,
        "rock": true
    },
    "deporte": {
        "boxeo": true,
        "rugby": true,
        "running": true,
        "tennis": true,
        "baloncesto": true,
        "futboll": true
    },
    "peliculas": {
        "accion": true,
        "animacion": true,
        "comedia": true,
        "terror": true,
        "romanticas": true,
        "cienciaFiccion": true
    },
    "instagram": "",
    "twitter": "",
    "linkedin": "",
    "facebook": "",
    "descripcion": ""
}
```

### Crear Usuario
### Modificar Usuario
###### Body:
 ```javascript
{
    "userId": "test",
    "nombre": "Probando Probando",
    "apellido": "test",
    "edad": 10,
    "dni": "test",
    "email": "test",
    "apodo": "test",
    "esPropietario": true
    "fotos": ["foto1", "foto2", "foto3"],
    "genero": "varon",
    "dedicacion": "trabajador",
    "personalidad": {
        "activo": true,
        "colaborador": true,
        "facilDeLlevar": true,
        "ordenado": true,
        "relajado": true,
        "sociable": true
    },
    "estilo": {
        "artista": true,
        "deportista": true,
        "cinefilo": true,
        "madrugador": true,
        "melomano": true,
        "nocturno": true
    },
    "musica": {
        "electronica": true,
        "latina": true,
        "metal": true,
        "punk": true,
        "reggaeton": true,
        "rock": true
    },
    "deporte": {
        "boxeo": true,
        "rugby": true,
        "running": true,
        "tennis": true,
        "baloncesto": true,
        "futboll": true
    },
    "peliculas": {
        "accion": true,
        "animacion": true,
        "comedia": true,
        "terror": true,
        "romanticas": true,
        "cienciaFiccion": true
    },
    "instagram": "",
    "twitter": "",
    "linkedin": "",
    "facebook": "",
    "descripcion": ""
}
```

###### Response:
 ```javascript
{
   "Usuario registrado correctamente"
}
```

### Buscar Propiedad

###### Response:
 ```javascript
{
"IdFirebase": "test13",
"idPropiedad": 20,
"ciudad": "Tigre",
"direccion": "calle falsa 1234",
"tipoHabitacion": true,
"tipoCama": 1,
"tamanoHabitacion": 30,
"tamanoPropiedad": 50,
"chicas": 1,
"chicos": 5,
"otros": 1,
"habitacionesInd": 1,
"habitacionesDob": 1,
"banosCompletos": 1,
"toilettes": 1,
"comodidadProp": {
"tv": false,
"wifi": false,
"acc": true,
"calefaccion": true,
"piscina": true,
"propidadAccesible": false
},
"comodidadHab": {
"banoPrivado": false,
"accHabitacion": false,
"balcon": true
},
"normas": {
"fumar": true,
"mascotas": true,
"parejas": false,
"lgtb": true
},
"alquilerMensual": 1,
"depositoGarantia": 1,
"servicioLimpieza": false,
"expensas": true,
"tituloAnuncio": "1",
"algoMas": "1",
"preferencia": "1",
"edadMin": 1,
"edadMax": 1,
"actividadPrincipal": "1"
}
```

### Crear Propiedad
### Modificar Propiedad
###### Body:
 ```javascript

 {
  "userId": "test13",
  "ciudad": "Palermo",
  "direccion": "calle falsa 1234",
  "tipoHabitacion": true,
  "tipoCama": true,
  "tamanoHabitacion": 30,
  "tamanoPropiedad": 50,
  "chicas": 1,
  "chicos": 5,
  "otros": 1,
  "habitacionesInd": 1,
  "habitacionesDob": 2,
  "banosCompletos": 2,
  "toilettes": 1,
  "comodidadProp": {
    "tv": false,
    "wifi": false,
    "acc": true,
    "calefaccion": true,
    "piscina": true,
    "propidadAccesible": false
  },
  "comodidadHab": {
    "banoPrivado": false,
    "accHabitacion": false,
    "balcon": true
  },
  "normas": {
    "fumar": true,
    "mascotas": true,
    "parejas": false,
    "lgtb": true
  },
  "alquilerMensual": 40,
  "depositoGarantia": 3,
  "servicioLimpieza": false,
  "expensas": true,
  "tituloAnuncio": "CasaLucas",
  "algoMas": "me gustan las artesanias",
  "preferencia": "trans",
  "edadMin": 20,
  "edadMax": 70,
  "actividadPrincipal": "bajonero"
}
```

###### Response:
 ```javascript
{
   "Propiedad registrada correctamente"
}
```

### Buscar Match By PropId

###### Response:
```javascript
{
"IdFirebase": "test4",
"idPropiedad": 14,
"estado": "Match",
"alquilerMensual": 90,
"tipoHabitacion": true,
"tamanoHabitacion": 60,
"ciudad": "Tigre",
"nombre": "Franco",
"edad": 24,
"foto": "foto1"
}
 ```

### Buscar Match By UserId

###### Response:
```javascript
{
"IdFirebase": "test4",
"idPropiedad": 14,
"estado": "Match",
"nombre": "Franco",
"Edad": 24,
"Genero": "0",
"Dedicacion": "0",
"Foto": "foto1"
}
 ```
### Obtener Matchs Pendientes by propId

###### Response:
```javascript
{
"Tienes 1 interesado en la seccion favoritos"
}
{
"Tienes 2 interesados en la seccion favoritos"
}
 ```


### Crear Match
### Modificar Match
###### Body:
 ```javascript
{
{
  "userId": "test11",
  "idPropiedad": 6,
  "estado": "Match"
}
}
```

###### Response:
 ```javascript
{
   "Match registrado correctamente"
}
```

### Crear Rechazo
###### Body:
 ```javascript
{
{
  "userId": "test12",
  "idPropiedad": 6,
}
}
```

###### Response:
 ```javascript
{
   "Rechazo registrado correctamente"
}
```
