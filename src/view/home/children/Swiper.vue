<template>
  <section class="my-swiper">
    <swiper :options="swiperOption" ref="swiperOption" v-if='banners.length>0'>
      <swiper-slide  class="my-swp-silde" v-for="(slide, key) in banners" :key="key" data-id="slide.id">
        <img class="my-swp-img" :src="slide.image" alt="" @load="loadImg">
      </swiper-slide>
      <div class="swiper-pagination" slot="pagination"></div>
    </swiper>
  </section>
</template>

<script>
  import { swiper, swiperSlide } from 'vue-awesome-swiper';

  export default {
    name: "Swiper",
    components:{
      swiper,
      swiperSlide
    },
    props:{
      banners:{
        type:Array
      }
    },
    data(){
      return{
        swiperOption: {
          observeParents:true,
          observer:true,
          autoplay: {
            disableOnInteraction: false,  // 用户操作swiper之后，是否禁止autoplay
            delay: 3000, // 自动切换的时间间隔（单位ms）
          },
          initialSlide: 0,
          loop: true,
          pagination: {
            el: '.swiper-pagination' ,
            clickable: true // 允许点击小圆点跳转
          }, // 分页按钮
          paginationClickable: true,
          onSlideChangeEnd: swiper => {
            //console.log('onSlideChangeEnd', swiper.realIndex)
          },
          navigation: {
            nextEl: '.swiper-button-next',
            prevEl: '.swiper-button-prev'
          }
        },
        isLoad:false
      }
    },
    methods:{
      loadImg(){
        if (!this.isLoad){
          this.$emit('loadImg')
          this.isLoad = true
        }
      }
    }
  }
</script>

<style scoped>

  .my-swiper img{
    width: 100%;
    vertical-align: middle;
  }
</style>
