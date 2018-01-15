'use strict';

function getOnOpen(ws) {
  return function onOpen() {
    ws.send('open!');
  };
};

function getOnMessage(ws) {
  let counts = {};

  return function onMessage(message) {
    let url = message.originalUrl;
    if (counts[url]) {
      counts[url] += 1;
    } else {
      counts[url] = 1;
    };
    ws.send(counts[url] + ' ' + message);
  };
};

function wsConnection(ws, req) {
  console.log('connection request');
  ws.on('open', getOnOpen(ws));
  ws.on('message', getOnMessage(ws));
};

module.exports = wsConnection;
