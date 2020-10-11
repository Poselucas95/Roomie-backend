var express = require('express');
var router = express.Router();
var propertyController = require('../src/controllers/propertyController')

/* GET property. */
router.get('/:propertyId', async function(req, res, next) {
    if(req.params.propertyId && req.params.userId == null) res.status(400).send('Error al solicitar el user. Falta userID')
    try{
      var response = await userController.getUser(req.params.userId)
      res.status(response.code).send(response.result)
    }catch (err){
      res.send("Error al buscar el usuario", 500)
    }
  });

router.get('/property')


module.exports = router;