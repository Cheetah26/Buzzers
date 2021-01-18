import Vue from 'vue';
import Vuex from 'vuex';

import defaultData from '@/store/defaultData';
import MessageHandler from '@/store/MessageHandler';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    socket: {
      isConnected: false,
      reconnectError: false,
      error: false,
      errorData: {
        type: '',
        message: '',
      },
      defaultData,
    },
  },
  mutations: {
    SOCKET_ONOPEN(state, event) {
      Vue.prototype.$socket = event.currentTarget;
      state.socket.isConnected = true;
    },
    SOCKET_ONCLOSE(state) {
      state.socket.isConnected = false;
    },
    SOCKET_ONERROR(state, event) {
      console.error(state, event);
    },
    SOCKET_ONMESSAGE(state, message) {
      // Pass all normal messages to the handler
      MessageHandler(state, message);
    },
    SOCKET_RECONNECT(state, count) {
      console.info(state, count);
    },
    SOCKET_RECONNECT_ERROR(state) {
      state.socket.reconnectError = true;
    },
    // Local modifiers
    clearData(state) {
      state.socket.message = defaultData;
    },
    clearError(state) {
      state.socket.error = false;
    },
    setTeams(state, teams) {
      state.socket.message.data.teams = teams;
    },
    setData(state, data) {
      state.socket.message.data = data;
    },
    setName(state, name) {
      state.socket.message.data.name = name;
    },
    setTeam(state, team) {
      state.socket.message.data.team = team;
    },
  },
  getters: {
    getTime: (state) => state.socket.message.data.time,
    getTeams: (state) => state.socket.message.data.teams,
    getName: (state) => state.socket.message.data.name,
    getTeam: (state) => state.socket.message.data.team,
    getError: (state) => ({
      error: state.socket.error,
      data: state.socket.errorData,
    }),
  },
});
