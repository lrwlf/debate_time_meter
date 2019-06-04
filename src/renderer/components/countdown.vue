<template>
  <div>
     <audio ref='threet' preload='auto' src="static/threet.mp3"></audio>
        <audio ref='five' preload='auto' src="static/five.mp3"></audio>
        <audio ref='end' preload='auto' src="static/end.mp3"></audio>
    <div class="num" :style="!showmode?'':'width:24%;'">
      <img :src="topath(minute)">
    </div>
    <div class="num" :style="!showmode?'':'width:24%'" >
      <img src="static/split.png">
    </div>
    <div class="num" :style="!showmode?'':'width:24%;'" >
      <img :src="topath(ten)">
    </div>
    <div class="num" :style="!showmode?'':'width:24%;'" >
      <img :src="topath(one)">
    </div>
  </div>
</template>
<script>
import { setInterval, clearInterval } from 'timers';
export default {
  data() {
    return {
        timmer:'',
        now:null,
    };
  },
  computed: {
    minute: function() {
      return Math.floor(Math.floor(this.currenttime) / 60);
    },
    ten: function() {
      return Math.floor(Math.floor(Math.floor(this.currenttime) % 60) / 10);
    },
    one: function() {
      return Math.floor(Math.floor(Math.floor(this.currenttime) % 60) % 10);
    }
  },
  methods: {
    timedown() {
      if (this.pause||this.currenttime==0) return;
      if(this.currenttime>=0.1){
         this.$emit('down',this.currenttime-0.1)
         if(Math.abs(this.currenttime-30)<0.01){
            this.$refs.threet.play();
          }
        else{
          for(let i = 5 ; i > 0; --i)
            if(Math.abs(this.currenttime-i) < 0.01 ){
              this.$refs.five.play();
          }
        }
      }
      else{
         this.$refs.end.play();
         clearTimeout(this.timmer);
         this.$emit('down',0);
      }
      this.timmer=setTimeout(this.timedown, 200 - (+new Date()-this.now));
      // console.log((+new Date()-this.now));
      this.now = +new Date();
    },
    // bgdown(){
    //   console.log('-1');
    //     this.timmer = setInterval(()=>{
    //       if(this.currenttime>=0.1){
    //         this.$emit('down',this.currenttime-0.1);
    //         console.log(this.currenttime);
    //       }
    //       else{
    //         clearInterval(this.timmer);
    //       }
    //     },100)
         
    // },
    topath(num) {
      return "static/" + num + ".png";
    }
  },
  model:{
      prop:'currenttime',
      event:'down',
  },
  props:{
      pause:Boolean,
      currenttime:Number,
      showmode:Boolean,
  },
  watch:{
      pause:function(){
            if (!this.pause) {
              this.now = +new Date();
              this.timmer=setTimeout(this.timedown, 100);
            
            }
            else clearTimeout(this.timmer);
            // if (!this.pause){
            //   this.bgdown();
            // }
            // else{
            //   clearInterval(this.timmer);
            // }
      },
  },
  created() {

  }
};
</script>
<style scoped>
.num {
  display: inline-block;
  width: 20%;
  height: 20%;
  text-align: center;
}
#bnum {
  display: inline-block;
  width: 30%;
  height: 30%;
  text-align: center;
}
.num img{
    width: 100%;
}
</style>
