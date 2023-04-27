let express = require('express');
let app = express();

app.get('/', function (_, res) {
  //   res.send('Hello Express');
  res.sendFile(__dirname + '/views/index.html');
});

app.get('/json', function (_, res) {
  res.json({ message: 'Hello json' });
});

app.use('/public', express.static(__dirname + '/public'));

console.log('Hello World');

module.exports = app;
