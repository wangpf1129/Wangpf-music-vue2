export const singer = state => state.singer;
export const songSheet = state => state.songSheet;
export const rankSheet = state => state.rankSheet;

export const playing = state => state.playing;
export const fullscreen = state => state.fullscreen;
export const playList = state => state.playList;
export const sequenceList = state => state.sequenceList;
export const mode = state => state.mode;
export const currentIndex = state => state.currentIndex;
export const currentSong = state => state.playList[state.currentIndex] || {};