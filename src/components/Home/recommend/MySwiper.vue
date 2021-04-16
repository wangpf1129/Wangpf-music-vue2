<template>
  <div class="swiper-wrapper">
    <a-carousel autoplay>
      <div class="swiper-img" v-for="item of swiperList" :key="item.id">
        <img :src="item.imgUrl" alt="" @load="imgLoad">
      </div>
    </a-carousel>
  </div>
</template>

<script>
export default {
  name: 'MySwiper',
  props: {
    swiperList: {
      type: Array,
      required: true
    }
  },
  methods: {
    imgLoad() {
      this.$emit('imgLoad');
    }
  }
};
</script>

<style lang="scss" scoped>
.swiper-wrapper {
  .ant-carousel .swiper-img {
    width: 100vw;
    
    img {
      width: 96%;
      margin: 0 auto;
    }
  }
}
</style>