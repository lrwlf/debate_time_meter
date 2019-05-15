<template>
  <div>
    <center>
      <img src="../assets/lm.png" id="lm" v-show="isleft&&!showmode">
      <img src="../assets/rm.png" id="rm" v-show="!isleft&&!showmode">

      <div id="tittle" :style="showmode?'margin-top:10%;':'' ">
        <img src="../assets/lfs.png" ><h3>{{fomat[currentformat].name}}</h3><img src="../assets/rts.png">
      </div>
      <div class="midcontent">
        <img class="tx" :src="leftimg" v-show="!showmode">
        <countdown class="tm" :showmode='showmode' :pause="ispause" v-model="currenttime" ></countdown>
        <img class="tx" :src="rightimg" v-show="!showmode">
      </div>
      <span class='undbq'>正方</span>
      <div id='aspace'></div>
      <span class='undbq'>反方</span>
      <br><br><br><br>
      <div>
      <button class="unbtn" @click="pause_start" ref="pskey">开始/暂停</button>
      <div id='bspace'></div>
      <button  class="unbtn" @click="tonext">下一环节</button>
      </div>
    </center>
  </div>
</template>
<script>
import countdown from "../components/countdown.vue";
import { isIPv4 } from "net";
export default {
  data() {
    return {
      ipc: '',
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
      cachetime: 0,
      isleft:true,
      showmode:false,
      theSpeakertime:0,
      ashujv:[{time:0,times:0},{time:0,times:0},{time:0,times:0},{time:0,times:0},{time:0,times:0},{time:0,times:0},{time:0,times:0},{time:0,times:0},],
    };
  },
  components: {
    countdown
  },
  methods: {
    pause_start() {
      this.ispause = !this.ispause;
    },
    tonext() {
      if(this.fomat[this.currentformat].statictis) {  
        //是否统计
        this.$root.statictis.push({name:this.fomat[this.currentformat].name,data:this.ashujv});
        this.resetshujv(); 
      }
      if (this.currentformat >= this.fomat.length - 1) {
        if (confirm("已是最后一个环节，是否查看统计结果？")) 
        {
          this.ipc.send('reNomalsize');
          this.$router.push('/statictis');
        }
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
    resetshujv(){
      this.ashujv=[{time:0,times:0},{time:0,times:0},{time:0,times:0},{time:0,times:0},{time:0,times:0},{time:0,times:0},{time:0,times:0},{time:0,times:0},];
    },
    changespeaker(index) {
      if(this.fomat[this.currentformat].statictis) {  
        this.ashujv[this.currentspeaker>0?this.currentspeaker-1:-this.currentspeaker+3].times++;
        this.ashujv[this.currentspeaker>0?this.currentspeaker-1:-this.currentspeaker+3].time+= this.theSpeakertime-this.currenttime;
        this.theSpeakertime=this.currenttime;
      }
      if (this.currentmode == 2 && this.currentspeaker * index < 0) {
        var t = this.currenttime;
        this.currenttime = this.cachetime;
        this.cachetime = t;
        if(this.fomat[this.currentformat].statictis) this.theSpeakertime=this.currenttime;
      }
      this.currentspeaker = index;
      if (index > 0) {this.leftimg = this.zhengimg[index - 1];this.isleft=true;}
      if (index < 0) {this.rigthimg = this.fanimg[-index - 1];this.isleft=false;}
    },
    changeShowmode(){
      this.showmode = !this.showmode;
      if(this.$root.bgchanged)
        return;
      if(this.showmode){
          document
        .querySelector("body")
        .setAttribute(
          "style",
          "background:url(static/bg1.svg);background-size:cover;background-repeat:no-repeat;font-family: Source Han Sans,Microsoft YaHei"
        );
      }
      else{
          document
        .querySelector("body")
        .setAttribute(
          "style",
          "background:url('static/bg.svg');background-size:cover;background-repeat:no-repeat;font-family: Source Han Sans,Microsoft YaHei"
        );
      }
    }
  },
  created() {
    this.ipc=require("electron").ipcRenderer;
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
        if (confirm("确认退出？")) {this.ipc.send('window-close');}
      }
      if(key == 77) this.changeShowmode();
      if(key==13) this.tonext();
    };
    this.fomat = this.$root.fomat;
    this.currenttime = this.fomat[this.currentformat].time; //初始化计时到第一阶段
    this.currentspeaker = this.fomat[this.currentformat].person; //初始化默认发言人
    this.currentmode = this.fomat[this.currentformat].countmode; //初始化第一阶段模式
    this.zhengimg = this.$root.zhengimg;
    this.fanimg = this.$root.fanimg;
    this.leftimg = this.zhengimg[0];
    this.rightimg = this.fanimg[0];
    this.theSpeakertime=this.fomat[this.currentformat].time;
  }
};
</script>
<style scoped>
.tx {
  display: inline-block;
  width: 13%;
  border-radius: 50%; 
}
.tm {
  display: inline-block;
  margin-left: 6.5%;
  margin-right: 6.5%;
}
#lm{
  position: absolute;
  left: 7%;
  top:32%;
  }
#rm{
  position: absolute;
  right: 7%;
  top:32%;
}
#tittle {
  display: inline-block;
  margin-top: 15%;
  font-size: 35px;
  font-family: bdzy;
  width:100%;
  color: #b43e34;
}
#tittle h3{
  display: inline-block;
}
#tittle img{
  vertical-align:middle;
  margin-top: -0.8%;
}
.undbq{
  display: inline-block;
  font-size: 30px;
  background: rgba(158, 158, 158, 0.7);
  padding: 20px;
  padding-left: 30px;
  padding-right: 30px;
  border-radius: 50px;
}
.unbtn{
  display: inline-block;
  font-size: 30px;
  border: 0;
  outline: 0;  
  background: rgba(158, 158, 158, 0.7);
  padding: 20px;
  padding-left: 30px;
  padding-right: 30px;
  border-radius: 50px;
  font-family: bdzy;
}
#aspace{
  display: inline-block;
  width: 65%;
}
#bspace{
  display: inline-block;
  width: 61%;
}
span{
  font-family: bdzy;
}
</style>
