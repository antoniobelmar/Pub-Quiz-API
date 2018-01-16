const mongoose = require('mongoose');

const gameSchema = mongoose.Schema({
  isFinished: Boolean
});

module.exports = mongoose.model('Game', gameSchema);

