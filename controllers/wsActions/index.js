'use strict';

const Party = require('./helpers/party');

function getOnOpen(ws, parties) {
  return function onOpen() {
    let url = message.originalUrl;
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
  let party = parties[message.originalUrl];

  return function onMessage(message) {
    let data = JSON.parse(message.data);
    switch (data.type) {
      case 'question':
      case 'endQuiz':
        break;
      case 'score':
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

