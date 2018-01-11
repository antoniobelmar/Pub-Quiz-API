const mongoose = require('./setup').mongoose;

const questionSchema = mongoose.Schema({
  type: String,
  text: String,
  options: [ String ],
  answer: [ String ]
});

const Question = mongoose.model('Question', questionSchema);

module.exports = Question
