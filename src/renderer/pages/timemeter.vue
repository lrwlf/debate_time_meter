<template>
  <div>
        <audio ref='threet' src="static/threet.mp3">213</audio>
        <audio ref='five' src="static/five.mp3"></audio>
        <audio ref='end' src="static/end.mp3"></audio>
    <center>
      <img src="../assets/lm.png" id="lm" v-show="isleft&&!showmode&&showit">
      <img src="../assets/rm.png" id="rm" v-show="!isleft&&!showmode&&showit">
      <smalltime :currenttime="cachetime" id = 'smalltime' v-show="true"></smalltime>
      <div id="tittle" :style="showmode?'margin-top:10%;':'' ">
        <img @click="topre" src="../assets/lfs.png" ><h3>{{fomat[currentformat].name}}</h3><img @click="tonext" src="../assets/rts.png">
      </div>
      <div class="midcontent">
        <img class="tx" :src="leftimg" v-show="!showmode">
        <countdown class="tm" :showmode='showmode' :pause="ispause" v-model="currenttime" ></countdown>
        <img class="tx" :src="rightimg" v-show="!showmode">
      </div>
      <br><br>
      <span class='undbq' v-show='!hiddenbtn'>正方</span>
      <div id='aspace'></div>
      <span class='undbq' v-show='!hiddenbtn'>反方</span>
      <br><br><br><br>
      <div>
      <button class="unbtn" v-show='!hiddenbtn' @click="pause_start" ref="pskey">开始/暂停</button>
      <div id='bspace'></div>
      <button  class="unbtn" v-show='!hiddenbtn' @click="tonext">下一环节</button>
      </div>
    </center>
  </div>
</template>
<script>
import countdown from "../components/countdown.vue";
import smalltime from "../components/smalltime.vue";
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
      rightimg: "",
      zhengimg: [],
      fanimg: [],
      cachetime: 0,
      isleft:true,
      showmode:false,
      theSpeakertime:0,
      showit:true,
      hiddenbtn:false,
    };
  },
  components: {
    countdown,
    smalltime,
  },
  methods: {
    pause_start() {
      if(this.currentspeaker==0){
        alert("请选择发言人!")
        return;
      }
      this.ispause = !this.ispause;
    },
    topre(){
      if(this.fomat[this.currentformat].statistic&&this.currentspeaker){
        this.$root.statistic[this.currentformat][this.currentspeaker>0?this.currentspeaker-1:-this.currentspeaker+3].times++;
        this.$root.statistic[this.currentformat][this.currentspeaker>0?this.currentspeaker-1:-this.currentspeaker+3].time+=this.theSpeakertime-this.currenttime;
      }
      if(this.currentformat==0)
      {
        alert("已是第一个环节!")
        return;
      }
      this.currentspeaker=0;
      this.currentformat--;
      this.ispause = true;
      this.showit = true;
      this.leftimg = this.$root.xiaohui[0];
      this.rightimg = this.$root.xiaohui[0];//默认为校徽
      this.currentmode = this.fomat[this.currentformat].countmode;
      this.changespeaker(this.fomat[this.currentformat].person,true); //初始化默认发言人
      if(this.currentmode ==1){
          this.currenttime = this.fomat[this.currentformat].time; //初始化计时
       }
      else{
        this.currenttime = this.fomat[this.currentformat].timel;
        this.cachetime = this.fomat[this.currentformat].timef;
      }
      if (this.fomat[this.currentformat].waitperson > 0) {this.leftimg = this.zhengimg[this.fomat[this.currentformat].waitperson - 1]}
      else if (this.fomat[this.currentformat].waitperson < 0) {this.rightimg = this.fanimg[-this.fomat[this.currentformat].waitperson - 1]}
      this.theSpeakertime=this.currenttime;

    },
    tonext() {
     if(this.fomat[this.currentformat].statistic&&this.currentspeaker){
        this.$root.statistic[this.currentformat][this.currentspeaker>0?this.currentspeaker-1:-this.currentspeaker+3].times++;
        this.$root.statistic[this.currentformat][this.currentspeaker>0?this.currentspeaker-1:-this.currentspeaker+3].time+=this.theSpeakertime-this.currenttime;
      }
      if (this.currentformat >= this.fomat.length - 1) {
        if (confirm("已是最后一个环节，是否查看统计结果？")) 
        {
          this.ipc.send('reNomalsize');
          this.$router.push('/statistic');
        }
        return;
      }
      if(this.currentmode==1)
      {
        this.$root.fomat[this.currentformat].time = this.currenttime;
      }
      else{
          if(this.currentspeaker>0){
            this.$root.fomat[this.currentformat].timel = this.currenttime;
            this.$root.fomat[this.currentformat].timef = this.cachetime;
          }
          else{
            this.$root.fomat[this.currentformat].timef = this.currenttime;
            this.$root.fomat[this.currentformat].timel = this.cachetime;
          }
      }
      this.currentspeaker=0;
      this.currentformat++;
      this.ispause = true;
      this.showit = true;
      this.leftimg = this.$root.xiaohui[0];
      this.rightimg = this.$root.xiaohui[1];//默认为校徽
      this.currentmode = this.fomat[this.currentformat].countmode;
      this.changespeaker(this.fomat[this.currentformat].person,true); //初始化默认发言人
      if(this.currentmode ==1){
          this.currenttime = this.fomat[this.currentformat].time; //初始化计时
       }
      else{
        this.currenttime = this.fomat[this.currentformat].timel;
        this.cachetime = this.fomat[this.currentformat].timef;
      }
      if (this.fomat[this.currentformat].waitperson > 0) {this.leftimg = this.zhengimg[this.fomat[this.currentformat].waitperson - 1]}
      else if (this.fomat[this.currentformat].waitperson < 0) {this.rightimg = this.fanimg[-this.fomat[this.currentformat].waitperson - 1]}
      this.theSpeakertime=this.currenttime;

    },
    changespeaker(index,st) {
      this.showit = true;
      if(index==0){
        this.showit = false;
        return;
      }
      if(this.fomat[this.currentformat].statistic&&!st&&this.currentspeaker){
        this.$root.statistic[this.currentformat][this.currentspeaker>0?this.currentspeaker-1:-this.currentspeaker+3].times++;
        this.$root.statistic[this.currentformat][this.currentspeaker>0?this.currentspeaker-1:-this.currentspeaker+3].time+=this.theSpeakertime-this.currenttime;
      }
      if (this.currentmode == 2 && this.currentspeaker * index < 0) {
        var t = this.currenttime;
        this.currenttime = this.cachetime;
        this.cachetime = t;
      }
      if(this.fomat[this.currentformat].statistic) this.theSpeakertime=this.currenttime;
      this.currentspeaker = index;
      if (index > 0) {this.leftimg = this.zhengimg[index - 1];this.isleft=true;}
      else if (index < 0) {this.rightimg = this.fanimg[-index - 1];this.isleft=false;}
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
  watch:{
    currenttime(){
      if(this.currenttime==30){ //延迟
        this.$refs.threet.play();
      }
      else if(this.currenttime==5){
        this.$refs.five.play();
      }
      else if(this.currenttime==0){
        this.$refs.end.play();
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
      if(key == 78) this.hiddenbtn=!this.hiddenbtn;
      if(key==34) this.tonext();
      if(key==33) this.topre();
      console.log(key);
    };
    this.fomat = this.$root.fomat;
    this.zhengimg = this.$root.zhengimg;
    this.fanimg = this.$root.fanimg;
    this.leftimg = this.$root.xiaohui[0];
    this.rightimg = this.$root.xiaohui[1];//默认为校徽
    this.currentmode = this.fomat[this.currentformat].countmode; //初始化第一阶段模式
    this.changespeaker(this.fomat[this.currentformat].person,true); //初始化默认发言人
    if(this.currentmode ==1){
      this.currenttime = this.fomat[this.currentformat].time; //初始化计时到第一阶段
    }
    else{
      this.currenttime = this.fomat[this.currentformat].timel;
      this.cachetime = this.fomat[this.currentformat].timef;
    }
    if (this.fomat[this.currentformat].waitperson > 0) {this.leftimg = this.zhengimg[this.fomat[this.currentformat].waitperson - 1]}
    if (this.fomat[this.currentformat].waitperson < 0) {this.rightimg = this.fanimg[-this.fomat[this.currentformat].waitperson - 1]}
    this.theSpeakertime=this.currenttime;
  }
};
</script>
<style scoped>
.maincontent{
  width: 100%;
}
.tx {
  display: inline-block;
  width: 12%;
  height: 12%;
  border-radius: 50%; 
}
.tm {
  display: inline-block;
  width: 50%;
}
#lm{
  position: absolute;
  left: 13%;
  top:34%;
  width: 5%;
  }
#rm{
  position: absolute;
  right: 13%;
  top:34%;
  width: 5%;
}
#tittle {
  display: inline-block;
  margin-top: 15%;
  font-size: 2em;
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
  font-size: 1.5em;
  background: rgba(158, 158, 158, 0.7);
  width: 5%;
  padding-top:0.8%;
  padding-bottom: 0.8%; 
  border-radius: 2em;
}
.unbtn{
  display: inline-block;
  font-size: 1.5em;
  border: 0;
  outline: 0;  
  background: rgba(158, 158, 158, 0.7);
  width: 9%;
  padding-top:0.8%;
  padding-bottom: 0.8%; 
  border-radius: 2em;
  font-family: bdzy;
}
#aspace{
  display: inline-block;
  width: 57%;
}
#bspace{
  display: inline-block;
  width: 53%;
}
span{
  font-family: bdzy;
}
#smalltime{
  position: absolute;
  width: 10%;
  right: 14%;
  bottom: 5%;

}
</style>
