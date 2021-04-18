<template>
  <transition name="slide-fade">
    <music-list :title="title" :songs-list="songsList" :bg-url="bgUrl"></music-list>
  </transition>
</template>

<script>
import {mapGetters} from 'vuex';
import MusicList from '@/components/MusicList/MusicList';

export default {
  name: 'SingerDetail',
  components: {MusicList},
  data() {
    return {
      songsList: []
    };
  },
  computed: {
    title() {
      return this.singer().singer_name;
    },
    bgUrl() {
      return this.singer().singer_pic;
    }
  },
  methods: {
    ...mapGetters(['singer']),
    async fetchSingerSongs() {
      const res = await this.$http.get('/singer/songs', {params: {singermid: this.singer().singer_mid,}});
      this.songsList = res.data.data.list.map(item => ({
        id: item.id,
        albumID:item.album.pmid,
        name: item.name,
        singerName: item.singer[0].name,
        songAlbum: item.album.name
      }));
    }
  },
  created() {
    this.fetchSingerSongs();
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