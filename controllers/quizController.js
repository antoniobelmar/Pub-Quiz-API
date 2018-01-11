const Quiz = require('../models/quiz')

function quizController(req, res, next, quizModel = Quiz) {
  quizModel.findById(req.params.id, function(err, quiz) {
    if (err) {
      res.json({ error: "Not Found" })
    } else {
      res.json(quiz)
    };
  });
};

module.exports = quizController
