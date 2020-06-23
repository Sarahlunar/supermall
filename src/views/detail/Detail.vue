<template>
  <div class="detail">
    <detail-nav-bar/>
    <detail-swiper :swiper-img="swiperImg"/>
    <detail-base-info :goods="goods"/>
  </div>
</template>

<script>
  import DetailNavBar from "./childComps/DetailNavBar";
  import DetailSwiper from "./childComps/DetailSwiper";
  import DetailBaseInfo from "./childComps/DetailBaseInfo";
  import {getDetailData, Goods} from "network/detail";

  export default {
    name: "Detail",
    data() {
      return {
        iid: null,
        swiperImg: [],
        goods: {}
      }
    },
    created() {
      // 保存iid
      this.iid = this.$route.params.iid
      // 请求数据
      getDetailData(this.iid).then((res) => {
        console.log(res)
        const data = res.result
        // 1.轮播图数据
        this.swiperImg = data.itemInfo.topImages
        // 2. 商品信息
        this.goods = new Goods(data.itemInfo, data.columns, data.shopInfo.services)

        // 3.店铺信息

        // 4.商品的详情数据detailInfo

      })
    },
    components: {
      DetailNavBar,
      DetailSwiper,
      DetailBaseInfo
    }
  }
</script>

<style scoped>

</style>
