const Question = require('./question');
const Quiz = require('./quiz');
const mongoose = require('mongoose');

mongoose.connection.on('open', function() {

  conn.connection.db.dropDatabase();

  var questions = [
    new Question({
      type: 'MultipleChoice',
      text: 'What is the capital of the France',
      options: ['Rome', 'London', 'Paris'],
      answer: ['Paris']
    }),

    new Question({
      type: 'MultipleChoice',
      text: 'What is the color of the sky?',
      options: ['Purple', 'Blue', 'Green', 'Yellow'],
      answer: ['Blue']
    }),

    new Question({
      type: 'MultipleChoice',
      text: 'What is Allan\'s favourite band?',
      options: ['Spice Girls', 'Oasis', 'One Direction'],
      answer: ['One Direction']
    }),

    new Question({
      type: 'MultipleChoice',
      text: 'What is Theo\s favourite food?',
      options: ['Marmite', 'Hummous', 'Turnips'],
      answer: ['Marmite']
    }),

    new Question({
      type: 'MultipleChoice',
      text: 'How many names has Kay had in her entire lifetime?',
      options: ['5', '6', '7'],
      answer: ['5']
    })
  ]


  const multipleChoiceQuiz =  new Quiz({ name : 'Multiple Choice Quiz' }); // Document(data in the collection/table)

  questions.forEach(function(question) {
    multipleChoiceQuiz.questions.push(question);
  });

  multipleChoiceQuiz.save(function (err, quiz) {
    if (err) {
      console.error('Could not save');
    };
  });

  const questionPingPong = new Question({
    type: 'Text',
    text: 'What do Oleg and Tabish love to play?',
    options: ['Ping Pong'],
    answer: [0]
  });

  const questionRob = new Question({
    type: 'Text',
    text: "What is Rob's nickname?",
    options: ['Sneaky Rob'],
    answer: [0]
  });

  const textQuiz = new Quiz({name : 'Text Quiz'});


  textQuiz.questions.push(questionPingPong)
  textQuiz.questions.push(questionRob)

  textQuiz.save(function (err, quiz) {
    if (err) {
      console.error('Could not save');
    };
  });

})
