import Vue from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';
import vuetify from './plugins/vuetify';

Vue.config.productionTip = false;

Vue.mixin({
  methods: {
    sendMessage: (control, data) => {
      Vue.prototype.$socket.send(JSON.stringify({ control, data }));
    },
  },
});

new Vue({
  router,
  store,
  vuetify,
  render(h) { return h(App); },
}).$mount('#app');
