var express = require('express');
var router = express.Router();
var userController = require('../src/controllers/userController')

/* GET user. */
router.get('/:userId', async function(req, res, next) {
  if(req.params.userId && req.params.userId == null) res.status(400).send('Error al solicitar el user. Falta userID')
  try{
    var response = await userController.getUser(req.params.userId)
    res.status(response.code).send(response.result)
  }catch (err){
    res.send("Error al buscar el usuario", 500)
  }
});



module.exports = router;