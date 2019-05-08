<template>
  <div>
    <div class="num">
      <img :src="topath(minute)">
    </div>
    <div class="num" id = 'split'>
      <img src="static/split.png">
    </div>
    <div class="num">
      <img :src="topath(ten)">
    </div>
    <div class="num">
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
  },
  watch:{
      pause:function(){
            if (!this.pause) this.timedown();
            else clearTimeout(this.timmer);
      }
  },
  created() {

  }
};
</script>
<style scoped>
.num {
  display: inline-block;
  width: 280px;
  height: 280px;
  text-align: center;
}
.num img{
    height: 100%;
}
#split{
    width: 100px;
}
#split img{
    height: 80%;
    margin-bottom: 20px;

}
</style>
