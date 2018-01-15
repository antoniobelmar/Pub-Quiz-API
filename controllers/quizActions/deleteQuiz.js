const Quiz = require('../../models/quiz');

function deleteQuiz(req, res, next, quizModel = Quiz) {
  quizModel.findByIdAndRemove(req.params.id, function(err, quiz) {
    if (err) {
      console.log('Quiz not found')
    } else {
      res.send(200)
    };
  });
};

module.exports = deleteQuiz;
