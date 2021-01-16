<template>
  <div>
    <div class="d-flex justify-space-around flex-wrap">
      <time-card class="pa-5 ma-5" />
      <team-card v-for="team in teams" :key="team.name" :team="team" />
    </div>
  </div>
</template>

<script>
import Vue from 'vue';
import VueNativeSock from 'vue-native-websocket';
import TimeCard from '@/components/TimeCard.vue';
import TeamCard from '@/components/TeamCard.vue';

export default {
  name: 'Home',
  components: {
    TimeCard,
    TeamCard,
  },
  computed: {
    teams() {
      return this.$store.getters.getTeams;
    },
  },
  created() {
    const store = this.$store;
    const url = `ws://localhost:9090/${this.$route.params.room}`;
    Vue.use(VueNativeSock, url, { store, format: 'json' });
  },
};
</script>
