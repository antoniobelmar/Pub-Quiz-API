const Quiz = require('../../models/quiz');

function createQuiz(res, req, quizModel = Quiz ){
  console.log(req)
  // const newQuizInfo = JSON.parse(req.)
    var quiz = new Quiz({})
}

module.exports = createQuiz;
