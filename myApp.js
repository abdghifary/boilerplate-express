let express = require('express');
let app = express();

app.get('/', function (_, res) {
  res.send('Hello Express');
});

console.log('Hello World');

module.exports = app;
