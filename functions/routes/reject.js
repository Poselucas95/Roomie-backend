/* eslint-disable eqeqeq */
/* eslint-disable no-eq-null */
var express = require('express');
var router = express.Router();
var rejectController = require('../src/controllers/rejectController')

/* CREATE Rechazo. */
router.post('/', async (req, res) => {
    try{
      var response = await rejectController.createReject(req.body)
      res.status(response.code).send(response.result)
    }catch (err){
      res.send("Error al registrar el rechazo", 500)
    }
  });

  module.exports = router;