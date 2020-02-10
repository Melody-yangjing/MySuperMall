<template>

  <div class="recommend">

    <div v-for="item in recommends" class="recommend-item">
      <a :href="item.link">
        <img :src="item.image" alt="">
        <p> {{item.title}} </p>
      </a>
    </div>

  </div>


</template>

<script>
  export default {
    name: "Recommend",
    props: {
      recommends: {
        type: Array
      }
    },
  }
</script>

<style scoped>
  .recommend {
    display: flex;
    justify-content: space-around;
    background-color: #fff;
    margin-top: 3px;
    padding: 10px 0;
    font-size: 14px;
    border-bottom: 8px solid #eee;
    text-align: center;
  }
  .recommend-item{
    padding-bottom: 10px;
  }
  .recommend-item p{
    margin-top: 5px;
  }
  .recommend-item img {
    width: 70px;
    height: 70px;
  }
</style>
