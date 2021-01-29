<template>
  <div>
    <v-overlay :value="!teams" absolute>
      <v-card>
        <v-card-title primary-title>
          Enter team names
        </v-card-title>
        <v-card-actions>
          <v-text-field
            v-model="team1"
            label="Team One"
          ></v-text-field>
          <v-text-field
            v-model="team2"
            label="Team Two"
          ></v-text-field>
          <v-btn class="green white--text" @click="setTeams()">Set</v-btn>
        </v-card-actions>
      </v-card>
    </v-overlay>
    <div class="d-flex justify-space-around flex-wrap">
      <control-card time="8:00" class="pa-5 ma-5" />
      <team-card v-for="team in teams" :key="team.name" :team="team" />
    </div>
  </div>
</template>

<script>
import TeamCard from '@/components/TeamCard.vue';
import ControlCard from '@/components/ControlCard.vue';

export default {
  name: 'Home',
  components: {
    TeamCard,
    ControlCard,
  },
  data() {
    return {
      team1: null,
      team2: null,
    };
  },
  computed: {
    teams() {
      return this.$store.getters.getTeams;
    },
  },
  methods: {
    setTeams() {
      if (this.team1 && this.team2) {
        this.sendMessage('setTeams', [this.team1, this.team2]);
      }
    },
  },
  created() {
    const url = `ws://localhost:9090/${this.$route.params.room}`;
    this.$connect(url);
  },
  destroyed() {
    // Leave the room & disconnect from WS server
    this.sendMessage('leave');
    this.$disconnect();

    // Reset the local data
    this.$store.commit('reset');
  },
};
</script>
