<template>
  <div>
    <home-header title="Wangpf Music" @navClick="toPath"/>
    <router-view/>
  </div>
</template>

<script>

import HomeHeader from '@/components/Home/HomeHeader';

export default {
  name: 'Home',
  components: {HomeHeader},
  methods: {
    toPath(path) {
      this.$router.push(path);
    }
  }
};
</script>

<style scoped>

</style>