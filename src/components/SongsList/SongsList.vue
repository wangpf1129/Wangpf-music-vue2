<template>
  <div class="songs-list">
    <ul>
      <li class="song-item" v-for="song of songsList" :key="song.id">
        <span class="song_name">{{ song.name }}</span>
        <span class="song_dec">{{ song.singer[0].name }} - {{ song.album.name }}</span>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  name: 'SongsList',
  props: {
    songsList: {
      type: Array,
      required: true
    }
  }
};
</script>

<style lang="scss" scoped>
.songs-list{
  margin: 0 20px;
  >ul{
    display: flex;
    flex-direction: column;
    justify-content: center;
    
    .song-item{
      display: flex;
      flex-direction: column;
      padding: 10px;
      
      .song_name{
        font-size: 16px;
        font-weight: 700;
        margin-bottom: 2px;
        color: #1a73e8;
      }
      .song_dec{
        font-size: 14px;
        color: #aaa;
      }
    }
  }
}
</style>