<template>
  <div class="singers-wrapper">
    <singers-category :category="singersCategory"/>
  </div>
</template>

<script>
import SingersCategory from '@/components/Home/Singers/SingersCategory';

export default {
  name: 'Singers',
  components: {SingersCategory},
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