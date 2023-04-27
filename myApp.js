require('dotenv').config();
let express = require('express');
let app = express();

app.get('/', function (_, res) {
  //   res.send('Hello Express');
  res.sendFile(__dirname + '/views/index.html');
});

app.use('/public', express.static(__dirname + '/public'));

app.get('/json', function (_, res) {
  process.env.MESSAGE_STYLE === 'uppercase'
    ? res.json({ message: 'HELLO JSON' })
    : res.json({ message: 'Hello json' });
});

console.log('Hello World');

module.exports = app;
