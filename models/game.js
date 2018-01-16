const mongoose = require('mongoose');

const gameSchema = mongoose.Schema({
  isFinished: Boolean
});

gameSchema.statics.finishQuiz = function(wsId) {
  return this.model('Game').findById(wsId, function(err, game) {
    game.isFinished = true
    game.save(function(err) {
      if (err) {
        console.log(err)
      }
    })
  })
}

module.exports = mongoose.model('Game', gameSchema);
