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

  send(message, json_obj = JSON) {

    if (this._isOpen()) {
      try {
        this._ws.send(json_obj.stringify(message));
      } catch(error) {
        console.error(error);
      };
    } else {
      throw new Error('client disconnected');
    };
  };

  _isOpen() {
    return this._ws.readyState === this._ws.OPEN;
  };

  kill() {
    this._ws.close()
  }

};

function newPlayer(ws) {
  return new Player(ws);
};

module.exports.Player = Player;
module.exports.newPlayer = newPlayer;
