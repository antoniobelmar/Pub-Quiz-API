const Quiz = require('../../models/quiz');
const Question = require('../../models/question');
const Option = require('../../models/option');

function createQuiz(req, res, quizModel = Quiz ) {
  let questionsArray = [];

  req.body.questions.forEach(function(question) {
    let optionsArray = [];
    question._options.forEach(function(option) {
      optionsArray.push(new Option({ text: option._text }))
    });
    questionsArray.push(new Question({
      type: question._type,
      text: question._text,
      options: optionsArray,
      answer: question._answer
    }))
  });

  let quiz = new Quiz({name: req.body.name, questions: questionsArray})
  quiz.save(function (err, quiz) {
    if (err) {
      console.error('Could not save');
    };
  });
  res.send(200);
}

module.exports = createQuiz;
