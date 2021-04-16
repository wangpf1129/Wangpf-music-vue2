<template>
  <div class="singers-list-wrapper">
    <ul class="singers-list">
      <li
        class="singers-item"
        v-for="singer of list"
        :key="singer.singer_id"
        @click="selectSinger(singer)"
      >
        <img :src="singer.singer_pic" alt="">
        <span>{{ singer.singer_name }}</span>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  name: 'SingersList',
  props: {
    list: {
      type: Array,
      required: true
    }
  },
  methods:{
    selectSinger(singer){
      this.$emit('select-singer',singer)
    }
  }
};
</script>

<style lang="scss" scoped>
.singers-list-wrapper {
  .singers-list {
    display: flex;
    flex-direction: column;
    flex-wrap: nowrap;
    margin-left: 30px;
    padding: 16px 0;
    
    >.singers-item{
      margin: 12px 4px;
      
      img{
        width: 60px;
        border-radius: 50%;
      }
      span{
        font-size: 18px;
        font-weight: 700;
        margin-left: 18px;
      }
    }
  }
}
</style>