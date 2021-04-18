<template>
  <div class="music-list-wrapper">
    <div class="bg-image">
      <div class="music-title">
        <span class="icon-back" @click="back">
          <a-icon type="arrow-left"/>
        </span>
        <span class="title">{{ title }}</span>
      </div>
      <img :src="bgUrl" alt="">
    </div>
    <scroll :list="songsList" ref="scroll" :top="230">
      <songs-list :songs-list="songsList"></songs-list>
    </scroll>
  </div>
</template>

<script>
import SongsList from '@/components/MusicList/SongsList';
import Scroll from '@/common/Scroll';

export default {
  name: 'MusicList',
  components: {Scroll, SongsList},
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
  methods: {
    back() {
      this.$router.back();
    }
  }
  
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
    width: 100vw;
    color: #1a73e8;
    text-align: center;
    object-fit: cover;
  
    > img {
      width: 48%;
      border-radius: 10%;
      box-shadow: 6px 9px 17px rgba(0, 0, 0, .17);
    }
    
    > .music-title {
      padding-top: 30px;
      width: 100%;
      height: 100%;
      margin-top: 10px;
      
      .icon-back {
        position: absolute;
        top: -4px;
        left: 8px;
        font-size: 22px;
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
    
    
  }
}
</style>