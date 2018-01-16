'use strict';

const partiesModule = require('./helpers/parties');
let parties = new partiesModule.Parties();

function getOnMessage(ws, req) {
  return function onMessage(message) {
    console.log('got message', message);
    let party = parties.get(req.url);
    console.log(party.url, party._players.length);
    let data = JSON.parse(message);

    switch (data.type) {
      case 'question':
      case 'endQuiz':
        if (!party.hasLeader()) {
          party.setLeader(ws);
        };
        if (party.isLeader(ws)) {
          party.broadcast(data);
        };
      break;
      case 'score':
        party.setTimeout();
        party.setScore(ws, data);
      break;
      case 'endAll':
        parties.remove(party);
      break;
    };
  };
};

function wsConnection(ws, req) {
  console.log('recieved request');
  let party = parties.get(req.url);
  party.addPlayer(ws);
  ws.on('message', getOnMessage(ws, req));
};

module.exports = wsConnection;

