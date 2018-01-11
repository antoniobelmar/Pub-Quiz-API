const express = require('express');
const http = require('http');
const url = require('url');
const WebSocket = require('ws');

const app = express();
const PORT = process.env.PORT || 5000;
const server = http.createServer(app);
const wss = new WebSocket.Server({ server })

// middlewares

app.use(require('./middlewares/headers'));

// routes

app.use('/quiz', require('./controllers/quiz'));

// web sockets

wss.on('connection', function connection(ws, req){
  console.log('person joined');
  const location = url.parse(req.url, true);
  ws.identifier = wss.clients.size;

  ws.on('message', function incoming(message) {
    wss.clients.forEach(function each(client) {
      if (client.readyState === WebSocket.OPEN) {
        if (ws.identifier == 1) {
          client.send(message);
        };
      };
    });
  });

  ws.on('error', function(error) {
    console.log('one person has left');
  });
});

// server

server.listen(PORT, function(){
  console.log('server running on port 5000');
});

module.exports = app;
