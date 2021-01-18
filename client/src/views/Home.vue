<template>
  <v-container fill-height fluid>
    <v-row align="center" justify="space-around">
      <v-col md="4">
        <v-card height="200" max-width="500">
          <v-card-title primary-title class="justify-center">
            Join Game
          </v-card-title>
          <v-card-actions class="flex-column align-center">
            <v-text-field
              v-model="roomCode"
              label="Enter room code"
            ></v-text-field>
            <v-btn class="green white--text" @click="joinGame()">Join!</v-btn>
          </v-card-actions>
        </v-card>
      </v-col>
      <v-col md="4">
        <v-card height="200" max-width="500">
          <v-card-title primary-title class="justify-center">
            Create Game
          </v-card-title>
          <v-card-actions class="justify-center">
            <v-btn class="ma-5 red white--text" @click="createGame()"
              >Create!</v-btn
            >
          </v-card-actions>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import axios from 'axios';

export default {
  data() {
    return {
      roomCode: null,
    };
  },
  methods: {
    async joinGame() {
      return axios({
        method: 'get',
        url: `http://localhost:9090/join/${this.roomCode}`,
      })
        .then((response) => {
          this.$store.commit('setTeams', response.data.data.teams);
          this.$router.push(`/player/${response.data.roomID}`);
        })
        .catch((error) => {
          console.log(error);
        });
    },
    async createGame() {
      return axios({
        method: 'get',
        url: 'http://localhost:9090/create',
      })
        .then((response) => {
          this.$router.push(`/host/${response.data.roomID}`);
        })
        .catch((error) => {
          console.log(error);
        });
    },
  },
  created() {
    this.$store.commit('clearData');
  },
};
</script>
