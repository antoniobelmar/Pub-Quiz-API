const Question = require('./question');
const Quiz = require('./quiz');
const mongoose = require('../db');

mongoose.connection.on('open', function() {

  mongoose.connection.db.dropDatabase();

  var questions = [
    new Question({
      _type: 'MultipleChoice',
      _text: 'What is the capital of the France?',
      _options: [{text: 'Rome'}, {text: 'Paris'}, {text: 'Madrid'}],
      _answer: [{text: 'Madrid'}]
    }),

    new Question({
      _type: 'MultipleChoice',
      _text: 'What is the favourite food of Theo?',
      _options: [{text: 'Chinese'}, {text: 'Turnips'}, {text: 'White House'}],
      _answer: [{text: 'White House'}]
    })
  ]

  const multipleChoiceQuiz =  new Quiz({ name : 'Multiple Choice Quiz', questions: questions }); // Document(data in the collection/table)

  multipleChoiceQuiz.save(function (err, quiz) {
    if (err) {
      console.error('Could not save');
    };
  });

})
