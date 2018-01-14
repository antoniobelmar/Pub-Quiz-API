const Quiz = require('../../models/quiz');

function createQuiz(req, res, quizModel = Quiz ) {
  var quiz = new Quiz({name: req.body.name, questions: req.body.questions})
  quiz.save(function (err, quiz) {
    if (err) {
      console.error('Could not save');
    };
  });
}

module.exports = createQuiz;
