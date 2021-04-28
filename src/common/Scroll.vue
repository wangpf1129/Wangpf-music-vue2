<template>
  <div class="wrapper" ref="wrapper">
    <slot></slot>
  </div>
</template>

<script>
import BScroll from '@better-scroll/core';
import {playListMixin} from '@/common/JS/mixin';

export default {
  name: 'Scroll',
  mixins:[playListMixin],
  props: {
    top: {
      type: Number,
      default: 0
    },
    list: {
      type: Array,
      default: () => {return [];}
    },
    click: {
      type: Boolean,
      default: true
    }
  },
  methods: {
    initScroll() {
      this.$refs.wrapper.style.top = this.top + 'px';
      this.scroll = new BScroll(this.$refs.wrapper, {
        click: this.click
      });
    },
    refresh() {
      this.scroll && this.scroll.refresh();
    },
    // 有播放列表的时候滑动组件的底部要加bottom
    handlePlayList(playList) {
      this.$refs.wrapper.style.bottom = playList.length > 0 ? '70px' : '0px';
      this.refresh();
    },
  },
  mounted() {
    this.initScroll();
  },
  watch: {
    list() {
      this.$nextTick(() => {
        this.refresh();
      });
    }
  }
};
</script>

<style lang="scss">
.wrapper {
  position: absolute;
  overflow: hidden;
  top: 0;
  left: 0;
  right: 0;
}
</style>