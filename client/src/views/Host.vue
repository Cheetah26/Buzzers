<template>
  <div>
    <div class="d-flex justify-space-around flex-wrap">
      <control-card startTime="8:00" class="pa-5 ma-5" />
      <v-card max-width="600" class="pa-5 ma-5" v-for="team in teams" :key="team.name">
        <v-card-title class="justify-center text-h3">
          {{ team.name }}
        </v-card-title>

        <player-card
          v-for="player in team.players"
          :key="player.name"
          :name="player.name"
          :buzzed="player.buzzed"
          :captain="player.captain"
          class="ma-5"
        >
        </player-card>
      </v-card>
    </div>
  </div>
</template>

<script>
import PlayerCard from '@/components/PlayerCard.vue';
import ControlCard from '@/components/ControlCard.vue';

export default {
  name: 'Home',
  components: {
    PlayerCard,
    ControlCard,
  },

  data() {
    return {
      time: '4:57',
      teams: [
        {
          name: 'Team 1',
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
    };
  },
};
</script>
