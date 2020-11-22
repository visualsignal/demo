import Vue from 'vue';
import VueRouter, { RouteConfig } from 'vue-router';
import Home from '../views/Home.vue';
import Room from '../views/Room.vue';
import store from '../store';

Vue.use(VueRouter);

const routes: Array<RouteConfig> = [
  {
    path: '/',
    name: 'home',
    component: Home,
  },
  {
    path: '/room/:id',
    name: 'room',
    component: Room,
    meta: {
      requiresAuth: true,
    },
  },
];

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
});

router.beforeResolve(async (to, from, next) => {
  if (to.name === 'room' && !store.state.token) {
    return next({
      name: 'home',
    });
  }
  return next();
});

export default router;
