<template>
  <div>
    RankDetail
  </div>
</template>

<script>
export default {
  name: 'RankDetail',
  methods: {
    async fetchRankSongList() {
      const res = await this.$http.get('/top', {params: {id: 4}});
      console.log(res);
    }
  },
  created() {
    this.fetchRankSongList()
  }
};
</script>

<style lang="scss" scoped>

</style>