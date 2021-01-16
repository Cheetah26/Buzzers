const express = require('express');
const ws = require('ws');
const wsHandler = require('./wsHandler');

const app = express();

const wsServer = new ws.Server({ noServer: true });
wsHandler(wsServer);

const server = app.listen(9090);

server.on('upgrade', (request, socket, head) => {
  wsServer.handleUpgrade(request, socket, head, (client) => {
    wsServer.emit('connection', client, request);
  });
});

app.get('/', (req, res) => {
  res.send('Hi');
});

app.get('/rooms/:id', (req, res) => {
  res.send(`<h1> you are in room ${req.params.id}`);
});
