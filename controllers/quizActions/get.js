const Quiz = require('../../models/quiz');

function getQuiz(req, res, next, quizModel = Quiz) {
  quizModel.findById(req.params.id, function(err, quiz) {
    if (err) {
      res.json({ error: "Not Found" })
    } else {
      res.json(quiz)
    };
  });
};

module.exports = getQuiz;
