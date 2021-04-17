<template>
  <div class="songs-list">
    <ul>
      <li class="songs" v-for="song of songsList" :key="song.id">
        <p>{{ song.name }}</p>
        <span>{{ song.singer[0].name }} - {{ song.album.name }}</span>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  name: 'SongsList',
  props: {
    songsList: {
      type: Array,
      required: true
    }
  }
};
</script>

<style lang="scss" scoped>

</style>