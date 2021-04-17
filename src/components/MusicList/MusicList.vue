<template>
  <div class="music-list-wrapper">
    <div class="bg-image" :style="bgStyle">
      <div class="music-title">
        <span class="icon-back">back</span>
        <span class="title">{{ title }}</span>
      </div>
      <div class="filter">随机播放</div>
    </div>
    <songs-list :songs-list="songsList"></songs-list>
  </div>
</template>

<script>
import SongsList from '@/components/SongsList/SongsList';

export default {
  name: 'MusicList',
  components: {SongsList},
  props: {
    title: {
      type: String,
      default: ''
    },
    bgUrl: {
      type: String,
      default: ''
    },
    songsList: {
      type: Array,
      default: null
    }
  },
  computed: {
    bgStyle() {
      return `background-image:url(${this.bgUrl})`;
    }
  },
};
</script>

<style lang="scss" scoped>
.music-list-wrapper {
  position: absolute;
  z-index: 100;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  background-color: #fafafa;
  
  .bg-image {
    position: relative;
    width: 100%;
    height: 0;
    padding-top: 70%;
    transform-origin: top;
    background-size: cover;
    color: #fff;
    
    
    > .music-title {
      margin-top: 10px;
      
      .icon-back {
        position: absolute;
        top: 2px;
        left: 8px;
        font-size: 16px;
        display: block;
      }
      
      .title {
        position: absolute;
        top: 0;
        left: 10%;
        width: 80%;
        font-size: 18px;
        text-align: center;
        margin-top: 0;
        font-weight: 700;
      }
    }
    
    > .filter {
      position: absolute;
      top: 80%;
      left: 50%;
      transform: translate(-50%, -50%);
      font-size: 16px;
    }
  }
}
</style>