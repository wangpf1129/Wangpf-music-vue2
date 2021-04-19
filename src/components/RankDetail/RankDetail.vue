<template>
  <transition name="slide" appear>
    <music-list :title="title" :songs-list="rankSongList" :bg-url="bgUrl"></music-list>
  </transition>
</template>

<script>
import {mapGetters} from 'vuex';
import MusicList from '@/components/MusicList/MusicList';

export default {
  name: 'RankDetail',
  components: {MusicList},
  data() {
    return {
      rankSongList: []
    };
  },
  computed: {
    title() {
      return this.rankSheet().label;
    },
    bgUrl() {
      return this.rankSheet().picUrl;
    }
  },
  methods: {
    ...mapGetters(['rankSheet']),
    async fetchRankSongList() {
      const res = await this.$http.get('/top', {params: {id: this.rankSheet().topId}});
      this.rankSongList = res.data.data.list.map(item => ({
        id: item.songId,
        albumID: item.album.pmid,
        songPlayID: item.mid,
        name: item.name,
        singerName: item.singer[0].name,
        songAlbum: item.album.name
      }));
      // console.log(res.data.data.list);
    },
  },
  created() {
    this.fetchRankSongList();
  }
};
</script>

<style lang="scss" scoped>
.slide-enter-active, .slide-leave-active {
  transition: all .6s;
}

.slide-enter, .slide-leave-to {
  transform: translate3d(100%, 0, 0);
}
</style>