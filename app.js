const express = require('express');
const db = require('./db');

const app = express();

// middlewares

app.use(require('./middlewares/headers'));

// routes

app.use('/quiz', require('./controllers/quiz'));

module.exports = app;
