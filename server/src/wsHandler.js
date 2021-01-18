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

WebSocket.prototype.sendError = function (type, message) {
  this.send(JSON.stringify({
    control: 'error',
    data: {
      type,
      message,
    },
  }));
};

module.exports = (wss, rooms) => {
  wss.on('connection', (client, req) => {
    const roomID = req.url.substring(1, 5);
    const existingRoom = rooms.find((room) => room.id === roomID);
    if (existingRoom) {
      if (existingRoom.clients.length === 0) {
        existingRoom.host = client;
      }
      existingRoom.clients.push(client);
    } else {
      client.sendError('badRoom', `Room ${roomID} does not exist`);
      client.close();
    }

    client.on('message', (recieved) => {
      const currentRoom = rooms.find((room) => room.clients.includes(client));
      if (!currentRoom) {
        client.sendError('badRoom', `Room ${roomID} does not exist`);
      } else {
        const message = JSON.parse(recieved);
        console.log(message.control);
        console.log(message.data);
        console.log(currentRoom.clients.length);
        switch (message.control) {
          case 'setTeams': {
            message.data.forEach((team) => currentRoom.teams.push({
              name: team,
              players: [],
            }));
            console.log(currentRoom);
            broadcast('setTeams', currentRoom.teams, currentRoom.clients);
            break;
          }
          case 'playerJoin': {
            const currentTeam = currentRoom.teams.find((team) => team.name === message.data.team);
            currentTeam.players.push(message.data.name);
            broadcast('playerJoin', message.data, currentRoom.clients);
            break;
          }
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
            client.sendError('badControl', `Unknown control ${message.control} recieved`);
          }
        }
      }
    });

    /**
     * TODO
     * Fix server crashing on client disconnect
     * -> rooms.findIndex() is not a function
     */

    // client.on('close', () => {
    //   const currentRoom = rooms.find((room) => room.clients.includes(client));
    //   if (currentRoom.host === client) {
    //     const pos = rooms.findIndex(currentRoom);
    //     rooms.splice(pos, 1);
    //   } else {
    //     const pos = rooms.findIndex(client);
    //     currentRoom.clients.splice(pos, 1);
    //   }
    //   console.log(rooms);
    // });
  });
};
