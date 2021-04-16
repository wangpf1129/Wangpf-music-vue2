<template>
  <div class="wrapper" ref="wrapper">
    <slot></slot>
  </div>
</template>

<script>
import BScroll from '@better-scroll/core';

export default {
  name: 'Scroll',
  props: {
    top: {
      type: Number,
      default: 0
    }
  },
  methods: {
    initScroll() {
      this.$refs.wrapper.style.top = this.top + 'px'
      this.scroll = new BScroll(this.$refs.wrapper);
    }
  },
  mounted() {
    this.initScroll();
  }
};
</script>

<style lang="scss">
.wrapper {
  position: absolute;
  left: 0;
  right: 0;
  bottom: 0;
  top: 0;
}
</style>