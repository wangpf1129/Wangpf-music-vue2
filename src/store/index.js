import Vue from 'vue';
import Vuex from 'vuex';
import state from '@/store/state';
import mutations from '@/store/mutations';
import * as getters from '@/store/getters';

Vue.use(Vuex);
const debug = process.env.NODE_ENV !== 'production';

export default new Vuex.Store({
  state,
  getters,
  mutations,
  strict: debug
});
