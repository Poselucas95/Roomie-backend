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


# Usage
Different operations are performed through the following endpoints:

 Endpoint                                                            | Metodo | Descripción                                           
 ------------------------------------------------------------------- | ------ | ----------------------------------------------------- 
[`/api/user/{userId}`](#buscar-usuario)                              | GET    | Buscar un usuario
[`/api/user/`](#crear-usuario)                                       | POST   | Registra un nuevo usuario


## Examples
### Buscar Usuario

###### Response:
 ```javascript
{
  "idFirebase": "",
  "Nombre": "",
  "Apellido": "",
  "Edad": 0,
  "Dni": "",
  "Mail": "",
  "Apodo": "",
  "Genero": "1/0",
  "Dedicacion": "1/0",
  "personalidad": {
      "activo": "1/0",
      "colaborador": "1/0",
      "facilDeLlevar": "1/0",
      "ordenado": "1/0",
      "relajado": "1/0",
      "sociable": "1/0"
  },
  "estilo": {
      "artista": "1/0",
      "deportista": "1/0",
      "cinefilo": "1/0",
      "madrugador": "1/0",
      "melomano": "1/0",
      "nocturno": "1/0"
  },
  "musica": {
      "electronica": "1/0",
      "latina": "1/0",
      "metal": "1/0",
      "punk": "1/0",
      "reggaeton": "1/0",
      "rock": "1/0"
  },
  "deporte": {
      "boxeo": "1/0",
      "rugby": "1/0",
      "running": "1/0",
      "tenis": "1/0",
      "baloncesto": "1/0",
      "futboll": "1/0"
  },
  "peliculas": {
      "accion": "1/0",
      "animacion": "1/0",
      "comedia": "1/0",
      "terror": "1/0",
      "romanticas": "1/0",
      "cienciaFiccion": "1/0"
  },
  "Instagram": "",
  "Twitter": "",
  "LinkedIn": "",
  "Facebook": "",
  "Descripcion": ""
}
```

### Crear Usuario
###### Body:
 ```javascript
{
  "idFirebase": "",
  "Nombre": "",
  "Apellido": "",
  "Edad": 0,
  "Dni": "",
  "Mail": "",
  "Apodo": "",
  "Genero": "1/0",
  "Dedicacion": "1/0",
  "personalidad": {
      "activo": "1/0",
      "colaborador": "1/0",
      "facilDeLlevar": "1/0",
      "ordenado": "1/0",
      "relajado": "1/0",
      "sociable": "1/0"
  },
  "estilo": {
      "artista": "1/0",
      "deportista": "1/0",
      "cinefilo": "1/0",
      "madrugador": "1/0",
      "melomano": "1/0",
      "nocturno": "1/0"
  },
  "musica": {
      "electronica": "1/0",
      "latina": "1/0",
      "metal": "1/0",
      "punk": "1/0",
      "reggaeton": "1/0",
      "rock": "1/0"
  },
  "deporte": {
      "boxeo": "1/0",
      "rugby": "1/0",
      "running": "1/0",
      "tenis": "1/0",
      "baloncesto": "1/0",
      "futboll": "1/0"
  },
  "peliculas": {
      "accion": "1/0",
      "animacion": "1/0",
      "comedia": "1/0",
      "terror": "1/0",
      "romanticas": "1/0",
      "cienciaFiccion": "1/0"
  },
  "Instagram": "",
  "Twitter": "",
  "LinkedIn": "",
  "Facebook": "",
  "Descripcion": ""
}
```

###### Response:
 ```javascript
{
   "Usuario registrado correctamente"
}
```
