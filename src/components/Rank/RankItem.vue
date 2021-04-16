<template>
  <div class="rank-item-wrapper">
    <div class="rank-item" v-for="rank of rankList" :key="rank.topId">
      <img class="rank-img" :src="rank.picUrl" alt="">
      <ul>
        <li v-for="(song,index) of rank.song" :key="index">
          {{ song.rank }}. {{ song.title }}
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
export default {
  name: 'RankItem',
  props: {
    rankList: {
      type: Array,
      required: true
    }
  }
};

</script>

<style lang="scss" scoped>
.rank-item-wrapper {
  display: inline-block;
  margin-bottom: 20px;
  
  .rank-item {
    display: flex;
    box-shadow: 2px 2px 3px rgba(0, 0, 0, .08);
    margin: 24px;
    
    > .rank-img {
      width: 100px;
      border-radius: 10px;
    }
    
    > ul {
      display: flex;
      flex-direction: column;
      justify-content: space-around;
      
      > li {
        margin-left: 8px;
        font-size: 14px;
        font-weight: 700;
        max-width: 200px;
        overflow: hidden; /*超出隐藏*/
        white-space: nowrap; /*强制在同一行显示*/
        text-overflow: ellipsis; /*省略号*/
      }
    }
  }
}

</style>