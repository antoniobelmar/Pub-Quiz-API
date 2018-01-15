'use strict';

const Party = require('./helpers/party');

function getOnOpen(ws, parties) {
  return function onOpen() {
    let url = ws.url;
    if (parties[url]) {
      parties[url].addPlayer(ws);
    } else {
      let party = new Party(url);
      party.addPlayer(ws);
      parties[url] = party;
    };
  };
};

function getOnMessage(ws, parties) {

  return function onMessage(message) {
    let party = parties[ws.url];
    let data = JSON.parse(message.data);

    switch (data.type) {
      case 'question':
      case 'endQuiz':
        if (!party.hasLeader()) {
          party.setLeader(ws);
        } else if (party.isLeader(ws)) {
          party.broadcast(data);
        };
      break;
      case 'score':
        party.setTimeout();
        party.setScore(ws, data);
      break;
      case 'endAll':
        let index = parties.indexOf(party);
        parties.splice(index, 1);
      break;
    };
  };
};

function wsConnection(ws, req) {
  let parties = [];
  ws.on('open', getOnOpen(ws, parties));
  ws.on('message', getOnMessage(ws));
};

module.exports = wsConnection;

