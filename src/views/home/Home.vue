<template>
  <div id="home">
    <nav-bar class="home-nav-bar"><div slot="center">购物街</div></nav-bar>
    <scroll class="content"
            ref="scroll"
            :probe-type="3"
            @scroll="getPosition"
            :pull-up-load="true" @pullingUp="getMoreGoods">
      <home-swiper :banners="banners"/>
      <recommend-view :recommends="recommends"/>
      <feature-view/>
      <tab-control :title="['流行', '新款', '精选']" class="home-tab-control" @tabClick="tabClick"/>
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
        isShowBackTop: false
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
      },
      // 点击回顶部
      backClick() {
        // this.$refs.scroll.scroll.scrollTo(0,0,500)
        this.$refs.scroll.scrollToTop(0, 0, 500)
      },

      // 获取当前滑动位置, 动态显示backTop按钮
      getPosition(position) {
        this.isShowBackTop = -position.y > 1000
      },

      // 上拉加载更多
      getMoreGoods(){
        this.getGoods(this.currentType)
        // 结束本次下拉加载更多, 可以再次使用
        this.$refs.scroll.finishPU()
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
    padding-top: 44px;
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
    position: fixed;
    left: 0px;
    right: 0px;
    top: 0px;
    height: 44px;
    line-height: 44px;
    z-index: 9;
  }
  .home-tab-control {
    position: sticky;
    top: 44px;
  }
</style>
