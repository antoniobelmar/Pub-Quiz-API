const http = require('http');
const url = require('url');
const WebSocket = require('ws');
const app = require('./app');

const PORT = process.env.PORT || 5000;
const server = http.createServer(app);
const wss = new WebSocket.Server({ server });
let leaderQuestionNumber;

var scores = []

wss.on('connection', function connection(ws, req){
  console.log('person joined');
  if (leaderQuestionNumber != undefined) {
    wss.clients.forEach(function each(client) {
      if (client.readyState === WebSocket.OPEN) {
        client.send(leaderQuestionNumber);
      };
    });
  };
  
  const location = url.parse(req.url, true);
  ws.identifier = wss.clients.size;

  ws.on('message', function incoming(message) {
    jsonMessage = JSON.parse(message)
    if(jsonMessage.type == 'score'){
      scores.push(jsonMessage)
    };
    console.log(scores.length)
    if (jsonMessage.type == 'question' && ws.identifier == 1) {
      leaderQuestionNumber = jsonMessage;
    };

    wss.clients.forEach(function each(client) {
      if (client.readyState === WebSocket.OPEN) {
        if(jsonMessage.type == 'question'){
          if (ws.identifier == 1) {
            client.send(JSON.stringify(jsonMessage));
          };
        };
      };
    });
    if(wss.clients.size === scores.length){
      wss.clients.forEach(function each(client) {
        console.log('message sent')
        client.send(JSON.stringify(scores))
      })
    scores = []
    };
  });

  ws.on('close', function close() {
    if (wss.clients.size === 0) {
      leaderQuestionNumber = undefined;
      console.log('everyone is gone');
    };
  });

  ws.on('error', function(error) {
    console.log('one person has left');
  });
});

server.listen(PORT, function(){
  console.log('server running on port 5000');
});
