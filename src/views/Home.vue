<template>
  <div>
    <home-header title="Wangpf Music" @navClick="toPath"/>
    <keep-alive>
      <router-view/>
    </keep-alive>
    <player></player>
  </div>
</template>

<script>

import HomeHeader from '@/components/Home/HomeHeader';
import Player from '@/components/Player/Player';

export default {
  name: 'Home',
  components: {HomeHeader, Player},
  methods: {
    toPath(path) {
      this.$router.push(path);
    }
  }
};
</script>

<style scoped>

</style>