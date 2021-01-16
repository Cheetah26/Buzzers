const WebSocket = require('ws');

function broadcast(control, data, clients) {
  clients.forEach((client) => {
    if (client.readyState === WebSocket.OPEN) {
      client.send(JSON.stringify({
        control,
        data,
      }));
    }
  });
}

module.exports = (wss, rooms) => {
  wss.on('connection', (client, req) => {
    const roomID = req.url.substring(1, 5);
    console.log(roomID);
    const existingRoom = rooms.find((room) => room.id === roomID);
    if (existingRoom) {
      if (existingRoom.clients.length === 0) {
        existingRoom.host = client;
      }
      existingRoom.clients.push(client);
    } else {
      client.send(JSON.stringify({
        control: 'error',
        data: 'Room does not exist',
      }));
    }

    client.on('message', (recieved) => {
      const currentRoom = rooms.find((room) => room.clients.includes(client));
      console.log(currentRoom);
      const message = JSON.parse(recieved);
      console.log(message);
      switch (message.control) {
        case 'setClock': {
          broadcast('stopClock', message.data, currentRoom.clients);
          break;
        }
        case 'startClock': {
          broadcast('startClock', message.data, currentRoom.clients);
          break;
        }
        case 'stopClock': {
          broadcast('stopClock', message.data, currentRoom.clients);
          break;
        }
        default: {
          client.send(JSON.stringify({
            control: 'error',
            data: 'Unknown websocket control recieved',
          }));
        }
      }
    });

    /**
     * TODO
     * Fix server crashing on client disconnect
     * -> rooms.findIndex() is not a function
     */

    client.on('close', () => {
      const currentRoom = rooms.find((room) => room.clients.includes(client));
      if (currentRoom.host === client) {
        const pos = rooms.findIndex(currentRoom);
        rooms.splice(pos, 1);
      } else {
        const pos = rooms.findIndex(client);
        currentRoom.clients.splice(pos, 1);
      }
      console.log(rooms);
    });
  });
};
