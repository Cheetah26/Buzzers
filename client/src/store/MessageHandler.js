export default (state, message) => {
  const { data } = state.socket.message;
  switch (message.control) {
    case 'setClock': {
      clearInterval(data.countdown);
      data.time = message.data;
      break;
    }
    case 'startClock': {
      data.time = message.data;
      data.countdown = setInterval(() => {
        if (data.time > 0) {
          data.time -= 1;
        } else {
          clearInterval(data.countdown);
        }
      }, 1000);
      break;
    }
    case 'stopClock': {
      clearInterval(data.countdown);
      data.time = message.data;
      break;
    }
    default: {
      console.log(`Unknown control recieved: ${message.control}`);
    }
  }
};
