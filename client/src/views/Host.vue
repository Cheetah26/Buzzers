<template>
  <div>
    <div class="d-flex justify-space-around flex-wrap">
      <control-card time="8:00" class="pa-5 ma-5" />
      <team-card v-for="team in teams" :key="team.name" :team="team" />
    </div>
  </div>
</template>

<script>
import Vue from 'vue';
import VueNativeSock from 'vue-native-websocket';
import TeamCard from '@/components/TeamCard.vue';
import ControlCard from '@/components/ControlCard.vue';

export default {
  name: 'Home',
  components: {
    TeamCard,
    ControlCard,
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
