<template>
  <v-app>
    <error-overlay />
    <v-app-bar app color="primary" dark>
      <v-btn text to="/">Home</v-btn>
      <v-btn text to="/player/123">Player</v-btn>
      <v-btn text to="/host/123">Host</v-btn>
    </v-app-bar>

    <v-main>
      <router-view />
    </v-main>
  </v-app>
</template>

<script>
import ErrorOverlay from './components/ErrorOverlay.vue';

export default {
  components: { ErrorOverlay },
  name: 'App',
};
</script>
