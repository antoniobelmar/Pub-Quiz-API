const express = require('express');
const db = require('./db');
const bodyParser = require('body-parser');

// app and web sockets

const app = express();
const expressWs = require('express-ws')(app);

// middlewares

app.use(require('./middlewares/headers'));
app.use(bodyParser.json());

// routes

app.use('/quiz', require('./controllers/quiz'));

module.exports = app;
