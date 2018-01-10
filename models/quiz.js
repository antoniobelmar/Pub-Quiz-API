const mongoose = require('./setup').mongoose
const Question = require('./question');

const quizSchema = mongoose.Schema({  // SHAPE
    name: String,
    questions: []
});

const Quiz = mongoose.model('quiz', quizSchema); // Collection (table)

module.exports = Quiz
