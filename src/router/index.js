import Vue from 'vue';
import Router from 'vue-router';

import Home from '../components/Home.vue';

Vue.use(Router);

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/1',
      name: 'red',
      component: Home
    },
    {
      path: '/2',
      name: 'yellow',
      component: Home
    },
    {
      path: '/3',
      name: 'green',
      component: Home
    },
    {
      path: '/*',
      redirect: '/1'
    }
  ]
});
