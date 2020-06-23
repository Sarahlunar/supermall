<template>
  <div class="detail-navbar">
    <nav-bar>
      <div slot="left" class="left" @click="back">
        <img src="~assets/img/common/back.svg" alt="">
      </div>
      <div slot="center" class="center">
        <div v-for="(item, index) in title"
             class="item-title"
             :class="{active: index === currentIndex}"
             @click="changeTitle(index)">
          {{item}}
        </div>
      </div>
    </nav-bar>
  </div>
</template>

<script>
  import NavBar from "components/common/navbar/NavBar";
  export default {
    name: "DetailNavBar",
    data() {
      return {
        title: ["商品", "参数", "评论", "推荐"],
        currentIndex: 0
      }
    },
    components: {
      NavBar
    },
    methods: {
      changeTitle(index){
        this.currentIndex = index
      },
      back() {
        this.$router.back()
      }
    }
  }
</script>

<style scoped>
  .center {
    display: flex;
  }
  .item-title {
    flex: 1;
  }
  .active {
    color: var(--color-tint)
  }
  .left img {
    padding-top: 12px;
    padding-left: 10px;
  }

</style>
