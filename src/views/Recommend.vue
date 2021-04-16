<template>
  <div class="wrapper">
    <scroll :top="98">
      <div class="scroll-warpper">
        <my-swiper :swiper-list="swiperList"/>
        <song-sheet-list :recommended-song="recommendedSong"/>
      </div>
    </scroll>
  </div>
</template>

<script>
import MySwiper from '@/components/Home/recommend/MySwiper';
import SongSheetList from '@/components/Home/recommend/SongSheetList';
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
      const res = await this.$http.get('/recommend/banner');
      this.swiperList = res.data.data.map(item => ({id: item.id, imgUrl: item.picUrl}));
    },
    async fetchRecommendSong() {
      const res = await this.$http.get('/recommend/playlist/u');
      this.recommendedSong = res.data.data.list.map(item => ({
        id: item.content_id,
        imgUrl: item.cover,
        info: item.title,
        title: item.username
      }));
    }
  },
  created() {
    this.fetchSwiperList();
    this.fetchRecommendSong();
  }
};
</script>

<style scoped lang="scss">
.wrapper {
}
</style>