<template>
  <div class="bg-image" :style="bgStyle">
    <div class="music-title">
      <span class="icon-back" @click="back">back</span>
      <span class="title">{{ title }}</span>
    </div>
  </div>
</template>

<script>
export default {
  name: 'SingerDetailTitle',
  props: {
    title: {
      type: String,
      default: ''
    },
    bgUrl: {
      type: String,
      default: ''
    }
  },
  computed: {
    bgStyle() {
      return `background-image:url(${this.bgUrl})`;
    }
  },
  methods: {
    back() {
      this.$router.back();
    }
  }
};
</script>

<style lang="scss" scoped>
.bg-image {
  position: relative;
  width: 100%;
  height: 0;
  padding-top: 70%;
  transform-origin: top;
  background-size: cover;
  overflow: hidden;
  border-bottom-left-radius: 10%;
  border-bottom-right-radius: 10%;
  color: #fff;
  
  
  > .music-title {
    margin-top: 10px;
    
    .icon-back {
      position: absolute;
      top: 2px;
      left: 8px;
      font-size: 16px;
      display: block;
    }
    
    .title {
      position: absolute;
      top: 0;
      left: 10%;
      width: 80%;
      font-size: 18px;
      text-align: center;
      margin-top: 0;
      font-weight: 700;
    }
  }
  

}
</style>