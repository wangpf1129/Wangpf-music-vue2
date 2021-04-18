<template>
  <div class="player-wrapper" v-if="playList.length > 0">
    <div class="normal-player" v-if="fullscreen">
      播放器
    </div>
    <div class="mini-player" v-else></div>
  </div>
</template>

<script>
import {mapGetters} from 'vuex';

export default {
  name: 'Player',
  computed: {
    ...mapGetters(['playList', 'fullscreen'])
  }
};
</script>

<style lang="scss" scoped>
.player-wrapper {
  position: absolute;
  z-index: 101;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: #fafafa;
  display: flex;
  flex-direction: column;
  
  > .normal-player {
    color: #000;
    flex: 1;
    font-weight: 700;
  }
  
  > .mini-player {
    height: 10%;
    border: 1px solid red;
  }
}
</style>