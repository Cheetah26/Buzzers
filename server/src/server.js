const express = require('express');
const cors = require('cors');
const ws = require('ws');
const wsHandler = require('./wsHandler');

const rooms = [];

const app = express();

app.use(cors());

const wsServer = new ws.Server({ noServer: true });
wsHandler(wsServer, rooms);

const server = app.listen(9090);

server.on('upgrade', (request, socket, head) => {
  wsServer.handleUpgrade(request, socket, head, (client) => {
    wsServer.emit('connection', client, request);
  });
});

app.get('/create', (req, res) => {
  const newRoom = Math.random().toString(36).substring(2, 6).toUpperCase();
  if (rooms.find((room) => room.id === newRoom)) {
    res.status(500);
  } else {
    rooms.push({
      id: newRoom,
      clients: [],
    });
    res.send({ roomID: newRoom });
  }
});

app.get('/join/:roomCode', (req, res) => {
  const currentRoom = rooms.find((room) => room.id === req.params.roomCode);
  if (currentRoom) {
    res.send({ roomID: currentRoom.id });
  } else {
    res.status(404);
  }
});
