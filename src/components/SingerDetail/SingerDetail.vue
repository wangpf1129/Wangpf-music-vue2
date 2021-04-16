<template>
  <transition name="slide-fade">
    <div class="singer-detail-wrapper">
      SingerDetail
    </div>
  </transition>
</template>

<script>
import {mapGetters} from 'vuex';

export default {
  name: 'SingerDetail',
  methods: {
    ...mapGetters(['singer'])
  },
  created() {
    console.log(this.singer());
  }
};
</script>

<style lang="scss" scoped>

.singer-detail-wrapper {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: #fafafa;
}


.slide-fade-enter-active, .slide-fade-leave-active {
  transition: all .3s;
}

.slide-fade-enter, .slide-fade-leave-to {
  transform: translate3d(100%, 0, 0);
}
</style>