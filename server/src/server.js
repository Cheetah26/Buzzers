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
  // Create the ID for the new room
  const newRoomID = Math.random().toString(36).substring(2, 6).toUpperCase();
  // Make sure it is not a duplicate
  if (rooms.find((room) => room.id === newRoomID)) {
    res.status(500);
  } else {
    // Create the room locally
    const newRoom = {
      id: newRoomID,
      host: undefined,
      time: 480,
      countdown: undefined,
      clients: [],
      teams: [],
    };
    rooms.push(newRoom);
    // Send the info back to the client
    res.send({
      roomID: newRoomID,
      time: newRoom.time,
    });
  }
});

app.get('/join/:roomCode', (req, res) => {
  // Find the requested room and make sure it exists
  const currentRoom = rooms.find((room) => room.id === req.params.roomCode);
  if (currentRoom) {
    // Reply with info for the room
    res.send({
      roomID: currentRoom.id,
      time: currentRoom.time,
      teams: currentRoom.teams,
      /**
       * TODO
       * Send if the clock is currently running
       */
    });
  } else {
    /**
     * TODO
     * Create a proper error response for an invalid room
     */
    res.status(404);
  }
});
