<template>
  <div @contextmenu.prevent="showRightMenu" class="bodermenu" @click="LshowRightMenu">
    <div class="aside">
      <span>正方</span>
      <input type="text" placeholder="请输入正方名称">
      <input type="text" v-model="topicz" placeholder="请输入正方观点">
    </div><div class="aside">
      <span>反方</span>
      <input type="text" placeholder="请输入反方名称">
      <input type="text" v-model="topicf" placeholder="请输入反方观点">
    </div>
    <button id="startdebate" @click="startdebate">开始辩论</button>
    <ul
      class="contextmenu"
      v-bind:style="{left: getMenuLeft+'px',top: getMenuTop+'px'}"
      v-show="menuShow"
    >
      <li v-on:click="toimgpages">修改配置</li>
      <li v-on:click="tofomat">自定义赛制</li>
    </ul>
  </div>
</template>
<script>
export default {
  data() {
    return {
      input: "",
      ipc: '',
      menuShow: false,
      menuLeft: 0,
      menuTop: 0,
      topicz: "",
      topicf: ""
    };
  },
  methods: {
    toimgpages() {
      this.$router.push("loadimg");
    },
    tofomat(){
      this.$router.push("fomatpage");
    },
    startdebate() {
      this.$root.topicz = this.topicz;
      this.$root.topicf = this.topicf;
      this.ipc.send("window-max");
      this.$router.push('/showpage')
    },
    showRightMenu(e) {
      if (this.menuShow == false) this.menuShow = true;
      else this.menuShow = false;
      this.menuLeft = e.offsetX;
      this.menuTop = e.offsetY;
    },
    LshowRightMenu(e) {
      this.menuShow = false;
    }
  },
  computed: {
    getMenuLeft: function(e) {
      return this.menuLeft;
    },
    getMenuTop: function(e) {
      return this.menuTop;
    }
  },
  created() {
    this.ipc = require("electron").ipcRenderer;
    // var startDate ='2019-06-10 00:00:00';
    // startDate= startDate.replace(new RegExp("-","gm"),"/");
    // var startDateM = (new Date(startDate)).getTime(); //得到毫秒数
    // var myDate = new Date();
    // console.log(myDate.getTime(),startDateM)
    // if(myDate.getTime()>=startDateM){
    //     alert('试用期已过，请联系开发人员！')
    //     this.ipc.send('window-close');
    //   }
    }
};
</script>
<style scoped>
.aside input {
  background-color: rgba(184, 184, 184, 0.7);
  width: 80%;
  height: 50px;
  border-radius: 9px;
  border: none;
  font-size: 20px;
  outline: none;
  color: black;
  margin-top: 50px;
  text-align: center;
  font-family: bdzy;
}
.aside {
  width: 50%;
  height: 70%;
  display: inline-block;
  text-align: center;
  margin-top: 10%;
}
.aside span {
  display: inline-block;
  font-size: 25px;
  color:#575555;
  width: 100%;
}
#startdebate {
  width: 120px;
  height: 120px;
  display: block;
  background-color: rgba(184, 184, 184, 0.7);
  border-radius: 50%;
  border: none;
  outline: none;
  margin: 0 auto;
  margin-top: 30px;
  font-family: bdzy;
  color: #c15239;
  font-size: 25px;
}
.contextmenu {
  margin: 0;
  background: #fff;
  width: 135px;
  z-index: 100;
  position: absolute;
  list-style-type: none;
  padding: 5px 0;
  border-radius: 4px;
  font-size: 12px;
  font-weight: 400;
  color: #333;
  box-shadow: 1px 1px 1px 1px rgba(0, 0, 0, 0.3);
}
.contextmenu li {
  margin: 0;
  padding: 7px 16px;
  cursor: pointer;
}
.contextmenu li:hover {
  background: #eee;
}
.bordermenu {
  width: 100%;
  height: 100%;
}
</style>    