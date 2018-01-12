const express = require('express');
const getQuiz = require('./quizActions/getQuiz');

const router = express.Router();

router.get('/:id', getQuiz);

module.exports = router;
