const express = require('express');
const db = require('./db');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();

// middlewares

app.use(require('./middlewares/headers'));
// app.use(cors());
// app.options('*', cors());
app.use(bodyParser.json());

// routes


app.use('/quiz', require('./controllers/quiz'));

module.exports = app;
