<template>
  <div>
    <div class="d-flex justify-space-around flex-wrap">
      <time-card time="4:57" class="pa-5 ma-5" />
      <team-card v-for="team in teams" :key="team.name" :team="team"/>
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
      time: '4:57',
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
    };
  },
};
</script>
