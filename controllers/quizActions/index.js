const Quiz = require('../../models/quiz');

function getAllQuizzes(req, res, next, quizModel = Quiz) {
  quizModel.find({}, function(err, quizzes) {
    if (err) {
      res.json({ error: "Not Found" })
    } else {
      res.json(quizzes)
    };
  });
};

module.exports = getAllQuizzes;
