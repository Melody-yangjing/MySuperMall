<template>
<div class="back-top" v-show="isShow">
  <img src="@/assets/img/common/top.png" alt="">
</div>
</template>

<script>
  export default {
    name: "BackTop",
    props:{
      isShow:{
        type:Boolean,
        default(){
          return true
        }
      }
    }
  }
</script>

<style scoped>
.back-top{
  position: fixed;
  bottom: 60px;
  right: 10px;
}
  .back-top img{

    width: 60px;
    height: 60px;
  }
</style>
