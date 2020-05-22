<template>
  <div>
    <nav-bar class="home-nav-bar"><div slot="center">购物街</div></nav-bar>
    <h2>我是首页</h2>
  </div>
</template>

<script>
  import NavBar from "components/common/navbar/NavBar";
  import {getHomeMultiData} from "network/home";

  export default {
    name: "Home",
    data() {
      return {
        res: null
      }
    },
    components: {
      NavBar
    },
    created() {
      getHomeMultiData().then(res => {
        this.res = res;
        console.log(this.res);
      })
    }
  }
</script>

<style scoped>
  .home-nav-bar {
    background-color: var(--color-tint);
  }
</style>
