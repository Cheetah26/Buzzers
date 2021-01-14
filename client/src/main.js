import Vue from 'vue';
import VueNativeSock from 'vue-native-websocket';
import App from './App.vue';
import router from './router';
import store from './store';
import vuetify from './plugins/vuetify';

Vue.config.productionTip = false;

Vue.use(VueNativeSock, 'ws://localhost:9090', { store, format: 'json' });

new Vue({
  router,
  store,
  vuetify,
  render(h) { return h(App); },
}).$mount('#app');