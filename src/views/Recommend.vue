<template>
  <div class="recommended-wrapper">
    <scroll :top="98" :list="recommendedSong" ref="scroll">
      <div class="scroll-wrapper">
        <my-swiper :swiper-list="swiperList" @img-load="scrollRefresh"/>
        <song-sheet-list :recommended-song="recommendedSong"/>
      </div>
    </scroll>
  </div>
</template>

<script>
import MySwiper from '@/components/Recommend/MySwiper';
import SongSheetList from '@/components/Recommend/SongSheetList';
import Scroll from '@/common/Scroll';

export default {
  name: 'Recommend',
  components: {Scroll, SongSheetList, MySwiper},
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
    scrollRefresh() {
      this.$refs.scroll.refresh();
    }
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