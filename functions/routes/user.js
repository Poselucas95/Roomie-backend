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

/* CREATE user. */
router.post("/", async (req, res) => {
  try {
    //const test = await testImagen(req.body.foto);
    //res.status(200).send("test");
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

router.post("/verify", async (req, res) => {
  try {
    var response = await userController.verifyUser(req.body);
    res.status(response.code).send(response.result);
  } catch (err) {
    res.send("No se pudo realizar la verificación");
  }
});

const testImagen = (imageBase) => {
  var stream = require("stream");
  var bufferStream = new stream.PassThrough();
  bufferStream.end(Buffer.from(imageBase, "base64"));
  var admin = require("firebase-admin");

  admin.initializeApp({
    keyFilename:
      "../src/config/rumi-acdfa-firebase-adminsdk-cy9mn-cd40318569.json",
    storageBucket: "rumi-acdfa.appspot.com",
  });

  //Define bucket.
  var myBucket = admin.storage().bucket();
  //Define file & file name.
  var file = myBucket.file("lucasprueba.jpg");

  //Pipe the 'bufferStream' into a 'file.createWriteStream' method.
bufferStream
    .pipe(
      file.createWriteStream({
        metadata: {
          contentType: "image/jpeg",
        },
        public: true,
        validation: "md5",
      })
    )
    .on("error", (err) => {
      console.log("fun ciono");
      console.log(err);
    })
    .on("finish", (result) => {
      console.log("error");
      console.log("resultado: ", result);
    });
};

module.exports = router;
