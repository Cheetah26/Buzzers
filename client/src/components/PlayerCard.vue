<template>
  <v-card :color="bk_color">
    <v-card-text class="text-center text-h5">
      <v-icon v-if="captain">mdi-star</v-icon>
      <span :class="fg_color">
        {{ name }}
      </span>
    </v-card-text>
  </v-card>
</template>

<script>
export default {
  name: 'PlayerCard',
  props: {
    name: String,
    buzzed: Boolean,
    captain: Boolean,
  },
  computed: {
    bk_color() {
      return this.buzzed ? 'red' : 'white';
    },
    fg_color() {
      return this.buzzed ? 'white--text' : 'black--text';
    },
  },
};
</script>
