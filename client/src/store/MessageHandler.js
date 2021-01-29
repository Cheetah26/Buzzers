import Vue from 'vue';

export default (state, message) => {
  const { data } = state.socket;
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
      data.countdown = null;
      data.time = message.data;
      break;
    }
    case 'startClock': {
      if (!data.countdown) {
        data.time = message.data;
        data.countdown = setInterval(() => {
          if (data.time > 0) {
            data.time -= 1;
          } else {
            clearInterval(data.countdown);
          }
        }, 1000);
      }
      break;
    }
    case 'stopClock': {
      clearInterval(data.countdown);
      data.countdown = null;
      data.time = message.data;
      break;
    }
    case 'buzz': {
      const currentTeam = data.teams.find((team) => team.name === message.data.team);
      const currentPlayer = currentTeam.players.find((player) => player.name === message.data.name);
      Vue.set(currentPlayer, 'buzzed', true);
      break;
    }
    default: {
      console.log(`Unknown control recieved: ${message.control}`);
    }
  }
};
