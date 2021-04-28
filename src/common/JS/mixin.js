import {mapGetters} from 'vuex';

export const playListMixin = {
  computed: {
    ...mapGetters(['playList'])
  },
  methods: {
    handlePlayList() {
      throw new Error('组件必须实现handlePlayList方法');
    }
  },
  mounted() {
    this.handlePlayList(this.playList);
  },
  activated() {
    this.handlePlayList(this.playList);
  },
  watch: {
    playList(newValue) {
      this.handlePlayList(newValue);
    }
  }
};