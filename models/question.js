const mongoose = require('mongoose');

const questionSchema = mongoose.Schema({
  type: String,
  text: String,
  options: [ String ],
  answer: [ String ]
});

module.exports = mongoose.model('Question', questionSchema);
