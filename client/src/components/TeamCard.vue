<template>
  <div>
    <v-card max-width="600" class="pa-5 ma-5" :key="team.name">
      <v-card-title class="justify-center text-h3">
        {{ team.name }}
      </v-card-title>

      <v-card
        v-for="player in team.players"
        :key="player.name"
        class="text-center ma-5"
      >
        <v-card-text :class="playerColors(player)" class="text-h5">
          <v-icon v-if="player.captain">mdi-star</v-icon>
          {{ player.name }}
        </v-card-text>
      </v-card>
    </v-card>
  </div>
</template>

<script>
export default {
  props: {
    team: Object,
  },
  methods: {
    playerColors(player) {
      return player.buzzed ? 'red white--text' : 'white black--text';
    },
  },
};
</script>
