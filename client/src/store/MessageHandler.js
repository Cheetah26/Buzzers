export default (state, message) => {
  const { data } = state.socket.message;
  switch (message.control) {
    case 'error': {
      state.socket.error = true;
      state.socket.errorData = message.data;
      break;
    }
    case 'setTeams': {
      data.teams = message.data;
      break;
    }
    case 'playerJoin': {
      const currentTeam = data.teams.find((team) => team.name === message.data.team);
      currentTeam.players.push({ name: message.data.name });
      break;
    }
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
