const Question = require('./question');
const Quiz = require('./quiz');
const mongoose = require('mongoose');

const conn = mongoose.connect('mongodb://localhost:27017/pub-quiz-development');
mongoose.connection.on('open', function() {

  conn.connection.db.dropDatabase();

  const questionFrance = new Question({
    type: 'MultipleChoice',
    text: 'What is the capital of the France',
    options: ['Rome', 'London', 'Paris'],
    answer: [2]
  });

  const questionSky = new Question({
    type: 'MultipleChoice',
    text: 'What is the color of the sky?',
    options: ['Purple', 'Blue', 'Green'],
    answer: [1]
  });


  const multipleChoiceQuiz =  new Quiz({name : 'Multiple Choice Quiz'}); // Document(data in the collection/table)
  multipleChoiceQuiz.questions.push(questionFrance)
  multipleChoiceQuiz.questions.push(questionSky)

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
