/* eslint-disable eqeqeq */
/* eslint-disable no-eq-null */
var express = require("express");
var router = express.Router();
var discoveryController = require("../src/controllers/discoveryController");

/* Post to get the discovery list of propertys. */
router.post("/", async (req, res) => {
  try {
    var response = await discoveryController.getDiscovery(req.body);
    res.status(response.code).send(response.result);
  } catch (err) {
    res.send("Error traer el discovery", 500);
  }
});

router.get("/:propId", async (req, res) => {
  if (req.params.propId && req.params.propId == null)
    res.status(400).send("Error al solicitar el preview. Falta propId");
  try {
    var response = await discoveryController.getPreviewProp(req.params.propId);
    res.status(response.code).send(response.result);
  } catch (err) {
    res.send("Error traer el preview", 500);
  }
});


module.exports = router;
