<template>
  <div>
    <div class="d-flex justify-space-around flex-wrap">
      <control-card time="8:00" class="pa-5 ma-5" />
      <team-card v-for="team in teams" :key="team.name" :team="team"/>
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
