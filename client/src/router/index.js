import Vue from 'vue';
import VueRouter from 'vue-router';
import Player from '../views/Player.vue';
import Host from '../views/Host.vue';

Vue.use(VueRouter);

const routes = [
  {
    path: '/player/:room',
    name: 'Player',
    component: Player,
  },
  {
    path: '/host/:room',
    name: 'Host',
    component: Host,
  },
];

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
});

export default router;
