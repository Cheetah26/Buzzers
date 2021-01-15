const WebSocket = require('ws');

const wss = new WebSocket.Server({ port: 9090 });
console.log(`Listening on port ${wss.options.port}`);

function broadcast(control, data) {
  wss.clients.forEach((client) => {
    if (client.readyState === WebSocket.OPEN) {
      client.send(JSON.stringify({
        control,
        data,
      }));
    }
  });
}

wss.on('connection', (ws) => {
  ws.on('message', (recieved) => {
    const message = JSON.parse(recieved);
    console.log(message);
    switch (message.control) {
      case 'setClock': {
        broadcast('stopClock', message.data);
        break;
      }
      case 'startClock': {
        broadcast('startClock', message.data);
        break;
      }
      case 'stopClock': {
        broadcast('stopClock', message.data);
        break;
      }
      default: {
        ws.send(JSON.stringify({
          control: 'error',
          data: 'Unknown websocket control recieved',
        }));
      }
    }
  });
});
