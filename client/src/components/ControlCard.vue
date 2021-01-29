<template>
  <v-card min-width="200" wrap class="d-flex flex-column justify-space-around">
    <v-card-title class="justify-center text-h1">
      {{ displayTime }}
    </v-card-title>
    <v-card-actions class="flex-column justify-space-around">
      <div>
        <v-btn
          min-width="100"
          min-height="50"
          color="green white--text"
          class="mr-2"
          @click="startClock()"
        >
          Start Clock
        </v-btn>
        <v-btn
          min-width="100"
          min-height="50"
          color="red white--text"
          @click="stopClock()"
        >
          Stop Clock
        </v-btn>
      </div>
      <div class="d-flex justify-center">
        <v-col cols="6">
          <v-text-field
            v-model="newTime"
            label="Time"
            hint="In Seconds or MM:SS"
            type="text"
          ></v-text-field>
        </v-col>
        <div class="d-flex flex-column justify-center ml-4">
          <v-btn color="green white--text" @click="setClock()">Set</v-btn>
        </div>
      </div>
      <div class="d-flex justify-center">
        <v-btn
          min-width="100"
          min-height="50"
          color="red white--text"
          @click="clearBuzzers()"
        >
          Clear Buzzers
        </v-btn>
      </div>
    </v-card-actions>
  </v-card>
</template>

<script>
export default {
  name: 'ControlCard',
  data() {
    return {
      newTime: '',
    };
  },
  computed: {
    time() {
      return this.$store.getters.getTime;
    },
    displayTime() {
      const mins = Math.floor((this.time % 3600) / 60);
      const secs = Math.floor(this.time % 60);

      return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
    },
  },
  methods: {
    startClock() {
      this.sendMessage('startClock', this.time);
    },
    stopClock() {
      this.sendMessage('stopClock', this.time);
    },
    setClock() {
      if (this.newTime != null) {
        this.sendMessage('setClock', this.newTime);
      }
    },
    clearBuzzers() {
      console.log('clearing');
    },
  },
};
</script>
