import * as types from './mutation-types';
import {playMode} from '@/common/JS/config';
import {shuffle} from '@/common/JS/util';

function findIndex(list, song) {
  return list.findIndex(item => {
    return item.id === song.id;
  });
}

export const selectPlay = ({commit, state}, {list, index}) => {
  commit(types.SET_SEQUENCE_LIST, list);
  if (state.mode === playMode.random) {
    let randomList = shuffle(list);
    commit(types.SET_PLAY_LIST, randomList);
    index = findIndex(randomList, list[index]);
  } else {
    commit(types.SET_PLAY_LIST, list);
  }
  commit(types.SET_CURRENT_INDEX, index);
  commit(types.SET_FULL_SCREEN, true);
  commit(types.SET_PLAYING_STATE, true);
};