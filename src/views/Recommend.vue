<template>
  <div class="recommended-wrapper">
    <scroll :top="98" :list="recommendedSong" ref="scroll">
      <div class="scroll-wrapper">
        <my-swiper :swiper-list="swiperList" @img-load="scrollRefresh"/>
        <song-sheet-list :recommended-song="recommendedSong" @select-song-sheet="selectSongSheet"/>
        <loading v-show="recommendedSong.length === 0"></loading>
      </div>
    </scroll>
    <router-view></router-view>
  </div>
</template>

<script>
import MySwiper from '@/components/Recommend/MySwiper';
import SongSheetList from '@/components/Recommend/SongSheetList';
import Scroll from '@/common/Scroll';
import Loading from '@/common/Loading';
import {mapMutations} from 'vuex';

export default {
  name: 'Recommend',
  components: {Scroll, SongSheetList, MySwiper,Loading},
  data() {
    return {
      swiperList: [],
      recommendedSong: [],
    };
  },
  methods: {
    async fetchSwiperList() {
      const res = await this.$http.get('/Recommend/banner');
      this.swiperList = res.data.data.map(item => ({id: item.id, imgUrl: item.picUrl}));
    },
    async fetchRecommendSong() {
      const res = await this.$http.get('/Recommend/playlist/u');
      this.recommendedSong = res.data.data.list.map(item => ({
        id: item.content_id,
        imgUrl: item.cover,
        info: item.title,
        title: item.username
      }));
    },
    selectSongSheet(songSheet) {
      this.$router.push({
        path: `/recommend/${songSheet.id}`
      });
      this.setSongSheet(songSheet);
    },
    scrollRefresh() {
      this.$refs.scroll.refresh();
    },
    ...mapMutations({setSongSheet: 'SET_SONG_SHEET'})
  },
  created() {
    this.fetchSwiperList();
    this.fetchRecommendSong();
  }
};
</script>

<style scoped lang="scss">
.recommended-wrapper {

}
</style>