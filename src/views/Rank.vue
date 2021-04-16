<template>
  <div>
    排行榜页面
  </div>
</template>

<script>
export default {
  name: 'Rank',
  data() {
    return {
      rankList: []
    };
  },
  methods: {
    async fetchSongsRank() {
      const res = await this.$http.get('/top/category', {params: {showDetail: 1}});
      this.rankList = res.data.data.reduce((newValue, item) => newValue.concat(item.list), []);
      console.log(this.rankList);
    }
  },
  created() {
    this.fetchSongsRank();
  }
};
</script>

<style scoped lang="scss">

</style>