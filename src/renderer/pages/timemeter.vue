<template>
  <div @dblclick="changeSize">
    <center>
      <img src="../assets/lm.png" id="lm" v-show="isleft&&!showmode&&showit" />
      <img src="../assets/rm.png" id="rm" v-show="!isleft&&!showmode&&showit" />
      <smalltime :currenttime="cachetime" id="smalltime" v-show="currentmode==2"></smalltime>
      <div id="tittle" ref="tittle" :style="showmode?'top:8vw;':'' ">
        <img @click="topre" src="../assets/lfs.png" />
        <h3>{{fomat[currentformat].name}}</h3>
        <img @click="tonext" src="../assets/rts.png" />
      </div>
      <div class="midcontent">
        <img class="tx" :src="leftimg" v-show="!showmode" />
        <countdown class="tm" :showmode="showmode" :pause="ispause" v-model="currenttime"></countdown>
        <img class="tx" :src="rightimg" v-show="!showmode" />
      </div>
      <br />
      <br />
      <div id="aspace">
        <span class="undbq" v-show="!hiddenbtn">正方</span>
        <span class="undbq" v-show="!hiddenbtn">反方</span>
      </div>
      <br />
      <br />
      <br />
      <br />
      <div>
        <div id="bspace">
          <button class="unbtn" v-show="!hiddenbtn" @click="pause_start" ref="pskey">开始/暂停</button>
          <button class="unbtn" v-show="!hiddenbtn" @click="tonext">下一环节</button>
        </div>
      </div>
    </center>
  </div>
</template>
<script>
import countdown from "../components/countdown.vue";
import smalltime from "../components/smalltime.vue";
import { isIPv4 } from "net";
import { setTimeout, clearTimeout } from "timers";
export default {
  data() {
    return {
      ipc: "",
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
      isleft: true,
      showmode: false,
      theSpeakertime: 0,
      showit: true,
      hiddenbtn: false,
      ihpos: 0,
      panwentimer: ""
    };
  },
  components: {
    countdown,
    smalltime
  },
  methods: {
    pause_start() {
      if (this.currentspeaker == 0) {
        alert("请选择发言人!");
        return;
      }
      this.ispause = !this.ispause;
    },
    doStatistic() {
      if (this.panwentimer) clearInterval(this.panwentimer);
      let tempstatic = {};
      let curtime = new Date();
      tempstatic.bgtime =
        curtime.getHours() +
        ":" +
        curtime.getMinutes() +
        ":" +
        curtime.getSeconds();
      console.log("tonhji:" + (this.theSpeakertime - this.currenttime));
      tempstatic.lasttime = this.theSpeakertime - this.currenttime;
      tempstatic.stage = this.currentformat;
      tempstatic.speaker = this.currentspeaker;
      this.$root.statistic.push(tempstatic);
    },
    topre() {
      if (this.fomat[this.currentformat].statistic && this.currentspeaker) {
        this.doStatistic();
      }
      if (this.currentformat == 0) {
        alert("已是第一个环节!");
        return;
      }
      this.currentspeaker = 0;
      this.currentformat--;
      this.ispause = true;
      this.showit = true;
      this.leftimg = this.$root.xiaohui[0];
      this.rightimg = this.$root.xiaohui[0]; //默认为校徽
      this.currentmode = this.fomat[this.currentformat].countmode;
      this.changespeaker(this.fomat[this.currentformat].person, true); //初始化默认发言人
      if (this.currentmode == 1) {
        this.currenttime = this.fomat[this.currentformat].time; //初始化计时
      } else {
        this.currenttime = this.fomat[this.currentformat].timel;
        this.cachetime = this.fomat[this.currentformat].timef;
      }
      if (this.fomat[this.currentformat].waitperson > 0) {
        this.leftimg = this.zhengimg[
          this.fomat[this.currentformat].waitperson - 1
        ];
      } else if (this.fomat[this.currentformat].waitperson < 0) {
        this.rightimg = this.fanimg[
          -this.fomat[this.currentformat].waitperson - 1
        ];
      }
      this.theSpeakertime = this.currenttime;
    },
    tonext() {
      if (this.fomat[this.currentformat].statistic && this.currentspeaker) {
        this.doStatistic();
      }
      if (this.currentformat >= this.fomat.length - 1) {
        this.$router.push("/statistic");
      }
      if (this.currentmode == 1) {
        this.$root.fomat[this.currentformat].time = this.currenttime;
      } else {
        if (this.currentspeaker > 0) {
          this.$root.fomat[this.currentformat].timel = this.currenttime;
          this.$root.fomat[this.currentformat].timef = this.cachetime;
        } else {
          this.$root.fomat[this.currentformat].timef = this.currenttime;
          this.$root.fomat[this.currentformat].timel = this.cachetime;
        }
      }
      this.currentspeaker = 0;
      this.currentformat++;
      this.ispause = true;
      this.showit = true;
      this.leftimg = this.$root.xiaohui[0];
      this.rightimg = this.$root.xiaohui[1]; //默认为校徽
      this.currentmode = this.fomat[this.currentformat].countmode;
      this.changespeaker(this.fomat[this.currentformat].person, true); //初始化默认发言人
      if (this.currentmode == 1) {
        this.currenttime = this.fomat[this.currentformat].time; //初始化计时
      } else {
        this.currenttime = this.fomat[this.currentformat].timel;
        this.cachetime = this.fomat[this.currentformat].timef;
      }
      if (this.fomat[this.currentformat].waitperson > 0) {
        this.leftimg = this.zhengimg[
          this.fomat[this.currentformat].waitperson - 1
        ];
      } else if (this.fomat[this.currentformat].waitperson < 0) {
        this.rightimg = this.fanimg[
          -this.fomat[this.currentformat].waitperson - 1
        ];
      }
      this.theSpeakertime = this.currenttime;
    },
    changespeaker(index, st) {
      this.showit = true;
      if (index == 0) {
        this.showit = false;
        return;
      }
      if (
        this.fomat[this.currentformat].statistic &&
        !st &&
        this.currentspeaker
      ) {
        this.doStatistic();
      }
      if (this.currentmode == 2 && this.currentspeaker * index < 0) {
        var t = this.currenttime;
        this.currenttime = this.cachetime;
        this.cachetime = t;
      }
      this.currentspeaker = index;
      if (this.fomat[this.currentformat].statistic) {
        this.theSpeakertime = this.currenttime;
        if (
          this.fomat[this.currentformat].name.match("盘问") &&
          this.currentspeaker * this.fomat[this.currentformat].person < 0
        ) {
          this.ispause = true;
          this.panwentimer = setInterval(() => {
            this.theSpeakertime += 0.01;
            console.log(this.theSpeakertime);
          }, 10);
        }
      }

      if (
        this.fomat[this.currentformat].name.match("盘问") &&
        this.currentspeaker * this.fomat[this.currentformat].person > 0 &&
        !st
      ) {
        this.ispause = false;
      }
      if (index > 0) {
        this.leftimg = this.zhengimg[index - 1];
        this.isleft = true;
      } else if (index < 0) {
        this.rightimg = this.fanimg[-index - 1];
        this.isleft = false;
      }
    },
    changeShowmode() {
      this.showmode = !this.showmode;
      if (this.$root.bgchanged) return;
      if (this.showmode) {
        document
          .querySelector("body")
          .setAttribute(
            "style",
            "background:url(static/bg1.svg);background-size:100%;background-repeat:no-repeat;font-family: Source Han Sans,Microsoft YaHei"
          );
      } else {
        document
          .querySelector("body")
          .setAttribute(
            "style",
            "background:url('static/bg.svg');background-size:100%;background-repeat:no-repeat;font-family: Source Han Sans,Microsoft YaHei"
          );
      }
    },
    changeSize() {
      console.log("change-win-size");
      this.ipc.send("change-win-size");
    }
  },
  watch: {},
  created() {
    this.ipc = require("electron").ipcRenderer;
    //快捷键
    document.onkeydown = e => {
      let key = window.event.keyCode;
      if (key == 80) {
        this.$refs.pskey.click();
      }
      if (key == 81) this.changespeaker(-1);
      if (key == 87) this.changespeaker(-2);
      if (key == 69) this.changespeaker(-3);
      if (key == 82) this.changespeaker(-4);
      if (key == 49) this.changespeaker(1);
      if (key == 50) this.changespeaker(2);
      if (key == 51) this.changespeaker(3);
      if (key == 52) this.changespeaker(4);
      if (key == 27) {
        if (confirm("确认退出？")) {
          this.ipc.send("window-close");
        }
      }
      if (key == 77) this.changeShowmode();
      if (key == 78) this.hiddenbtn = !this.hiddenbtn;
      if (key == 34) this.tonext();
      if (key == 33) this.topre();
      console.log(key);
    };
    this.fomat = this.$root.fomat;
    this.zhengimg = this.$root.zhengimg;
    this.fanimg = this.$root.fanimg;
    this.leftimg = this.$root.xiaohui[0];
    this.rightimg = this.$root.xiaohui[1]; //默认为校徽
    this.currentmode = this.fomat[this.currentformat].countmode; //初始化第一阶段模式
    this.changespeaker(this.fomat[this.currentformat].person, true); //初始化默认发言人
    if (this.currentmode == 1) {
      this.currenttime = this.fomat[this.currentformat].time; //初始化计时到第一阶段
    } else {
      this.currenttime = this.fomat[this.currentformat].timel;
      this.cachetime = this.fomat[this.currentformat].timef;
    }
    if (this.fomat[this.currentformat].waitperson > 0) {
      this.leftimg = this.zhengimg[
        this.fomat[this.currentformat].waitperson - 1
      ];
    }
    if (this.fomat[this.currentformat].waitperson < 0) {
      this.rightimg = this.fanimg[
        -this.fomat[this.currentformat].waitperson - 1
      ];
    }
    this.theSpeakertime = this.currenttime;
  },
  mounted() {
    this.ihpos =
      document.body.offsetWidth * 0.15 +
      this.$refs.tittle.offsetHeight -
      document.body.offsetHeight * 0.06;
  }
};
</script>
<style lang='less' scoped>
.maincontent {
  width: 100%;
}
.midcontent {
  position: absolute;
  top: 37vh;
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
#lm {
  position: absolute;
  left: 12vw;
  width: 5vw;
  top: 30vh;
}
#rm {
  position: absolute;
  right: 12vw;
  width: 5vw;
  top: 30vh;
}
#tittle {
  position: absolute;
  display: inline-block;
  left: 0;
  top: 22vh;
  font-size: 3vw;
  font-family: bdzy;
  width: 100%;
  color: #b43e34;
}
#tittle h3 {
  display: inline-block;
  font-size: 3vw;
}
#tittle img {
  vertical-align: middle;
  width: 2vw;
  margin-bottom: 1vh;
}
.undbq {
  display: inline-block;
  font-size: 2.2vw;
  background: rgba(158, 158, 158, 0.7);
  width: 10vw;
  margin: 0 19vw;
  padding-top: 0.8vh;
  padding-bottom: 0.8vh;
  border-radius: 2vw;
}
.unbtn {
  display: inline-block;
  font-size: 2vw;
  border: 0;
  outline: 0;
  background: rgba(158, 158, 158, 0.7);
  width: 15vw;
  padding-top: 0.8vw;
  margin: 0 16.5vw;
  padding-bottom: 0.8vw;
  border-radius: 2vw;
  font-family: bdzy;
}
#aspace {
  position: absolute;
  width: 100%;
  left: 0;
  top: 65vh;
}
#bspace {
  position: absolute;
  width: 100%;
  left: 0;
  top: 75vh;
}
span {
  font-family: bdzy;
}
#smalltime {
  position: absolute;
  width: 10vw;
  right: 10vw;
  top: 5vw;
}
</style>
