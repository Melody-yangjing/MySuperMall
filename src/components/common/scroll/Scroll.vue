<template>
<div class="wrapper" ref="wrapper">
  <div class="content">
    <slot></slot>
  </div>
</div>
</template>

<script>
  import BScroll from 'better-scroll'
  export default {
    name: "Scroll",
    props:{
      probeType:{
        type:Number,
        default(){
          return 0
        },
      },
      pullUpLoad: {
        type: Boolean,
        default() {
          return false;
        }
      }
    },
    components:{
      BScroll
    },
    data(){
      return{
        scroll:null,
      }
    },
    mounted() {
      this.scroll = new BScroll(this.$refs.wrapper,{
        probeType:this.probeType,
        pullUpLoad:this.pullUpLoad,
        click:true
      })
// 回到顶部按钮的显示和隐藏，是需要在滚动的时候和滚动的距离进行对比的
      if (this.probeType===2||this.probeType===3){
        this.scroll.on('scroll',(position)=>{
          this.$emit('scroll',position)
        })

      }


      // 上拉加载更多，因为是在home组件上拉时候加载数据，所以最好的方法是把事件传递给home组件
      if (this.pullUpLoad){
        this.scroll.on('pullingUp',()=>{
          this.$emit('pullingUp')

        })

      }

    },
    methods:{
      refresh(){
        if (this.scroll){
          this.scroll.refresh()
        }
      }

    }
  }
</script>

<style scoped>

</style>
