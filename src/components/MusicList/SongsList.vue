<template>
  <div class="songs-list">
    <ul v-if="songsList.length > 0">
      <li class="song-item"
          v-for="(song,index) of songsList"
          :key="song.id"
          @click="selectSong(song,index)"
      >
        <span class="song_name">{{ song.name }}</span>
        <span class="song_dec">{{ song.singerName }} - {{ song.songAlbum }}</span>
      </li>
    </ul>
    <loading v-else></loading>
  </div>
</template>

<script>
import Loading from '@/common/Loading';

export default {
  name: 'SongsList',
  components: {Loading},
  props: {
    songsList: {
      type: Array,
      default: () => []
    }
  },
  methods: {
    selectSong(song, index) {
      this.$emit('select-song', song, index);
    }
  }
};
</script>

<style lang="scss" scoped>
.songs-list {
  margin: 0 20px;
  
  > ul {
    display: flex;
    flex-direction: column;
    justify-content: center;
    
    .song-item {
      display: flex;
      flex-direction: column;
      padding: 10px;
      
      .song_name {
        font-size: 16px;
        font-weight: 700;
        margin-bottom: 2px;
        color: #1a73e8;
      }
      
      .song_dec {
        font-size: 14px;
        color: #aaa;
        overflow: hidden; /*超出隐藏*/
        white-space: nowrap; /*强制在同一行显示*/
        text-overflow: ellipsis; /*省略号*/
      }
    }
  }
}
</style>