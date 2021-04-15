<template>
  <div class="home-header">
    <div class="title">
      {{ title }}
    </div>
    <ul class="nav-list">
      <li v-for="(item,index) of navList"
          :key="index"
          :class="{'nav-active':item.path === $route.path}"
          @click="navClick(item.path)"
      >
        {{ item.name }}
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  name: 'HomeHeader',
  props: {
    title: {
      type: String,
      default: 'Wangpf Music'
    }
  },
  data() {
    return {
      navList: [
        {path: '/recommend', name: '推荐'},
        {path: '/singers', name: '歌手'},
        {path: '/rank', name: '排行榜'},
        {path: '/search', name: '搜索'},
      ]
    };
  },
  methods:{
    navClick(path){
      this.$emit('navClick',path)
    }
  }
};
</script>

<style scoped lang="scss">
.home-header {
  .title {
    padding: 10px;
    color: #1a73e8;
    text-align: center;
    font-weight: 700;
    font-size: 24px;
  }
  
  .nav-list {
    display: flex;
    justify-content: space-around;
    font-size: 18px;
    color: rgba(26, 26, 26, 0.5);
    
    > li {
      padding: 8px 10px;
      
      &.nav-active{
        color: #1a73e8;
        font-weight: 700;
      }
    }
  }
}
</style>