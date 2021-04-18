<template>
  <div class="rank-wrapper">
    <scroll :list="rankList" :top="100">
      <div class="scroll-wrapper">
        <rank-item v-if="rankList.length>0" :rank-list="rankList" @select-rank-sheet="selectRankSheet"/>
        <loading v-else></loading>
      </div>
    </scroll>
    <router-view></router-view>
  </div>
</template>

<script>
import RankItem from '@/components/Rank/RankItem';
import Scroll from '@/common/Scroll';
import Loading from '@/common/Loading';
import {mapMutations} from 'vuex';

export default {
  name: 'Rank',
  components: {Scroll, RankItem, Loading},
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
      this.$router.push({
        path: `/rank/${rank.topId}`
      });
      this.setRankSheet(rank);
    },
    ...mapMutations({
      setRankSheet: 'SET_RANK_SHEET'
    })
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