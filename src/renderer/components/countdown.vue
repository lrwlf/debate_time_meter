<template>
  <div>
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
export default {
  data() {
    return {
        timmer:'',
    };
  },
  computed: {
    minute: function() {
      return parseInt(this.currenttime / 60);
    },
    ten: function() {
      return parseInt(parseInt(this.currenttime % 60) / 10);
    },
    one: function() {
      return parseInt(parseInt(this.currenttime % 60) % 10);
    }
  },
  methods: {
    timedown() {
      if (this.pause || this.currenttime <= 0) return;
      this.$emit('down',this.currenttime-1)
      this.timmer=setTimeout(this.timedown, 1000);
    },
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
            if (!this.pause) this.timmer=setTimeout(this.timedown, 1000);
            else clearTimeout(this.timmer);
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
