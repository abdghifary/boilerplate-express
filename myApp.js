const express = require('express');
const dotenv = require('dotenv');

// load environment variables
dotenv.config();

const app = express();

// middleware to log request method, path, and ip address
app.use((req, _, next) => {
  console.log(`${req.method} ${req.path} - ${req.ip}`);
  next();
});

// serve an HTML file on root route
app.get('/', (_, res) => {
  //   res.send('Hello Express');
  res.sendFile(__dirname + '/views/index.html');
});

// serve static assets
app.use('/public', express.static(__dirname + '/public'));

// serve JSON on /json route
app.get('/json', (_, res) => {
  process.env.MESSAGE_STYLE === 'uppercase'
    ? res.json({ message: 'HELLO JSON' })
    : res.json({ message: 'Hello json' });
});

// chain timeServerMiddleware to create a time server on /now route
app.get('/now', timeServerMiddleware, (req, res) => {
  res.send({ time: req.time });
});

// middleware to create a time server
function timeServerMiddleware(req, _, next) {
  req.time = new Date().toString();
  next();
}

// chain echoHandlerMiddleware to create an echo server on /:word/echo route
app.get('/:word/echo', echoHandlerMiddleware, (req, res) => {
  res.send({ echo: req.echo });
});

// middleware to create an echo server
function echoHandlerMiddleware(req, _, next) {
  req.echo = req.params.word;
  next();
}

// chain nameHandlerMiddleware to create a name server on /name route for both GET and POST requests
app
  .route('/name')
  .get(nameHandlerMiddleware, (req, res) => {
    res.send({ name: req.name });
  })
  .post(nameHandlerMiddleware, (req, res) => {
    res.send({ name: req.name });
  });

// middleware to create a name server
function nameHandlerMiddleware(req, _, next) {
  req.name = `${req.query.first} ${req.query.last}`;
  next();
}

console.log('Hello World');

module.exports = app;
