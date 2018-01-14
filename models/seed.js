const Question = require('./question');
const Quiz = require('./quiz');
const Option = require('./option');
const mongoose = require('../db');

mongoose.connection.on('open', function() {

  mongoose.connection.db.dropDatabase();

  const questions = [
    new Question({
      type: 'MultipleChoice',
      text: 'What is the capital of the France?',
      options: [
        new Option({text: 'Rome'}),
        new Option({text: 'Paris'}),
        new Option({text: 'Madrid'})
      ],
      answer: [{text: 'Madrid'}]
    }),

    new Question({
      type: 'MultipleChoice',
      text: 'What is the favourite food of Theo?',
      options: [
        new Option({text: 'Chinese'}),
        new Option({text: 'Turnips'}),
        new Option({text: 'White House'})
      ],
      answer: [{text: 'White House'}]
    })
  ]

  const multipleChoiceQuiz =  new Quiz({ name : 'Multiple Choice Quiz', questions: questions }); // Document(data in the collection/table)

  multipleChoiceQuiz.save(function (err, quiz) {
    if (err) {
      console.error('Could not save');
    } else {
      console.log(quiz)
    };
  });

})
