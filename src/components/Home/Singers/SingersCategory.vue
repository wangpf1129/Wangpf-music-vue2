<template>
  <div class="singers-category-wrapper">
    <div v-for="(value,key) of category" :key="key" @load="categoryLoad">
      <ul class="category">
        <li v-for="(item,index) of value"
            :key="item.id"
            :class="['category-item',{'category-active':activeIndex[key]===index}]"
            @click="categoryClick(key,index)"
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
  },
  methods: {
    categoryLoad() {
      this.$emit('categoryLoad');
    },
    categoryClick(key, index) {
      this.activeIndex[key] = index;
      const params = {};
      for (let k in this.activeIndex) {
        params[k] = this.category[k][this.activeIndex[k]].id;
      }
      this.$emit('category-click', params);
    }
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