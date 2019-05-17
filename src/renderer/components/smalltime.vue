<template>
  <div>
    <div class="num">
      <img :src="topath(minute)">
    </div>
    <div class="num" id = 'split' >
      <img src="static/split.png">
    </div>
    <div class="num" >
      <img :src="topath(ten)">
    </div>
    <div class="num" >
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
    topath(num) {
      return "static/" + num + ".png";
    }
  },
  props:{
      currenttime:Number,
  },
  created() {
  }
};
</script>
<style scoped>
.num {
  display: inline-block;
  width: 50px;
  height: 50px;
  text-align: center;
}
#bnum {
  display: inline-block;
  width: 60px;
  height: 60px;
  text-align: center;
}
.num img{
    height: 100%;
}
#split{
    width: 10px;
}
#split img{
    height: 80%;
    margin-bottom: 2px;

}
</style>
