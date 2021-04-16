<template>
  <div class="singers-wrapper">
    <scroll :list="singersList" :top="100" ref="scroll">
      <div class="scroll-wrapper">
        <singers-category :category="singersCategory"/>
        <singers-list :list="singersList"/>
      </div>
    </scroll>
  </div>
</template>

<script>
import SingersCategory from '@/components/Home/Singers/SingersCategory';
import SingersList from '@/components/Home/Singers/SingersList';
import Scroll from '@/common/Scroll';


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
    async fetchSingersList() {
      const res = await this.$http.get('/singer/list');
      this.singersList = res.data.data.list;
    },
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