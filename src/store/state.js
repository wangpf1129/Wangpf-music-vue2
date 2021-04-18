import {playMode} from '@/common/JS/config';

const state = {
  singer: {},
  songSheet: {},
  rankSheet: {},
  playing: false, // 是否播放
  fullscreen: false, // 是否全屏播放
  playList: [],  // 播放列表
  sequenceList: [], // 顺序列表
  mode: playMode.sequence,  // 播放模式
  currentIndex:-1, // 当前播放歌曲的索引
};

export default state;