<template>
  <div class="singers-wrapper">
    <scroll :list="singersList" :top="100" ref="scroll">
      <div class="scroll-wrapper">
        <singers-category :category="singersCategory" @category-click="fetchSingersList"/>
        <singers-list :list="singersList" @select-singer="selectSinger"/>
      </div>
    </scroll>
    <router-view></router-view>
  </div>
</template>

<script>
import SingersCategory from '@/components/Singers/SingersCategory';
import SingersList from '@/components/Singers/SingersList';
import Scroll from '@/common/Scroll';
import {mapMutations} from 'vuex';


export default {
  name: 'Singers',
  components: {SingersCategory, SingersList, Scroll},
  data() {
    return {
      singersCategory: {},
      singersList: []
    };
  },
  methods: {
    async fetchSingersCategory() {
      const {data: {data: category}} = await this.$http.get('/singer/category');
      this.singersCategory = {
        sex: category.sex,
        area: category.area,
        genre: category.genre
      };
    },
    async fetchSingersList(params) {
      this.singersList = [];
      const res = await this.$http.get('/singer/list', {params});
      this.singersList = res.data.data.list;
    },
    selectSinger(singer) {
      this.$router.push({
        path: `/singers/${singer.singer_mid}`
      });
      this.setSinger(singer);
    },
    ...mapMutations({setSinger: 'SET_SINGER'}),
  },
  watch: {
    singersCategory() {
      this.$nextTick(() => {
        this.$refs.scroll.refresh();
      });
    }
  },
  created() {
    this.fetchSingersCategory();
    this.fetchSingersList();
  }
};
</script>

<style scoped lang="scss">

</style>