'use strict';

const newPlayer = require('./player').newPlayer;

class Party {
  constructor(url) {
    this._url = url;
    this._players = [];
  };

  getPlayer(ws) {
    let players = this._players;
    for (let i = 0; i < players.length; i++) {
      if (players[i].ws == ws) {
        return players[i];
      };
    };
  };

  setScore(ws, score) {
    this.getPlayer(ws).score = score;
  };

  setLeader(ws) {
    this._leader = ws;
  };

  hasLeader() {
    return this._leader !== undefined;
  };

  isLeader(ws) {
    return ws == this._leader;
  };

  addPlayer(ws, constructor = newPlayer) {
    let player = constructor(ws);
    this._players.push(player);
  };

  broadcast(message) {
    this._players.forEach(this.getSend(message));
  };

  broadcastScores() {
    this.broadcast(this._makescores());
  };

  setTimeout() {
    setTimeout(this.broadcastScores, 5000);
  };

  getSend(message) {
    let players = this._players;

    return function send(player) {
      try {
        player.send(message);
      } catch(error) {
        let index = players.indexOf(player);
        players.splice(index, 1);
      };
    };
  };

  _makeScores(scores, json_obj) {
    return json_obj.stringify({ 
      type: 'scores', 
      scores: this._players.map((p) => { p.score });
    });
  };
};

module.exports.Party = Party;
