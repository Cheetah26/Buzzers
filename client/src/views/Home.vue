<template>
  <v-container fill-height fluid>
    <v-row align="center" justify="space-around">
      <v-col md="4">
        <v-card height="200"  max-width="500">
          <v-card-title primary-title class="justify-center">
            Join Game
          </v-card-title>
          <v-card-actions class="flex-column align-center">
            <v-text-field
              v-model="roomCode"
              label="Enter room code"
            ></v-text-field>
            <v-btn class="green white--text">Join!</v-btn>
          </v-card-actions>
        </v-card>
      </v-col>
      <v-col md="4">
        <v-card height="200" max-width="500">
          <v-card-title primary-title class="justify-center"> Create Game </v-card-title>
          <v-card-actions class="justify-center">
            <v-btn class="ma-5 red white--text">Create!</v-btn>
          </v-card-actions>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  data() {
    return {
      roomCode: null,
    };
  },
  methods: {
    joinGame() {
      console.log(this.roomCode);
    },
  },
};
</script>
