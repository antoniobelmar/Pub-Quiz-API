'use strict';

class Player { 
  constructor(ws) {
    this._ws = ws;
    this._score = 0;
  };

  addPoint() {
    this._score++;
  };

  get score() {
    return this._score;
  };
};

function newPlayer(ws) {
  return new Player(ws);
};

module.exports.Player = Player;
module.exports.newPlayer = newPlayer;
