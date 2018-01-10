const Question = require('./question');
const Quiz = require('./quiz');

var questions = [
  new Question({
    type: 'MultipleChoice',
    text: 'What is the capital of the France',
    options: ['Rome', 'London', 'Paris'],
    answer: [2]
  }),

  new Question({
    type: 'MultipleChoice',
    text: 'What is the color of the sky?',
    options: ['Purple', 'Blue', 'Green', 'Yellow'],
    answer: [1]
  }),

  new Question({
    type: 'MultipleChoice',
    text: 'What is Allan\'s favourite band?',
    options: ['Spice Girls', 'Oasis', 'One Direction'],
    answer: [2]
  }),

  new Question({
    type: 'MultipleChoice',
    text: 'What is Theo\s favourite food?',
    options: ['Marmite', 'Hummous', 'Turnips'],
    answer: [2]
  }),

  new Question({
    type: 'MultipleChoice',
    text: 'How many names has Kay had in her entire lifetime?',
    options: ['5', '6', '7'],
    answer: [0]
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
