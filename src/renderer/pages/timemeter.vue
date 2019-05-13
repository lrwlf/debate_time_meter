<template>
  <div>
    <center>
    <div id="tittle">
      <h3>&lt;{{fomat[currentformat].name}}></h3>
    </div>
    <div class="midcontent">
      <img class="tx" :src="leftimg">
      <countdown class="tm" :pause="ispause" v-model="currenttime" @down="out"></countdown>
      <img class="tx" :src="rightimg">
    </div>
    <button @click="pause_start" ref="pskey">开始/暂停</button>
    <button @click="tonext">nextformat</button>
    <input type="text" v-model="currenttime">
    <button @click="reback">返回</button>
     </center>
  </div>
</template>
<script>
import countdown from "../components/countdown.vue";
import { isIPv4 } from "net";
export default {
  data() {
    return {
      ipc: require("electron").ipcRenderer,
      currenttime: 65,
      ispause: true,
      fomat: "",
      currentformat: 0,
      currentspeaker: 0,
      currentmode: "",
      leftimg: "",
      rigthimg: "",
      zhengimg: [],
      fanimg: [],
      cachetime: 0
    };
  },
  components: {
    countdown
  },
  methods: {
    pause_start() {
      this.ispause = !this.ispause;
    },
    out() {
      console.log(this.currenttime);
    },
    tonext() {
      if (this.currentformat >= this.fomat.length - 1) {
        alert("已是最后一个环节!");
        return;
      }
      this.currentformat++;
      this.currenttime = this.fomat[this.currentformat].time;
      this.currentspeaker = this.fomat[this.currentformat].person;
      this.currentmode = this.fomat[this.currentformat].countmode;
      this.ispause = true;
      if (this.currentmode == 2) {
        this.cachetime = this.fomat[this.currentformat].time;
      }
    },
    changespeaker(index) {
      if (this.currentmode == 2 && this.currentspeaker * index < 0) {
        var t = this.currenttime;
        this.currenttime = this.cachetime;
        this.cachetime = t;
      }
      this.currentspeaker = index;
      if (index > 0) this.leftimg = this.zhengimg[index - 1];
      if (index < 0) this.rigthimg = this.fanimg[-index - 1];
    },
    reback() {
      this.$router.push("/");
    }
  },
  created() {
    //快捷键
    document.onkeydown = e => {
      let key = window.event.keyCode;
      if (key == 80) {
        this.$refs.pskey.click();
      }
      if (key == 112) this.changespeaker(-1);
      if (key == 113) this.changespeaker(-2);
      if (key == 114) this.changespeaker(-3);
      if (key == 115) this.changespeaker(-4);
      if (key == 49) this.changespeaker(1);
      if (key == 50) this.changespeaker(2);
      if (key == 51) this.changespeaker(3);
      if (key == 52) this.changespeaker(4);
      if (key == 27) {
        if(confirm("确认退出？"))
          this.ipc.send("newWindow-closed")};
    };
    this.fomat = this.$root.fomat;
    this.currenttime = this.fomat[this.currentformat].time; //初始化计时到第一阶段
    this.currentspeaker = this.fomat[this.currentformat].person; //初始化默认发言人
    this.currentmode = this.fomat[this.currentformat].countmode; //初始化第一阶段模式
    this.zhengimg = this.$root.zhengimg;
    this.fanimg = this.$root.fanimg;
    this.leftimg = this.zhengimg[0];
    this.rightimg = this.fanimg[0];
  }
};
</script>
<style scoped>
.tx {
  display: inline-block;
  width: 300px;
  border-radius: 50%;
}
.tm {
  display: inline-block;
}

#tittle{
margin-top:300px;
margin-bottom:50px;
font-size:30px;
font-family: 'Source Han Sans CN', 'Microsoft YaHei';


}
</style>
