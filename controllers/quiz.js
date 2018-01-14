const express = require('express');
const getAllQuizzes = require('./quizActions/getAllQuizzes');
const getQuiz = require('./quizActions/getQuiz');
const createQuiz = require('./quizActions/createQuiz');


const router = express.Router();

router.get('/', getAllQuizzes);
router.get('/:id', getQuiz);
router.post('/', createQuiz);

module.exports = router;
