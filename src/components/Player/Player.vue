<template>
  <div class="player-wrapper" v-if="playList.length > 0">
    <transition name="normal"
                appear
                @enter="enter"
                @after-enter="afterEnter"
                @leave="leave"
                @after-leave="afterLeave"
    >
      <div class="normal-player" v-show="fullscreen">
        <div class="background">
          <img :src="albumImgUrl" alt="">
        </div>
        <div class="top">
          <div class="back" @click="back">
            <a-icon type="arrow-down"/>
          </div>
          <div class="title">
            <span class="songName">{{ currentSong.name }}</span>
            <span class="singerName">{{ currentSong.singerName }}</span>
          </div>
        </div>
        <div class="middle">
          <div class="middle-l">
            <div class="cd-wrapper" ref="cdWrapper">
              <div class="cd" :class="cdClass">
                <img class="image" :src="albumImgUrl" alt="">
              </div>
            </div>
          </div>
        </div>
        <div class="bottom">
          <div class="progress-bar">
            <span>{{ formatTime(currentTime) }}</span>
            <div class="progress-bar-wrapper">
              <progress-bar :percent="percent" @percentChange="onProgressBarChange"></progress-bar>
            </div>
            <span>{{ formatTime(currentSong.duration) }}</span>
          </div>
          <div class="operators">
          <span class="icon-list" @click="changeMode">
            <my-icon :type="iconMode"/>
          </span>
            <span class="icon-prev" @click="prev">
             <my-icon type="icon-prev"/>
          </span>
            <span class="icon-play" @click="togglePlaying">
            <my-icon :type="playIcon"/>
          </span>
            <span class="icon-next" @click="next">
             <my-icon type="icon-next"/>
          </span>
            <span class="icon-favorite">
            <my-icon type="icon-heart"/>
          </span>
          </div>
        </div>
      </div>
    </transition>
    <transition name="mini">
      <div class="mini-player" @click="open" v-show="!fullscreen">
        <div class="icon-img">
          <img :class="cdClass" :src="albumImgUrl" alt="">
        </div>
        <div class="title">
          <span class="songName">{{ currentSong.name }}</span>
          <span class="singerName">{{ currentSong.singerName }}</span>
        </div>
        <div class="control">
          <progress-circle :radius="32" :percent="percent">
            <span :class="['icon-play','icon-mini']" @click.stop="togglePlaying">
              <my-icon :type="playIcon"/>
          </span>
          </progress-circle>
        </div>
        <div class="control">
          <my-icon type="icon-list"/>
        </div>
      </div>
    </transition>
    <audio ref="audio" :src="playUrl"
           @canplay="ready"
           @error="error"
           @timeupdate="updateTime"
           @ended="end"
    ></audio>
  </div>
</template>

<script>
import {mapGetters, mapMutations} from 'vuex';
import animations from 'create-keyframe-animation';
import {prefixStyle} from '@/common/JS/dom';
import ProgressBar from '@/common/ProgressBar/ProgressBar';
import ProgressCircle from '@/common/ProgressCircle/ProgressCircle';
import {Icon} from 'ant-design-vue';
import {playMode} from '@/common/JS/config';
import {shuffle} from '@/common/JS/util';

const MyIcon = Icon.createFromIconfontCN({
  scriptUrl: '//at.alicdn.com/t/font_2515644_3ako6wjxbn.js', // 在 iconfont.cn 上生成
  extraCommonProps: {
    class: 'my-icon'
  }
});

const transform = prefixStyle('transform');
export default {
  name: 'Player',
  components: {ProgressCircle, ProgressBar, MyIcon},
  data() {
    return {
      playUrl: '',
      songReady: false,  // 控制歌曲切换速度
      currentTime: 0,
      percent: 0
    };
  },
  computed: {
    ...mapGetters(['playList', 'fullscreen', 'currentSong', 'playing', 'currentIndex', 'mode',
      'sequenceList']),
    albumImgUrl() {
      return `https://y.gtimg.cn/music/photo_new/T002R300x300M000${this.currentSong.albumID}.jpg`;
    },
    playIcon() {
      return this.playing ? 'icon-pause' : 'icon-play';
    },
    cdClass() {
      return this.playing ? 'play-fade' : 'play-fade pause-fade';
    },
    iconMode() {
      return this.mode === playMode.sequence ? 'icon-sequence' :
        this.mode === playMode.loop ? 'icon-loop' : 'icon-random';
    }
  },
  methods: {
    back() {
      this.setFullscreen(false);
    },
    open() {
      this.setFullscreen(true);
    },
    changeMode() {
      const mode = (this.mode + 1) % 3;
      this.setPlayMode(mode);
      let list = null;
      if (mode === this.mode.random) {
        list = shuffle(this.sequenceList);
      } else {
        list = this.sequenceList;
      }
      this.resetCurrentIndex(list);
      this.setPlayList(list);
    },
    end() {
      if (this.mode === playMode.loop) {
        this.loop();
      } else {
        this.next();
      }
    },
    loop() {
      this.$refs.audio.currentTime = 0;
      this.$refs.audio.play();
    },
    prev() {
      if (!this.songReady) {
        return;
      }
      let index = this.currentIndex - 1;
      if (index === -1) {
        index = this.playList.length;
      }
      this.setCurrentIndex(index);
      if (!this.playing) {  // 如果暂停了就改变状态
        this.togglePlaying();
      }
      this.songReady = false;
    },
    next() {
      if (!this.songReady) {
        return;
      }
      let index = this.currentIndex + 1;
      if (index === this.playList.length - 1) {
        index = 0;
      }
      this.setCurrentIndex(index);
      if (!this.playing) {
        this.togglePlaying();
      }
      this.songReady = false;
      
    },
    onProgressBarChange(percent) {
      this.$refs.audio.currentTime = percent * this.currentSong.duration;
      if (!this.playing) {
        this.togglePlaying();
      }
    },
    togglePlaying() {
      if (!this.songReady) {
        return;
      }
      this.setPlayingState(!this.playing);
    },
    ready() {
      this.songReady = true;
    },
    error() {
      this.songReady = true;
    },
    updateTime(e) {
      this.currentTime = e.target.currentTime;
    },
    formatTime(initial) {
      initial = initial | 0;
      const minute = initial / 60 | 0;
      const second = initial % 60;
      return `${minute}:${this._pad(second)}`;
    },
    _pad(num, n = 2) {
      let len = num.toString().length;
      while (len < n) {
        num = '0' + num;
        len++;
      }
      return num;
    },
    resetCurrentIndex(list) {
      let index = list.findIndex((item) => {
        return item.id === this.currentSong.id;
      });
      this.setCurrentIndex(index);
    },
    enter(el, done) {
      const {x, y, scale} = this._getPosAndScale();
      let animation = {
        0: {
          transform: `translate3d(${x}px,${y}px,0) scale(${scale})`
        },
        60: {
          transform: `translate3d(0,0,0) scale(1.1)`
        },
        100: {
          transform: `translate3d(0,0,0) scale(1)`
        },
      };
      animations.registerAnimation({
        name: 'move',
        animation,
        presets: {
          duration: 400,
          easing: 'linear'
        }
      });
      animations.runAnimation(this.$refs.cdWrapper, 'move', done);
    },
    afterEnter() {
      animations.unregisterAnimation('move');
      this.$refs.cdWrapper.style.animation = '';
    },
    leave(el, done) {
      this.$refs.cdWrapper.style.transition = 'all 0.4s';
      const {x, y, scale} = this._getPosAndScale();
      this.$refs.cdWrapper.style[transform] = `translate3d(${x}px,${y}px,0) scale(${scale})`;
      this.$refs.cdWrapper.addEventListener('transitionend', done);
    },
    afterLeave() {
      this.$refs.cdWrapper.style.transition = '';
      this.$refs.cdWrapper.style[transform] = '';
    },
    _getPosAndScale() {
      const targetWidth = 40;
      const paddingLeft = 40;
      const paddingBottom = 30;
      const paddingTop = 80;
      const width = window.innerWidth * 0.8;
      const scale = targetWidth / width;
      const x = -(window.innerWidth / 2 - paddingLeft);
      const y = window.innerHeight - paddingTop - width / 2 - paddingBottom;
      return {
        x, y, scale
      };
    },
    async fetchSongUrl(id) {
      const res = await this.$http.get('/song/urls', {params: {id}});
      return res.data.data[id];
    },
    ...mapMutations({
      setFullscreen: 'SET_FULL_SCREEN',
      setPlayingState: 'SET_PLAYING_STATE',
      setCurrentIndex: 'SET_CURRENT_INDEX',
      setPlayMode: 'SET_PLAY_MODE',
      setPlayList: 'SET_PLAY_LIST',
    })
  },
  watch: {
    async currentSong(newSong, oldSong) {
      if (newSong.id === oldSong.id) {
        return;
      }
      this.playUrl = await this.fetchSongUrl(newSong.songPlayID);
    },
    playUrl() {
      this.$nextTick(() => {
        this.$refs.audio.play();
      });
    },
    playing(newPlaying) {
      const audio = this.$refs.audio;
      this.$nextTick(() => {
        newPlaying ? (audio && audio.play()) : (audio && audio.pause());
      });
    },
    currentTime(newCurrentTime) {
      this.percent = newCurrentTime / this.currentSong.duration;
    }
  }
};
</script>

<style lang="scss" scoped>
.player-wrapper {
  display: flex;
  
  .my-icon {
    font-size: 38px;
  }
  
  .normal-enter-active, .normal-leave-active {
    transition: all .4s;
    
    .top, .bottom {
      transition: all .4s cubic-bezier(0.86, 0.18, 0.82, 1.32);
    }
  }
  
  .normal-enter, .normal-leave-to {
    opacity: 0;
    
    .top {
      transform: translate3d(0, -100px, 0);
    }
    
    .bottom {
      transform: translate3d(0, 100px, 0);
    }
  }
  
  > .normal-player {
    position: fixed;
    z-index: 100;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    flex-direction: column;
    background-color: #fafafa;
    color: #000;
    flex: 1;
    font-weight: 700;
    
    .background {
      position: absolute;
      left: 0;
      top: 0;
      z-index: -1;
      width: 100vw;
      height: 100vh;
      opacity: 0.6;
      filter: blur(20px);
      
      > img {
        width: 100%;
        height: 100%;
      }
    }
    
    > .top {
      position: relative;
      display: flex;
      align-items: center;
      justify-content: center;
      
      .back {
        z-index: 2;
        padding: 0 10px;
        font-size: 20px;
        color: #1a73e8;
      }
      
      .title {
        flex: 1;
        padding: 0 24px;
        text-align: center;
        margin-left: -28px;
        margin-top: 10px;
        display: flex;
        flex-direction: column;
        overflow: hidden; /*超出隐藏*/
        white-space: nowrap; /*强制在同一行显示*/
        text-overflow: ellipsis; /*省略号*/
        
        > .songName {
          font-size: 20px;
          overflow: hidden; /*超出隐藏*/
          white-space: nowrap; /*强制在同一行显示*/
          text-overflow: ellipsis; /*省略号*/
        }
        
        > .singerName {
          font-size: 16px;
          overflow: hidden; /*超出隐藏*/
          white-space: nowrap; /*强制在同一行显示*/
          text-overflow: ellipsis; /*省略号*/
        }
      }
      
    }
    
    > .middle {
      position: fixed;
      width: 100%;
      top: 120px;
      bottom: 170px;
      white-space: nowrap;
      font-size: 0;
      
      > .middle-l {
        display: inline-block;
        vertical-align: top;
        position: relative;
        width: 100%;
        height: 0;
        padding-top: 80%;
        
        > .cd-wrapper {
          position: absolute;
          left: 10%;
          top: 0;
          width: 80%;
          height: 100%;
          
          > .cd {
            width: 100%;
            height: 100%;
            box-sizing: border-box;
            border: 10px solid rgba(255, 255, 255, 0.1);
            border-radius: 50%;
            
            &.play-fade {
              animation: rotate 20s linear infinite;
            }
            
            &.pause-fade {
              animation-play-state: paused;
            }
            
            > .image {
              position: absolute;
              left: 0;
              top: 0;
              width: 100%;
              height: 100%;
              border-radius: 50%;
            }
          }
        }
      }
    }
    
    > .bottom {
      position: absolute;
      bottom: 40px;
      width: 100%;
      
      > .operators {
        display: flex;
        justify-content: space-around;
        align-items: center;
        font-size: 28px;
      }
      
      > .progress-bar {
        display: flex;
        margin: 0 auto;
        padding: 15px;
        justify-content: center;
        align-items: center;
        
        > span {
          font-size: 16px;
          padding: 0 4px;
        }
        
        .progress-bar-wrapper {
          flex: 1;
        }
      }
    }
  }
  
  > .mini-player {
    position: fixed;
    bottom: 0;
    width: 100%;
    height: 10%;
    z-index: 100;
    background-color: #fafafa;
    border: 1px solid transparent;
    display: flex;
    align-items: center;
    justify-content: space-around;
    box-shadow: 6px 3px 11px rgba(0, 0, 0, .2);
    
    > .icon-img {
      width: 45px;
      height: 45px;
      border-radius: 50%;
      overflow: hidden;
      margin-left: 20px;
      margin-right: 10px;
      
      > img {
        width: 100%;
        height: 100%;
        
        &.play-fade {
          animation: rotate 20s linear infinite;
        }
        
        &.pause-fade {
          animation-play-state: paused;
        }
      }
    }
    
    > .title {
      flex: 1;
      display: flex;
      flex-direction: column;
      padding-left: 4px;
      overflow: hidden; /*超出隐藏*/
      white-space: nowrap; /*强制在同一行显示*/
      text-overflow: ellipsis; /*省略号*/
      .songName {
        font-size: 16px;
        font-weight: 700;
        overflow: hidden; /*超出隐藏*/
        white-space: nowrap; /*强制在同一行显示*/
        text-overflow: ellipsis; /*省略号*/
        
      }
      
      .singerName {
        font-size: 14px;
        overflow: hidden; /*超出隐藏*/
        white-space: nowrap; /*强制在同一行显示*/
        text-overflow: ellipsis; /*省略号*/
      }
    }
    
    > .control {
      font-size: 24px;
      padding-right: 20px;
      
      .icon {
        color: rgba(26, 115, 232, 0.4);
      }
      
      .icon-mini {
        font-size: 32px;
        position: absolute;
        left: -3px;
        top: -7px;
      }
    }
  }
}

@keyframes rotate {
  0% {
    transform: rotate(0);
  }
  100% {
    transform: rotate(360deg);
  }
}
</style>