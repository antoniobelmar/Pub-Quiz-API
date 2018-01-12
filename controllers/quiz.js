const express = require('express');
const getQuiz = require('./quizActions/getQuiz');

const router = express.Router();

router.get('/',  function(req, res) {
  res.send('1231231');
});
router.get('/:id', getQuiz);

module.exports = router;
