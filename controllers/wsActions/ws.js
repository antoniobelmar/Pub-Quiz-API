'use strict';
const Game = require('../../models/game')
const partiesModule = require('./helpers/parties');
let parties = new partiesModule.Parties();

function getOnMessage(ws, req, model = Game) {
  return function onMessage(message) {
    console.log('got message', message);
    let party = parties.get(req.url);
    console.log(party.url, party._players.length);
    let data = JSON.parse(message);

    switch (data.type) {
      case ‘here comes the leader’:
      case ‘startQuiz’:
      case ‘question’:
      case ‘endQuiz’:
        if (!party.hasLeader()) {
          party.setLeader(ws);
          party.sendLeader();
        };
        if (party.isLeader(ws)) {
          party.broadcast(data);
        };
      break;
      case 'score':
        party.setTimeout();
        party.setScore(ws, data);
      break;
      case 'kill':
        parties.remove(party);
        party.kill()
        model.finishQuiz(data.wsId)
      break;
    };
  };
};

function wsConnection(ws, req) {
  console.log('received request');
  let party = parties.get(req.url);
  party.addPlayer(ws);
  ws.on('message', getOnMessage(ws, req));
};

module.exports = wsConnection;
