// lib/app.ts
import express = require('express');
// Create a new express application instance
const app: express.Application = express();
app.get('/', function (req, res) {
  res.send('Test!');
});
app.listen(3000, function () {
  console.log('Listen 3000!');
});