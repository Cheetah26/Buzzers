<template>
  <v-card min-width="200" wrap class="d-flex flex-column justify-space-around">
    <v-card-title class="text-h1">
      {{ displayTime }}
    </v-card-title>
    <v-card-actions class="justify-center">
      <v-btn
        width="100"
        height="50"
        color="red white--text"
        @click="sendBuzz()"
      >
        Buzz
      </v-btn>
    </v-card-actions>
  </v-card>
</template>

<script>
export default {
  name: 'TimeCard',
  computed: {
    time() {
      return this.$store.getters.getTime;
    },
    displayTime() {
      /**
       * TODO
       * If time is undefined (for some reason), display 0:00
       */
      const mins = Math.floor((this.time % 3600) / 60);
      const secs = Math.floor(this.time % 60);
      return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
    },
  },
  methods: {
    // TODO
    // Add functionality to sendBuzz()
    sendBuzz() {
      console.log(this.name);
    },
  },
};
</script>
