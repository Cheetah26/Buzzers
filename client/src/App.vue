<template>
  <v-app>
    <v-app-bar app color="primary" dark>
      <v-btn text to="/">Player</v-btn>
      <v-btn text to="/host">Host</v-btn>
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
