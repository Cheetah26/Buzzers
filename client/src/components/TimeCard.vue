<template>
  <v-card min-width="200" wrap class="d-flex flex-column justify-space-around">
      <v-card-title class="text-h1">
        {{ time }}
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
  props: {
    startTime: Number,
    countdown: Boolean,
  },
  computed: {
    time() {
      return this.startTime;
    },
  },
};
</script>
