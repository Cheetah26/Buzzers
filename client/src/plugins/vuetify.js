import Vue from 'vue';
import Vuetify from 'vuetify/lib/framework';

Vue.use(Vuetify);

export default new Vuetify({
  theme: {
    themes: {
      light: {
        primary: '#42CAFD',
        secondary: '#85FFC7',
        accent: '#FF5D73',
        error: '#FF5252',
        info: '#BEA7E5',
        success: '#0F7173',
        warning: '#FFC107',
      },
    },
  },
});
