<template>
  <v-overlay :value="isError">
    <v-card>
      <v-card-title primary-title>
        <v-icon class="pr-2">mdi-alert-circle</v-icon>
        Error
      </v-card-title>
      <v-card-text>
        {{errorData.message}}
      </v-card-text>
      <v-card-actions class="justify-center">
        <v-btn color="red" @click="dismissError()">Close</v-btn>
      </v-card-actions>
    </v-card>
  </v-overlay>
</template>

<script>
export default {
  computed: {
    isError() {
      return this.$store.getters.getError.error;
    },
    errorData() {
      return this.$store.getters.getError.data;
    },
  },
  methods: {
    dismissError() {
      this.$store.commit('clearError');
      switch (this.errorData.type) {
        default:
          this.$router.push('/');
      }
    },
  },
};
</script>
