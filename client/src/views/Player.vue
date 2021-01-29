<template>
  <div>
    <v-overlay :value="overlay" absolute>
      <v-card>
        <v-card-title primary-title> Select team and set name </v-card-title>
        <v-card-actions>
          <v-select :items="teamNames" v-model="team" label="Team"></v-select>
          <v-text-field label="Name" v-model="name"></v-text-field>
          <v-btn class="green white--text" @click="join">Continue</v-btn>
        </v-card-actions>
      </v-card>
    </v-overlay>
    <div class="d-flex justify-space-around flex-wrap">
      <time-card class="pa-5 ma-5" />
      <team-card v-for="team in teams" :key="team.name" :team="team" />
    </div>
  </div>
</template>

<script>
import TimeCard from '@/components/TimeCard.vue';
import TeamCard from '@/components/TeamCard.vue';

export default {
  name: 'Home',
  components: {
    TimeCard,
    TeamCard,
  },
  data() {
    return {
      name: '',
      team: '',
      overlay: true,
    };
  },
  computed: {
    teams() {
      return this.$store.getters.getTeams;
    },
    teamNames() {
      const teamNames = [];
      this.teams.forEach((team) => teamNames.push(team.name));
      return teamNames;
    },
    self() {
      return { name: this.name, team: this.team };
    },
  },
  methods: {
    join() {
      this.$store.commit('setSelf', this.self);
      this.sendMessage('playerJoin', this.self);
      this.overlay = false;
    },
  },
  created() {
    const url = `ws://localhost:9090/${this.$route.params.room}`;
    this.$connect(url);
  },
  destroyed() {
    // Leave the room & disconnect from WS server
    this.sendMessage('leave', this.self);
    this.$disconnect();

    // Reset the local data
    this.$store.commit('reset');
  },
};
</script>
