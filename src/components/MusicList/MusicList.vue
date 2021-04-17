<template>
  <div class="music-list-wrapper">
    <div class="back">
      <i class="icon-back">back</i>
    </div>
    <h1 class="title">{{ title }}</h1>
    <div class="bg-image">
      <img :src="bgUrl" alt="">
      <div class="filter"></div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'MusicList',
  props: {
    title: {
      type: String,
      default: ''
    },
    bgUrl: {
      type: String,
      default: ''
    },
    songsList: {
      type: Array,
      default: [] || null
    }
  },
};
</script>

<style lang="scss" scoped>
.music-list-wrapper {
  position: absolute;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  background-color: #fafafa;
}
</style>