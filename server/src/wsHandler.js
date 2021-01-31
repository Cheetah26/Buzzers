const WebSocket = require('ws');

// Send the same message to all clients in a room
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

// Send an error on a connection
WebSocket.prototype.sendError = function (type, message) {
  this.send(JSON.stringify({
    control: 'error',
    data: {
      type,
      message,
    },
  }));
};

// Find a team in a room by name
function getTeam(teamName, room) {
  return room.teams.find((team) => team.name === teamName);
}

// Find a player in a room by name
function getPlayer(team, name, room) {
  const currentTeam = getTeam(team, room);
  return currentTeam.players.find((player) => player.name === name);
}

module.exports = (wss, rooms) => {
  wss.on('connection', (client, req) => {
    // Get the room ID from the connection URL
    const roomID = req.url.substring(1, 5);
    const existingRoom = rooms.find((room) => room.id === roomID);
    if (existingRoom) {
      // If the room exists and has no existing connections,
      // set this connection as the host
      if (existingRoom.clients.length === 0) {
        existingRoom.host = client;
      }
      // Add the connection to the room
      existingRoom.clients.push(client);
    } else {
      // Send an error if the room does not / no longer exist(s)
      client.sendError('badRoom', `Room ${roomID} does not exist`);
      client.close();
    }

    client.on('message', (recieved) => {
      /**
       * TODO
       * Wrap this whole thing in a try-catch to keep the server running
       * in the event of an unknown error (and hope it's not too broken)
       */
      const currentRoom = rooms.find((room) => room.clients.includes(client));
      if (!currentRoom) {
        client.sendError('badRoom', `Room ${roomID} does not exist`);
      } else {
        const message = JSON.parse(recieved);
        console.log(message.control);
        console.log(message.data);
        // console.log(currentRoom.clients.length);
        switch (message.control) {
          /**
           * TODO
           * Check that any 'host actions' are actually being called by the host
           */
          case 'setTeams': {
            // Add each team to the local data
            message.data.forEach((team) => currentRoom.teams.push({
              name: team,
              players: [],
            }));
            // Return the info to everyone in the room (aka just the host)
            broadcast('setTeams', currentRoom.teams, currentRoom.clients);
            break;
          }
          case 'playerJoin': {
            // Define a player with the correct info
            const playerData = {
              name: message.data.name,
              team: message.data.team,
              buzzed: false,
            };
            // Find their team and add them
            getTeam(playerData.team, currentRoom).players.push(playerData);
            // Broadcast update
            broadcast('playerJoin', playerData, currentRoom.clients);
            break;
          }
          case 'leave': {
            // Check if the host is leaving
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
              // Find and remove the player from the data
              const currentTeam = getTeam(message.data.team, currentRoom);
              const currentPlayer = getPlayer(message.data.team, message.data.name, currentRoom);
              currentTeam.players.splice(currentTeam.players.indexOf(currentPlayer), 1);
              broadcast('playerLeave', message.data, currentRoom.clients);
            }
            break;
          }
          case 'startClock': {
            // Check if the clock is already running
            if (!currentRoom.countdown) {
              // Match the time to the host
              currentRoom.time = message.data;
              // Start the countdown on the server
              currentRoom.countdown = setInterval(() => {
                if (currentRoom.time > 0) {
                  currentRoom.time -= 1;
                } else {
                  clearInterval(currentRoom.countdown);
                }
              }, 1000);
              // Broadcast
              broadcast('startClock', message.data, currentRoom.clients);
            }
            break;
          }
          case 'stopClock': {
            // Stop the countdown
            clearInterval(currentRoom.countdown);
            currentRoom.countdown = null;
            // Match the time to the host
            currentRoom.time = message.data;
            // Broadcast
            broadcast('stopClock', message.data, currentRoom.clients);
            break;
          }
          case 'buzz': {
            /**
             * TODO
             * Make sure that only one player can be buzzed at a time
             */
            // Find the player who buzzed & set the local data
            getPlayer(message.data.team, message.data.name, currentRoom).buzzed = true;
            // Broadcast
            broadcast('buzz', message.data, currentRoom.clients);
            break;
          }
          case 'clearBuzz': {
            // Just clear all the buzzers
            currentRoom.teams.forEach((team) => {
              team.players.forEach((player) => {
                player.buzzed = false; // eslint-disable-line no-param-reassign
              });
            });
            // Broadcast
            broadcast('clearBuzz', null, currentRoom.clients);
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
     * Fix close to check if a client is still listed and emit the
     * appropriate 'leave' message
     *
     * Note: This might require restructuring a bunch of data to have
     * players associated with connections
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
