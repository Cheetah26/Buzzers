<template>
  <v-app>
    <v-app-bar app color="primary" dark>
      <v-btn text to="/player/123">Player</v-btn>
      <v-btn text to="/host/123">Host</v-btn>
    </v-app-bar>

    <v-main>
      <router-view />
    </v-main>
  </v-app>
</template>

<script>
export default {
  name: 'App',
};
</script>
