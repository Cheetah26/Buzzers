<template>
  <div>
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
  computed: {
    teams() {
      return this.$store.getters.getTeams;
    },
  },
  created() {
    const url = `ws://localhost:9090/${this.$route.params.room}`;
    this.$connect(url);
  },
  destroyed() {
    this.$disconnect();
  },
};
</script>
