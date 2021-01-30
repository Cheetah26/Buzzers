<template>
  <v-app>
    <error-overlay />
    <v-app-bar app color="primary" dark>
      <v-btn text to="/">Home</v-btn>
      <v-spacer></v-spacer>
      <span class="" v-if="self">
        {{ self.name }} {{ self.team }}
      </span>
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
  computed: {
    self() {
      return this.$store.getters.getSelf;
    },
  },
};
</script>
