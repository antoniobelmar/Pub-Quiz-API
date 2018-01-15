const express = require('express');
const getAllQuizzes = require('./quizActions/getAllQuizzes');
const getQuiz = require('./quizActions/getQuiz');
const createQuiz = require('./quizActions/createQuiz');
const deleteQuiz = require('./quizActions/deleteQuiz');


const router = express.Router();

router.get('/', getAllQuizzes);
router.get('/:id', getQuiz);
router.post('/', createQuiz);
router.delete('/:id', deleteQuiz);

module.exports = router;
