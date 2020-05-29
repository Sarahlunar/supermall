<template>
  <div class="wrapper" ref="wrapper">
    <div class="content">
      <slot></slot>
    </div>

  </div>
</template>

<script>
  import BScroll from "better-scroll"
  export default {
    name: "Scroll",
    data() {
      return {
        scroll: null
      }
    },
    props: {
      probeType: {
        type: Number,
        default: 0
      },
      pullUpLoad: false
    },
    mounted() {
      //创建BScroll对象
      this.scroll = new BScroll(this.$refs.wrapper,{
        click: true,
        // probeType: 3, 不需要还设置, 会影响性能
        probeType: this.probeType,
        pullUpLoad: this.pullUpLoad
      })

      //监听滚动的位置
      this.scroll.on('scroll', (position) => {
        this.$emit("scroll", position)
      })

      // 监听上拉加载
      this.scroll.on('pullingUp', () => {
        this.$emit("pullingUp")
      })
    },
    methods: {
      scrollToTop(x, y, time){
        this.scroll.scrollTo(x, y, time)
      },
      finishPU(){
        this.scroll.finishPullUp()
      }
    }
  }
</script>

<style scoped>

</style>
