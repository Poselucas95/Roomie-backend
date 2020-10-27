/* eslint-disable eqeqeq */
/* eslint-disable no-eq-null */
var express = require('express');
var router = express.Router();
var matchController = require('../src/controllers/matchController')

/* GET matchs by propertyID. */
// Este trae TODOS los match que la PROPIEDAD tiene.
router.get('/prop/:propertyId', async (req, res) => {
  if(req.params.propertyId && req.params.propertyId == null) res.status(400).send('Error al solicitar el match. Falta property ID')
  try{
    var response = await matchController.getMatchsByPropId(req.params.propertyId)
    res.status(response.code).send(response.result)
  }catch (err){
    res.send("Error al buscar la asd", 500)
  }
});

/* GET matchs by userId. */
// Este trae TODOS los match que el USUARIO tiene.
router.get('/user/:userId', async (req, res) => {
  if(req.params.userId && req.params.userId == null) res.status(400).send('Error al solicitar el match. Falta property ID')
  try{
    var response = await matchController.getMatchsByUserId(req.params.userId)
    res.status(response.code).send(response.result)
  }catch (err){
    res.send("Error al buscar la Propiedad", 500)
  }
});

/* CREATE Match. */
router.post('/', async (req, res) => {
  try{
    var response = await matchController.createMatch(req.body)
    res.status(response.code).send(response.result)
  }catch (err){
    res.send("Error al registrar el match", 500)
  }
});

/* UPDATE Match. */
router.put('/', async (req, res) => {
  try{
    var response = await matchController.updateMatch(req.body)
    res.status(response.code).send(response.result)
  }catch (err){
    res.send("Error al modificar el match", 500)
  }
});




module.exports = router;