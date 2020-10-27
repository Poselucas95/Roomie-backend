const functions = require('firebase-functions');
const express = require('express')
const app = express()


var userRouter = require('./routes/user');
var propertyRouter = require('./routes/property');
var matchRouter = require('./routes/match');
var rejectRouter = require('./routes/reject');


app.use('/api/user', userRouter)
app.use('/api/property', propertyRouter)
app.use('/api/match', matchRouter)
app.use('/api/reject', rejectRouter)


exports.app = functions.https.onRequest(app);
