<template>
  <div class="goods-list">
    <GoodsListItem v-for="(item,index) in goods" :key="index" :goodsItem="item" class="goods-item">
      {{item}}
    </GoodsListItem>

  </div>
</template>

<script>
  import GoodsListItem from "./GoodsListItem";
  export default {
    name: "GoodsList",
    props:{
      goods:{
        type:Array,
        default() {
          return [];
        }
      }
    },
    components:{
      GoodsListItem
    }
  }
</script>

<style scoped>
  .goods-list{
    flex-wrap: wrap;
    display: flex;
    justify-content: space-around;

    padding: 2px;
  }

</style>
