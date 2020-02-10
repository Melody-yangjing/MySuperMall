<template>
  <div class="home-swiper">
    <Swiper :banners="banners"></Swiper>
  </div>
</template>

<script>
  import Swiper from "components/content/swiper/Swiper";
  export default {
    name: "HomeSwiper",
    props:{
      banners:{
        type:Array
      }
    },
    components:{
      Swiper,

    }
  }
</script>

<style scoped>

</style>
