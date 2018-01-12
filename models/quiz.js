const mongoose = require('mongoose');
const Question = require('./question');

const quizSchema = mongoose.Schema({  // SHAPE
    name: String,
    questions: []
});

module.exports = mongoose.model('quiz', quizSchema);
