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
