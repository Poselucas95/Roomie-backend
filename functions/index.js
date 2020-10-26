const functions = require('firebase-functions');
const express = require('express')
const app = express()


var userRouter = require('./routes/user');
var propertyRouter = require('./routes/property');
var matchRouter = require('./routes/match');

app.set('etag', false)
app.use((req, res, next) => {
    res.set('Cache-Control', 'no-store')
    next()
  })
app.use('/api/user', userRouter)
app.use('/api/property', propertyRouter)
app.use('/api/match', matchRouter)


exports.app = functions.https.onRequest(app);
