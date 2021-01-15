import Vue from 'vue';
import Vuex from 'vuex';

import MessageHandler from '@/store/MessageHandler';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    socket: {
      isConnected: false,
      reconnectError: false,
      message: {
        control: {},
        data: {
          time: 500,
          teams: [
            {
              name: 'Team 1',
              captain: 'Eric',
              players: [
                {
                  name: 'John',
                  buzzed: false,
                },
                {
                  name: 'Eric',
                  buzzed: false,
                  captain: true,
                },
                {
                  name: 'Joby',
                  buzzed: true,
                },
              ],
            },
            {
              name: 'Team 2',
              players: [
                {
                  name: 'Arianna',
                  buzzed: false,
                  captain: true,
                },
                {
                  name: 'Jack',
                  buzzed: false,
                },
              ],
            },
          ],
        },
      },
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
    // default handler called for all methods
    SOCKET_ONMESSAGE(state, message) {
      MessageHandler(state, message);
    },
    // mutations for reconnect methods
    SOCKET_RECONNECT(state, count) {
      console.info(state, count);
    },
    SOCKET_RECONNECT_ERROR(state) {
      state.socket.reconnectError = true;
    },
  },
  getters: {
    getTime: (state) => state.socket.message.data.time,
    getTeams: (state) => state.socket.message.data.teams,
  },
});
