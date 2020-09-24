const functions = require('firebase-functions');
const express = require('express')
const app = express()


var userRouter = require('./routes/user');


app.use('/api/user', userRouter)


exports.app = functions.https.onRequest(app);
