const express = require('express');
const getAllQuizzes = require('./quizActions/getAllQuizzes');
const getQuiz = require('./quizActions/getQuiz');

const router = express.Router();

router.get('/', getAllQuizzes);
router.get('/:id', getQuiz);

module.exports = router;
