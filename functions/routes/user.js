/* eslint-disable eqeqeq */
/* eslint-disable no-eq-null */
var express = require("express");
var router = express.Router();
var userController = require("../src/controllers/userController");
const { Storage } = require("@google-cloud/storage");

/* GET user. */
router.get("/:userId", async (req, res) => {
  if (req.params.userId && req.params.userId == null)
    res.status(400).send("Error al solicitar el user. Falta userID");
  try {
    var response = await userController.getUser(req.params.userId);
    res.status(response.code).send(response.result);
  } catch (err) {
    res.send("Error al buscar el usuario", 500);
  }
});

/* GET user. */
router.get("/details/:userId", async (req, res) => {
  if (req.params.userId && req.params.userId == null)
    res.status(400).send("Error al solicitar el user. Falta userID");
  try {
    var response = await userController.getUserDetails(req.params.userId);
    res.status(response.code).send(response.result);
  } catch (err) {
    res.send("Error al buscar el usuario", 500);
  }
});

/* CREATE user. */
router.post("/", async (req, res) => {
  try {
    var response = await userController.createUser(req.body);
    res.status(response.code).send(response.result);
  } catch (err) {
    res.send("Error al registrar el usuario", 500);
  }
});

/* UPDATE user. */
router.put("/", async (req, res) => {
  try {
    var response = await userController.updateUser(req.body);
    res.status(response.code).send(response.result);
  } catch (err) {
    res.send("Error al modificar el usuario", 500);
  }
});

/* VERIFY fotos */

router.get("/verify/:userId", async (req, res) => {
  if (req.params.userId && req.params.userId == null)
    res.status(400).send("Error al verificar el user. Falta userID");
  try {
    var response = await userController.verifyUser(req.params.userId);
    res.status(response.code).send(response.result);
  } catch (err) {
    res.send("No se pudo realizar la verificación");
  }
});

module.exports = router;
