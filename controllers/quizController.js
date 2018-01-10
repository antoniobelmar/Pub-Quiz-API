import {Quiz} from '../models/quiz'

function quizController(req, res, quizModel = Quiz) {
  quizModel.findById(req.params.id, createJSON);
};

function createJSON(err, quiz) {
  if (err) {
    res.json({ error: "Not Found" })
  } else {
    res.json(quiz)
  }
}
