const WebSocket = require('ws');

const rooms = [];

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

module.exports = (wss) => {
  wss.on('connection', (client, req) => {
    console.log(req.url);
    const existingRoom = rooms.find((room) => room.id === req.url);
    if (existingRoom) {
      existingRoom.clients.push(client);
    } else {
      console.log('creating new room');
      rooms.push({
        id: req.url,
        clients: [
          client,
        ],
      });
    }

    client.on('message', (recieved) => {
      const currentRoom = rooms.find((room) => room.clients.includes(client));
      const message = JSON.parse(recieved);
      console.log(message);
      console.log(currentRoom.clients.length);
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
  });
};
