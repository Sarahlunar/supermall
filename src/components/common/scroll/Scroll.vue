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
      pullUpLoad: {
        type: Boolean,
        default: false
      }

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

      // 监听滚动到底部
      if(this.pullUpLoad) {
        this.scroll.on("pullingUp", () => {
          this.$emit("pullingUp")
        })
      }

    },
    methods: {
      scrollTo(x, y, time){
        // 先判断有this.scroll再去操作
        this.scroll && this.scroll.scrollTo(x, y, time)
      },

      refresh() {
        this.scroll && this.scroll.refresh()
      },

      // 结束上拉加载更多
      finishPullUp() {
        this.scroll.finishPullUp()
      },
      // 获取到y
      positionY() {
        return this.scroll ? this.scroll.y : 0
      }
    }
  }
</script>

<style scoped>

</style>
