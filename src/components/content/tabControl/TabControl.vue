<template>
<div class="tab-control">
  <div class="tab-control-item" v-for="(item,index) in tabContext" @click="itemClick(index)">
    <span :class="currentIndex==index?'active':''">{{item}}</span>
  </div>
</div>
</template>

<script>
  export default {
    name: "TabControl",
    props:{
      tabContext:{
        type:Array,
        default(){
          return []
        }
      }
    },
    data(){
      return{
        currentIndex:0,
      }
    },
    methods:{
      tabClick(){
        console.log('tabClick');

      },
      itemClick(index){
        this.currentIndex = index
        this.$emit('tabClick',index)
      }
    }
  }
</script>

<style scoped>
  .tab-control{
    display: flex;
    height: 40px;
    line-height: 40px;
  }
.tab-control-item{
  flex: 1;
  text-align: center;
}
  .tab-control-item span{
    padding: 5px;
  }
  .active{
    color: var(--color-tint);
    border-bottom: 3px solid var(--color-tint);

  }
</style>
