const Question = require('./question');
const Quiz = require('./quiz');
const mongoose = require('../db');

mongoose.connection.on('open', function() {

  mongoose.connection.db.dropDatabase();

  var questions = [
    new Question({
      type: 'MultipleChoice',
      text: 'What is the capital of the France?',
      options: [{text: 'Rome'}, {text: 'Paris'}, {text: 'Madrid'}],
      answer: [{text: 'Madrid'}]
    }),

    new Question({
      type: 'MultipleChoice',
      text: 'What is the favourite food of Theo?',
      options: [{text: 'Chinese'}, {text: 'Turnips'}, {text: 'White House'}],
      answer: [{text: 'White House'}]
    })
  ]

  const multipleChoiceQuiz =  new Quiz({ name : 'Multiple Choice Quiz', questions: questions }); // Document(data in the collection/table)

  multipleChoiceQuiz.save(function (err, quiz) {
    if (err) {
      console.error('Could not save');
    };
  });

})
