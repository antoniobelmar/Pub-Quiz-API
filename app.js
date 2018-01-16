const express = require('express');
const db = require('./db');
const bodyParser = require('body-parser');

// app and web sockets

const baseApp = express();
const expressWs = require('express-ws')(baseApp);
const app = expressWs.app;

// middlewares

app.use(require('./middlewares/headers'));
app.use(bodyParser.json());

// routes

app.get('/', function(res, req) {
  req.send('<meta http-equiv="Content-Security-Policy" content="default-src \'self\' ws://localhost:5000">');
});

app.use('/quiz', require('./controllers/quiz'));
app.use('/play', require('./controllers/play'));

module.exports = app;
