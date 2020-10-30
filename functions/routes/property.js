/* eslint-disable no-eq-null */
/* eslint-disable eqeqeq */
var express = require('express');
var router = express.Router();
var propertyController = require('../src/controllers/propertyController')

/* GET property. */
router.get('/:userId', async (req, res) => {
  if(req.params.userId && req.params.userId == null) res.status(400).send('Error al solicitar la propiedad. Falta userID')
  try{
    var response = await propertyController.getProperty(req.params.userId)
    res.status(response.code).send(response.result)
  }catch (err){
    res.send("Error al buscar la propiedad", 500)
  }
});

/* CREATE property. */
router.post('/', async (req, res) => {
  try{
    var response = await propertyController.createProperty(req.body)
    res.status(response.code).send(response.result)
  }catch (err){
    res.send("Error al registrar la propiedad", 500)
  }
});

/* UPDATE property. */
router.put('/', async (req, res) => {
  try{
    var response = await propertyController.updateProperty(req.body)
    res.status(response.code).send(response.result)
  }catch (err){
    res.send("Error al modificar la propiedad", 500)
  }
});

module.exports = router;