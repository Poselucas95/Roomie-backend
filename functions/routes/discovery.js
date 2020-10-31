/* eslint-disable eqeqeq */
/* eslint-disable no-eq-null */
var express = require('express');
var router = express.Router();
var discoveryController = require('../src/controllers/discoveryController')

/* Post to get the discovery list of propertys. */
router.post('/', async (req, res) => {
    try{
      var response = await discoveryController.getDiscovery(req.body)
      res.status(response.code).send(response.result)
    }catch (err){
      res.send("Error traer el discovery", 500)
    }
  });

module.exports = router;