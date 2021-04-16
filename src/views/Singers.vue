<template>
  <div class="singers-wrapper">
    <singers-category :category="singersCategory"/>
    <singers-list/>
  </div>
</template>

<script>
import SingersCategory from '@/components/Home/Singers/SingersCategory';
import SingersList from '@/components/Home/Singers/SingersList';

export default {
  name: 'Singers',
  components: {SingersCategory, SingersList},
  data() {
    return {
      singersCategory: {}
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
    }
  },
  created() {
    this.fetchSingersCategory();
  }
};
</script>

<style scoped lang="scss">

</style>