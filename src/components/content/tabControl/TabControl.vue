<template>
  <div class="tab-control">
    <div v-for="(item, index) in title"
         class="tab-control-item" :class="{active: index === currentIndex}" @click="changeItem(index)" >
      <span>{{item}}</span>
    </div>
  </div>
</template>

<script>
  export default {
    name: "TabControl",
    data() {
      return {
        currentIndex: 0
      }
    },
    props: {
      title: {
        type: Array,
        default() {
          return []
        }
      }
    },
    methods: {
      changeItem(index) {
        this.currentIndex = index
        this.$emit("tabClick", index)
      }
    }
  }
</script>

<style scoped>
  .tab-control {
    display: flex;
    height: 40px;
    line-height: 40px;
    background-color: #ffffff;
    font-size: 15px;
    z-index: 9;
  }
  .tab-control-item {
    flex: 1;
    text-align: center;
  }
  .active {
    color: var(--color-high-text);
  }
  .active span {
    border-bottom: 3px solid var(--color-tint) ;
  }

  .tab-control-item span {
    padding: 5px;
  }
</style>
