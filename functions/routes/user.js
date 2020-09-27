var express = require('express');
var router = express.Router();
var userController = require('../src/controllers/userController')

/* POST users register. */
router.post('/register', async function(req, res, next) {
  if(req.body && req.body.email == null) res.status(400).send('No se ingreso ningun email')
  try{
    var response = await userController.register(req.body.email)
    res.status(response.code).send(response.result)
  }catch (err){
    res.send("Error al intentar registrar el email", 500)
  }
});



module.exports = router;