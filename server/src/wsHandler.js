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
        // console.log(currentRoom.clients.length);
        switch (message.control) {
          case 'setTeams': {
            message.data.forEach((team) => currentRoom.teams.push({
              name: team,
              players: [],
            }));
            broadcast('setTeams', currentRoom.teams, currentRoom.clients);
            break;
          }
          case 'playerJoin': {
            const playerData = { name: message.data.name, team: message.data.team, buzzed: false };
            const currentTeam = currentRoom.teams.find((team) => team.name === message.data.team);
            currentTeam.players.push(playerData);
            broadcast('playerJoin', playerData, currentRoom.clients);
            break;
          }
          case 'leave': {
            if (currentRoom.host === client) {
              // Disconnect the clients from the room
              currentRoom.clients.forEach((c) => {
                c.sendError('roomClose', 'The host has left, and the room is now closed.');
                c.close();
              });
              // Remove the room data from the server
              rooms.splice(rooms.indexOf(currentRoom), 1);
              console.log(rooms.length);
            } else {
              broadcast('playerLeave', message.data, currentRoom.clients);
            }
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
          case 'buzz': {
            broadcast('buzz', message.data, currentRoom.clients);
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
    //   console.log(rooms.length);
    //   const currentRoom = rooms.find((room) => room.clients.includes(client));
    //   if (currentRoom.host === client) {
    //     // Kick all of the clients
    //     currentRoom.clients.forEach((c) => {
    //       c.close();
    //     });
    //     // Remove the room data from the server
    //     const pos = rooms.indexOf(currentRoom);
    //     rooms.splice(pos, 1);
    //   } else {
    //     // Remove the player from the room
    //     const pos = rooms.indexOf(client);
    //     currentRoom.clients.splice(pos, 1);
    //   }
    //   console.log(rooms.length);
    // });
  });
};
