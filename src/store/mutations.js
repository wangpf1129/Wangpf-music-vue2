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
  },
  [types.SET_PLAYING_STATE](state, flag) {
    state.playing = flag;
  },
  [types.SET_FULL_SCREEN](state, flag) {
    state.fullscreen = flag;
  },
  [types.SET_PLAY_LIST](state, list) {
    state.playList = list;
  },
  [types.SET_SEQUENCE_LIST](state, list) {
    state.sequenceList = list;
  },
  [types.SET_PLAY_MODE](state, mode) {
    state.mode = mode;
  },
  [types.SET_CURRENT_INDEX](state, index) {
    state.currentIndex = index;
  }
};

export default mutations;