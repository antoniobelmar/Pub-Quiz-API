'use strict';

class Player { 
  constructor(ws) {
    this._ws = ws;
    this._score = 0;
  };

  set score(score) {
    this._score = score;
  };

  get score() {
    return this._score;
  };

  get ws() {
    return this._ws;
  };

  send(message) {
    if (this._isOpen()) {
      this._ws.send(message);
    } else {
      throw new Error('client disconnected'); 
    };
  };

  _isOpen() {
    return this._ws.readyState === this._ws.OPEN;
  };
};

function newPlayer(ws) {
  return new Player(ws);
};

module.exports.Player = Player;
module.exports.newPlayer = newPlayer;
