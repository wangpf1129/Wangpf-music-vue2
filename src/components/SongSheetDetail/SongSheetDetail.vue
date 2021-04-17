<template>
  <transition name="slide-fade">
    <music-list :title="title" :bg-url="bgUrl" :songs-list="songSheetSongsList"></music-list>
  </transition>
</template>

<script>
import {mapGetters} from 'vuex';
import MusicList from '@/components/MusicList/MusicList';

export default {
  name: 'SongSheetDetail',
  components: {MusicList},
  data() {
    return {
      songSheetSongsList: []
    };
  },
  computed: {
    bgUrl() {
      return this.songSheet().imgUrl;
    },
    title() {
      return this.songSheet().title;
    }
  },
  methods: {
    ...mapGetters(['songSheet']),
    async fetchSongSheetSongs() {
      const res = await this.$http.get('/songlist', {params: {id: this.songSheet().id}});
      this.songSheetSongsList = res.data.data.songlist.map(item => ({
        id: item.songmid,
        name: item.songname,
        singerName: item.singer[0].name,
        songAlbum: item.albumname
      }));
    }
  },
  created() {
    this.fetchSongSheetSongs();
  }
};
</script>

<style lang="scss" scoped>
.slide-fade-enter-active, .slide-fade-leave-active {
  transition: all .6s;
}

.slide-fade-enter, .slide-fade-leave-to {
  transform: translate3d(100%, 0, 0);
}
</style>