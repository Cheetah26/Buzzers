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
      data: { ...defaultData },
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
    reset(state) {
      state.socket.data = { ...defaultData };
    },
    setDataField(state, payload) {
      // This is probably terrible design, but it beats
      // writing out a function for every single change
      Vue.set(state.socket.data, payload.field, payload.data);
    },
    clearError(state) {
      state.socket.error = false;
    },
    setTeams(state, teams) {
      state.socket.data.teams = teams;
    },
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
