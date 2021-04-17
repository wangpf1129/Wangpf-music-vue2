<template>
  <div class="rank-wrapper">
    <scroll :list="rankList" :top="100">
      <div class="scroll-wrapper">
        <rank-item :rank-list="rankList" @select-rank-sheet="selectRankSheet"/>
      </div>
    </scroll>
    <router-view></router-view>
  </div>
</template>

<script>
import RankItem from '@/components/Rank/RankItem';
import Scroll from '@/common/Scroll';

export default {
  name: 'Rank',
  components: {Scroll, RankItem},
  data() {
    return {
      rankList: []
    };
  },
  methods: {
    async fetchSongsRank() {
      const res = await this.$http.get('/top/category', {params: {showDetail: 1}});
      this.rankList = res.data.data.reduce((newValue, item) => newValue.concat(item.list), []);
    },
    selectRankSheet(rank) {
      console.log(rank);
    },
    
  },
  created() {
    this.fetchSongsRank();
  }
};
</script>

<style scoped lang="scss">
.rank-wrapper {

}
</style>