<template>
  <div id="home">
    <nav-bar class="home-nav-bar"><div slot="center">购物街</div></nav-bar>
    <tab-control :title="['流行', '新款', '精选']" class="home-tab-control" @tabClick="tabClick" ref="tabControl1" v-show="isFixedTop"/>
    <scroll class="content"
            ref="scroll"
            :probe-type="3"
            @scroll="getPosition"
            :pull-up-load="true" @pullingUp="getMoreGoods">
      <home-swiper :banners="banners" @swiperImgLoad="swiperImgLoad"/>
      <recommend-view :recommends="recommends"/>
      <feature-view/>
      <tab-control :title="['流行', '新款', '精选']"  @tabClick="tabClick" ref="tabControl2"/>
      <goods-list :goods = "showType"/>
    </scroll>
    <back-top @click.native="backClick" v-show="isShowBackTop"/>
  </div>
</template>

<script>
  import HomeSwiper from "./childComps/HomeSwiper";
  import RecommendView from "./childComps/RecommendView";
  import FeatureView from "./childComps/FeatureView";

  import NavBar from "components/common/navbar/NavBar";
  import TabControl from "components/content/tabControl/TabControl";
  import GoodsList from "components/content/goods/GoodsList";
  import Scroll from "components/common/scroll/Scroll";
  import BackTop from "components/content/backTop/BackTop";

  import {getHomeMultiData, getHomeGoods} from "network/home";
  import {debounce} from "../../common/utils";

  export default {
    name: "Home",
    data() {
      return {
        banners: [],
        recommends: [],
        goods: {
          'pop': {page: 0, list: []},
          'new': {page: 0, list: []},
          'sell': {page: 0, list: []}
        },
        currentType: "pop",
        isShowBackTop: false,
        tabOffsetTop: 0,
        isFixedTop: false
      }
    },
    components: {
      HomeSwiper,
      RecommendView,
      FeatureView,

      NavBar,
      TabControl,
      GoodsList,
      Scroll,
      BackTop

    },
    created() {
      // 请求首页多个数据
      this.getMultiData()
      //  请求goods数据
      this.getGoods('pop')
      this.getGoods('new')
      this.getGoods('sell')


    },
    mounted() {
      // 监听item中图片加载完成
      const refresh = debounce(this.$refs.scroll.refresh, 50)
      this.$bus.$on("itemImgLoaded", () => {
        refresh()
      })


    },

    computed: {
      showType() {
        return this.goods[this.currentType].list
      }
    },

    methods: {
      /*
      * 事件监听相关的方法
      * */

      // 监听tabControl的点击，切换商品列表
      tabClick(index) {
        switch (index) {
          case 0:
            this.currentType = "pop"
            break
          case 1:
            this.currentType = "new"
            break
          case 2:
            this.currentType = "sell"
        }

        //保持两个tab-control选取的一样
        this.$refs.tabControl1.currentIndex = index
        this.$refs.tabControl2.currentIndex = index
      },
      // 点击回顶部
      backClick() {
        // this.$refs.scroll.scroll.scrollTo(0,0,500)
        this.$refs.scroll.scrollToTop(0, 0, 500)
      },

      // 获取当前滑动位置
      getPosition(position) {
        // 动态显示backTop按钮
        this.isShowBackTop = -position.y > 1000

        // 决定tabcontrol吸顶效果(position:fixed)
        if(this.tabOffsetTop <= -position.y) {
          this.isFixedTop = true
        }else this.isFixedTop = false
      },

      // 上拉加载更多
      getMoreGoods() {
        this.getGoods(this.currentType)
        // 结束上拉加载更多
        this.$refs.scroll.finishPullUp()
      },

      // 监听轮播图片加载完成
      swiperImgLoad() {
        // 获取tabControl的offsetTop, 组件没有这个属性, 从组件里面元素的该属性
        // 所有组件都有一个属性$el, 获取组件的元素
        this.tabOffsetTop = this.$refs.tabControl2.$el.offsetTop
      },


      /*
      * 网络请求相关的方法
      * */

      // 获取轮播图和推荐商品图
      getMultiData() {
        getHomeMultiData().then(res => {
          this.banners = res.data.banner.list;
          this.recommends = res.data.recommend.list
        })
      },

      // 获取商品列表数据
      getGoods(type) {
        //获取当前页面+1页面的数据
        let page = this.goods[type].page + 1
        getHomeGoods(type, page).then(res => {
          // 将获取到的数据追加到list中
          this.goods[type].list.push(...res.data.list)
          // 当前页码要加1
          this.goods[type].page += 1
        })
      },


    }
  }
</script>

<style scoped>
  #home {
    position: relative;
    /*padding-top: 44px;*/
    height: 100vh
  }
  .content {
    position: absolute;
    top: 44px;
    bottom: 49px;
    left: 0;
    right:0;
  }
  .home-nav-bar {
    background-color: var(--color-tint);

    /*原生滚动,防止导航跟随滚动时使用*/
    /*position: fixed;*/
    /*left: 0px;*/
    /*right: 0px;*/
    /*top: 0px;*/
    /*z-index: 9;*/
  }
  .home-tab-control {
    position: relative;
    z-index: 9;
  }

</style>
