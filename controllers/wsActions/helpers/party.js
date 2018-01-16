'use strict';

const newPlayer = require('./player').newPlayer;

class Party {
  constructor(url) {
    this._url = url;
    this._players = [];
  };

  get url() {
    return this._url;
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

  getBroadcastScores(self) {
    return function broadcastScores() {
      self.broadcast(self._makeScores());
    };
  };

  setTimeout() {
    setTimeout(this.getBroadcastScores(this), 3000);
  };

  getSend(message) {
    let players = this._players;

    return function send(player) {
      try {
        console.log('sending', message);
        player.send(message);
      } catch(error) {
        console.error('Error in sending message');
        let index = players.indexOf(player);
        players.splice(index, 1);
      };
    };
  };

  _makeScores(scores, json_obj = JSON) {
    return {
      type: 'scores',
      scores: this._players.map(function(p) { return p.score })
    };
  };
};

function newParty(url) {
  return new Party(url);
};

module.exports.Party = Party;
module.exports.newParty = newParty;
