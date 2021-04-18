<template>
  <div class="player-wrapper" v-if="playList.length > 0">
    <div class="normal-player" v-if="fullscreen">
      <div class="background">
        <img :src="albumImgUrl" alt="">
      </div>
      <div class="top">
        <div class="back" @click="back">
          <a-icon type="arrow-left"/>
        </div>
        <div class="title">
          <span class="songName">{{ currentSong.name }}</span>
          <span class="singerName">{{ currentSong.singerName }}</span>
          <span>{{ currentSong.albumID }}</span>
        </div>
      </div>
      <div class="middle">
        <div class="middle-l">
          <div class="cd-wrapper">
            <div class="cd">
              <img class="image" :src="albumImgUrl" alt="">
            </div>
          </div>
        </div>
      </div>
      <div class="bottom">
        <div class="operators">
          <span class="icon-list">
            <a-icon type="rollback"/>
          </span>
          <span class="icon-prev">
            <a-icon type="backward" theme="filled"/>
          </span>
          <span class="icon-play">
            <a-icon type="play-circle"/>
          </span>
          <span class="icon-next">
            <a-icon type="forward" theme="filled"/>
          </span>
          <span class="icon-favorite">
            <a-icon type="heart"/>
          </span>
        </div>
      </div>
    </div>
    <div class="mini-player" @click="open" v-if="!fullscreen">
      <div class="icon-img">
        <img :src="albumImgUrl" alt="">
      </div>
      <div class="title">
        <span class="songName">{{ currentSong.name }}</span>
        <span class="singerName">{{ currentSong.singerName }}</span>
      </div>
      <div class="control"></div>
      <div class="control">
        <a-icon type="pic-center"/>
      </div>
    </div>
  </div>
</template>

<script>
import {mapGetters, mapMutations} from 'vuex';

export default {
  name: 'Player',
  computed: {
    ...mapGetters(['playList', 'fullscreen', 'currentSong']),
    albumImgUrl() {
      return `https://y.gtimg.cn/music/photo_new/T002R300x300M000${this.currentSong.albumID}.jpg`;
    }
  },
  methods: {
    back() {
      this.setFullscreen(false);
    },
    open() {
      this.setFullscreen(true);
    },
    ...mapMutations({
      setFullscreen: 'SET_FULL_SCREEN'
    })
  },
};
</script>

<style lang="scss" scoped>
.player-wrapper {
  display: flex;
  
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
      
      .back {
        z-index: 2;
        padding-left: 10px;
        font-size: 20px;
        color: #1a73e8;
      }
      
      .title {
        text-align: center;
        margin-left: -28px;
        margin-top: 10px;
        flex: 1;
        display: flex;
        flex-direction: column;
        
        > .songName {
          font-size: 20px;
        }
        
        > .singerName {
          font-size: 16px;
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
      }
    }
    
    > .title {
      flex: 1;
      display: flex;
      flex-direction: column;
      padding-left: 4px;
      
      .songName {
        font-size: 16px;
        font-weight: 700;
      }
      
      .singerName {
        font-size: 14px;
      }
    }
    
    > .control {
      font-size: 24px;
      padding-right: 20px;
    }
    
    
  }
}
</style>