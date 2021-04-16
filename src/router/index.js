import Vue from 'vue';
import VueRouter from 'vue-router';

Vue.use(VueRouter);

import Home from '@/views/Home.vue';
import Recommend from '@/views/Recommend';
import Rank from '@/views/Rank';
import Singers from '@/views/Singers';
import Search from '@/views/Search';

const originalPush = VueRouter.prototype.push;
VueRouter.prototype.push = function push(location) {
  return originalPush.call(this, location).catch(err => err);
};
const routes = [
  { path: '/', redirect: '/recommend' },
  {
    path: '/',
    component: Home,
    children: [
      {path: 'recommend', component: Recommend},
      {path: 'rank', component: Rank},
      {path: 'singers', component: Singers},
      {path: 'search', component: Search},
    ]
  },
];

const router = new VueRouter({
  routes
});

export default router;