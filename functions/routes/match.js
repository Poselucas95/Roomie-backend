/* eslint-disable eqeqeq */
/* eslint-disable no-eq-null */
var express = require('express');
var router = express.Router();
var matchController = require('../src/controllers/matchController')

/* GET matchs users. */
// Este trae TODOS los match que el USUARIO tiene.
router.get('/user/:userId', async (req, res) => {
  if(req.params.userId && req.params.userId == null) res.status(400).send('Error al solicitar el user. Falta userID')
  try{
    var response = await userController.getUser(req.params.userId)
    res.status(response.code).send(response.result)
  }catch (err){
    res.send("Error al buscar el usuario", 500)
  }
});


/* GET matchs propertys. */
// Este trae TODOS los match que el PROPIETARIO tiene.
router.get('/property/:userId', async (req, res) => {
    if(req.params.userId && req.params.userId == null) res.status(400).send('Error al solicitar el user. Falta userID')
    try{
      var response = await userController.getUser(req.params.userId)
      res.status(response.code).send(response.result)
    }catch (err){
      res.send("Error al buscar el usuario", 500)
    }
  });



module.exports = router;