import * as types from './mutation-types';

const mutations = {
  [types.SET_SINGER](state, singer) {
    state.singer = singer;
  },
  [types.SET_SONG_SHEET](state, songSheet) {
    state.songSheet = songSheet;
  },
  [types.SET_RANK_SHEET](state, rankSheet) {
    state.rankSheet = rankSheet;
  }
};

export default mutations;