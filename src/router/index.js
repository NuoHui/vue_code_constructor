import Vue from 'vue';
import Router from 'vue-router';

import Home from 'modules/home/index.js';

Vue.use(Router);

export const constantRouterMap = [
  {
    path: '/',
    component: {
      template: '<router-view></router-view>'
    },
    redirect: '/home',
    children: [
      {
        name: 'home',
        path: 'home',
        component: Home,
        meta: {
          title: '首页'
        }
      }
    ]
  }
];

export default new Router({
  routes: constantRouterMap,
  scrollBehavior: () => ({ y: 0 })
});
