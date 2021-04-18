import Vue from 'vue';

import { Carousel ,Spin} from 'ant-design-vue';

import App from './App.vue';
import router from './router';
import store from './store';
import 'normalize.css';
import './assets/style/reset.scss';

// antd
Vue.component(Carousel.name, Carousel);
Vue.component(Spin.name, Spin);

Vue.config.productionTip = false;

// axios
import http from '@/network/http';
Vue.prototype.$http = http;

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app');
