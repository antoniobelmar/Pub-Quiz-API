const mongoose = require('mongoose');

const questionSchema = mongoose.Schema({
  type: String,
  text: String,
  options: [],
  answer: []
});

module.exports = mongoose.model('Question', questionSchema);
