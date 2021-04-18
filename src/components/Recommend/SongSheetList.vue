<template>
  <div class="song-sheet-list-Wrapper">
    <h2 class="recommend-title">推荐歌单</h2>
    <ul class="song-sheet">
      <li
        class="song-sheet-item"
        v-for="item of  recommendedSong"
        :key="item.id"
        @click="selectSongSheet(item)"
      >
        <img :src="item.imgUrl" alt="">
        <div class="song-sheet-info">
          <span class="title">{{ item.title }}</span>
          <span class="info">{{ item.info }}</span>
        </div>
      </li>
    </ul>
  </div>
</template>

<script>

export default {
  name: 'SongSheetList',
  props: {
    recommendedSong: {
      type: Array,
      required: true
    }
  },
  methods: {
    selectSongSheet(songSheet) {
      this.$emit('select-song-sheet', songSheet);
    }
  }
};
</script>

<style lang="scss" scoped>
.song-sheet-list-Wrapper {
  .recommend-title {
    color: #1a73e8;
    padding: 10px 10px 0 10px;
    margin: 0;
    font-size: 18px;
  }
  
  .song-sheet {
    display: flex;
    flex-direction: column;
    padding: 10px 6px;
    
    
    .song-sheet-item {
      padding: 10px;
      display: flex;
      
      img {
        width: 60px;
        border-radius: 6px;
      }
      
      .song-sheet-info {
        display: flex;
        flex-direction: column;
        margin-left: 14px;
        
        .title {
          font-size: 16px;
          font-weight: 700;
          padding-bottom: 6px;
        }
        
        .info {
          font-size: 14px;
          color: #afafaf;
          padding-top: 4px;
          overflow: hidden; /*超出隐藏*/
          white-space: nowrap; /*强制在同一行显示*/
          text-overflow: ellipsis; /*省略号*/
        }
      }
    }
  }
}
</style>