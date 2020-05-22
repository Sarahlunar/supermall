<template>
  <div>
    <nav-bar class="home-nav-bar"><div slot="center">购物街</div></nav-bar>
    <h2>我是首页</h2>
  </div>
</template>

<script>
  import NavBar from "components/common/navbar/NavBar";
  export default {
    name: "Home",
    components: {
      NavBar
    }
  }
</script>

<style scoped>
  .home-nav-bar {
    background-color: var(--color-tint);
  }
</style>
