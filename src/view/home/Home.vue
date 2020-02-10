<template>
  <div id="home" class="wrapper">
    <NavBar class="nav">
      <div slot="center" class="nav-title">购物车</div>
    </NavBar>

    <TabControl :tabContext="tabContext"
                @tabClick="tabClick"
                ref="tabControl"
                v-show="tabShow"
                class='fixed'
    ></TabControl>

    <!--封装betterScroll滚动-->
    <Scroll class="content"
            ref="homeScroll1"
            :probeType="3"
            :pullUpLoad="true"
            @pullingUp="loderMore"
            @scroll="homeScroll"
    >
      <!--    轮播图-->
<!--      <Swiper :banners="banners" class="home-swiper" @loadImg="loadImg"></Swiper>-->

      <HomeSwiper :banners="banners" class="home-swiper" @loadImg="loadImg"></HomeSwiper>
      <!--    推荐-->
      <Recommend :recommends="recommends" class="recommend" ></Recommend>

      <!--    流行-->
      <Feature></Feature>


      <TabControl :tabContext="tabContext"
                  @tabClick="tabClick"
                  ref="tabControl"
      ></TabControl>
      <!--商品列表-->
      <GoodsList :goods="homeGoods[currentType].list"></GoodsList>
    </Scroll>

    <!--    组件使用原生事件，必须加上.native修饰符-->
    <BackTop @click.native="backTop" :isShow="isShow"></BackTop>

  </div>
</template>

<script>

  import NavBar from "components/common/navBar/NavBar";
  import Swiper from 'view/home/children/Swiper'
  import Recommend from "view/home/children/Recommend";
  import Feature from "view/home/children/Feature";
  import TabControl from "components/content/tabControl/TabControl";
  import GoodsList from "components/content/goodsList/GoodsList";
  import Scroll from "components/common/scroll/Scroll";
  import BackTop from "components/content/backTop/BackTop";
  import HomeSwiper from "./children/HomeSwiper";

  import {debounce} from "common/utils";
  import {getMultiData, getGoodsList} from "serve/home";

  export default {
    name: "Home",
    components: {
      NavBar,
      Swiper,
      Recommend,
      Feature,
      TabControl,
      GoodsList,
      Scroll,
      BackTop,
      HomeSwiper
    },
    data() {
      return {
        banners: [],
        recommends: [],
        tabContext: ['流行', '新款', '精选'],
        homeGoods: {
          pop: {
            page: 0, list: []
          },
          new: {
            page: 0, list: []
          },
          sell: {
            page: 0, list: []
          }
        },
        currentType: 'pop',
        isShow: false,
        offsetTop: 0,
        tabShow:false,
        saveY:0
      }
    },
    created() {
      //获取banner数据
      this.getHomeData()

      //获取商品数据
      this.getHomeGoods('pop')
      this.getHomeGoods('new')
      this.getHomeGoods('sell')

    },
    mounted() {

      const refresh = debounce(this.$refs.homeScroll1.refresh, 500)


      this.$bus.$on('imageLoad', () => {
        refresh()
      })



    },
    activated() {
      // this.$refs.homeScroll1.scroll.y = this.saveY

      this.$refs.homeScroll1.scroll.scrollTo(0,this.saveY)
      this.$refs.homeScroll1.refresh()

      console.log('activated');
      // 激活的时候，把保存的y值设置为滚动区域当前的y
    },
    deactivated() {
      // 离开的时候，保存滚动区域当前的y值
      this.saveY = this.$refs.homeScroll1.scroll.y
      console.log(this.saveY);
      console.log('deactivated');
    },
    methods: {
      tabClick(index) {
        console.log(index);
        switch (index) {
          case 0:
            this.currentType = 'pop'
            break;
          case 1:
            this.currentType = 'new'
            break;
          case 2:
            this.currentType = 'sell'
            break;
        }
      },
      backTop() {
        // this.$refs.homeScroll里面的scroll对象
        this.$refs.homeScroll1.scroll.scrollTo(0, 0, 300)
      },
      homeScroll(position) {
        this.isShow = -position.y > 1000

        //吸顶  当滚动了一定的高度后，吸顶
        this.tabShow = position.y < -549


      },
      loadImg(){
        this.offsetTop = this.$refs.tabControl.$el.offsetTop
        console.log(this.$refs.tabControl.$el.offsetTop);

      },
      loderMore() {
        // 上拉的时候,加载更多数据  因为currentType是实时的，所以当加载更多数据的时候直接使用
        // console.log(position);

        this.getHomeGoods(this.currentType)
      },
      //为了不让created()中的代码过于臃肿，只负责调用，所以在methods中再做一次封装
      getHomeData() {
        getMultiData().then(res => {
          // console.log(res);
          this.banners = res.data.banner.list
          this.recommends = res.data.recommend.list
          // console.log(this.recommends);
        })
      },
      getHomeGoods(type) {
        // 调用的时候，页码应该是从1开始
        let page = this.homeGoods[type].page + 1
        getGoodsList(type, page).then(res => {
          this.homeGoods[type].list.push(...res.data.list)
          this.homeGoods[type].page = page + 1
          // console.log(res.data);

          //完成一次上拉加载更多必须调用finishPullUp，才能开始下一次上拉加载
          this.$refs.homeScroll1.scroll.finishPullUp()

        })
      }
    }

  }
</script>

<style scoped>
  /*利用定位来计算可滚动区域*/
  .wrapper {
    /*position: relative;*/
    height: 100vh;
  }

  .nav {
    background-color: var(--color-tint);
    color: #ffffff;
    z-index: 100;
  }

  .home-swiper {
    margin-top: 44px;
  }

  .content {
    /*height: 300px;*/
    /*position: absolute;*/
    /*top: 44px;*/
    /*left: 0;*/
    /*right: 0;*/
    /*bottom: 49px;*/
    height: calc(100% - 93px);
    overflow: hidden;
  }

  .fixed{
    /*position: fixed;*/
    z-index: 99;
  }


</style>
