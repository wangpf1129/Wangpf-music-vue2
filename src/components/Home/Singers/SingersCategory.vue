<template>
  <div class="singers-category-wrapper">
    <div v-for="(value,key) of category" :key="key">
      <ul class="category">
        <li v-for="(item,index) of value"
            :key="item.id"
            :class="['category-item',{'category-active':activeIndex[key]===index}]"
            @click="activeIndex[key] = index"
        >
          {{ item.name }}
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
export default {
  name: 'SingersCategory',
  props: {
    category: {
      type: Object,
      required: true
    }
  },
  data() {
    return {
      activeIndex: {
        sex: 0,
        genre: 0,
        area: 0
      }
    };
  }
};
</script>

<style lang="scss" scoped>
.singers-category-wrapper {
  .category {
    display: flex;
    flex-wrap: wrap;
    color: #afafaf;
    
    > .category-item {
      margin: 6px;
      padding: 4px 6px;
      
      &.category-active {
        color: #fff;
        background-color: #1a73e8;
        border-radius: 10px;
      }
    }
  }
}
</style>