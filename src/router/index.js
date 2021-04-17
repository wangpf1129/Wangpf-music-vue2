import Vue from 'vue';
import VueRouter from 'vue-router';

Vue.use(VueRouter);

import Home from '@/views/Home.vue';
import Recommend from '@/views/Recommend';
import Rank from '@/views/Rank';
import Singers from '@/views/Singers';
import Search from '@/views/Search';
import SingerDetail from '@/components/SingerDetail/SingerDetail';
import SongSheetDetail from '@/components/SongSheetDetail/SongSheetDetail';
import RankDetail from '@/components/RankDetail/RankDetail';

const originalPush = VueRouter.prototype.push;
VueRouter.prototype.push = function push(location) {
  return originalPush.call(this, location).catch(err => err);
};
const routes = [
  {path: '/', redirect: '/recommend'},
  {
    path: '/',
    component: Home,
    children: [
      {path: 'recommend', component: Recommend,children: [{path: ':id', component: SongSheetDetail}]},
      {path: 'rank', component: Rank,children: [{path: ':id', component: RankDetail}]},
      {path: 'singers', component: Singers, children: [{path: ':id', component: SingerDetail}]},
      {path: 'search', component: Search},
    ]
  },
];

const router = new VueRouter({
  routes
});

export default router;
