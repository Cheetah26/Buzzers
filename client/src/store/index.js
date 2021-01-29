import Vue from 'vue';
import Vuex from 'vuex';

import data from '@/store/defaultData';
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
      data,
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
      state.socket.data = data;
    },
    clearError(state) {
      state.socket.error = false;
    },
    setTeams(state, teams) {
      state.socket.data.teams = teams;
    },
    // setData(state, data) {
    //   state.socket.message.data = data;
    // },
    setSelf(state, self) {
      state.socket.data.self = self;
    },
  },
  getters: {
    getTime: (state) => state.socket.data.time,
    getTeams: (state) => state.socket.data.teams,
    getSelf: (state) => state.socket.data.self,
    getError: (state) => ({
      error: state.socket.error,
      data: state.socket.errorData,
    }),
  },
});
