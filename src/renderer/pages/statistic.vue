<template>
    <div id="aside" @dblclick='changeSize'>
        <div class="xhside">
        <img class="xhimg" :src="xiaohui[0]" >
        <span class='undbq'>正方</span>
        <span class="topic">{{topicz}}</span>
        </div><div class="xhside">
        <img class="xhimg" :src="xiaohui[1]" >
        <span class='undbq'> 反方</span>
        <span class="topic">{{topicf}}</span>
        <a href="javascript:void(0)"  @click="save_as_txt">导出统计结果</a>
        </div>
        
    </div>
</template>

<script>
export default {
    data(){
        return{
            data:'',
            fs:'',
            ipc:'',
            stat_stagels:[],
            xiaohui:[],
            topicz:'',
            topicf:'',
        }
    },
    methods: {
        save_as_txt(){
            this.ipc.send("save_csv_file", this.data);
        },
        changeSize(){
            console.log('change-win-size')
            this.ipc.send('change-win-size')
        },
        toSpname(index){
            let ord=['正方一辩','正方二辩','正方三辩','正方四辩','反方一辩','反方二辩','反方三辩','反方四辩'];
            if(index>0){
                return ord[index-1];
            }
            else{
                return ord[-index+3];
            }

        },
        toStagename(index){
            return this.$root.fomat[index].name;
        },
        countres(speaker,stage){
            let res = {
                time:0,
                times:0,
            }
            this.$root.statistic.forEach(item => {
                if((!stage||item.stage==stage)&&item.speaker==speaker){
                    res.time+=item.lasttime;
                    res.times+=1;
                } 
            });
            return res;
        }
    },
    created(){
        
        this.fs = require("fs");
        this.ipc = require('electron').ipcRenderer;
        this.ipc.on('select_path',(event,path)=>{
            console.log(path);
        })
        this.data+="全场流程:\n开始时间,发言人,发言时间(秒),所在环节\n";
        this.$root.statistic.forEach(item => {
            this.data+=item.bgtime+',';
            this.data+=this.toSpname(item.speaker)+',';
            this.data+=item.lasttime.toFixed(1)+',';
            this.data+=this.toStagename(item.stage)+',';    
            this.data+='\n';
            if(this.stat_stagels.indexOf(item.stage)==-1)
                this.stat_stagels.push(item.stage);
            
        });
        this.stat_stagels.forEach(index=>{
            this.data+=this.toStagename(index)+":\n发言人,发言总时间(秒),发言次数,平均发言时间\n";
            for (let i = 0; i < 8; i++) {
                let speaker = i<4?i+1:3-i;
                let res = this.countres(speaker,index);
                this.data+=this.toSpname(speaker)+','+res.time.toFixed(1)+','+res.times.toFixed(1)+','+(res.time/res.times).toFixed(1)+',\n';
            }
        });
        this.data+="全场统计:\n发言人,发言总时间(秒),发言次数,平均发言时间\n";
            for (let i = 0; i < 8; i++) {
                let speaker = i<4?i+1:3-i;
                let res = this.countres(speaker);
                this.data+=this.toSpname(speaker)+','+res.time.toFixed(1)+','+res.times.toFixed(1)+','+(res.time/res.times).toFixed(1)+',\n';
            }



        this.xiaohui = this.$root.xiaohui;
        this.topicz = this.$root.topicz;
        this.topicf = this.$root.topicf;
        document.onkeydown = e => {
            let key = window.event.keyCode;
            if (key == 27||key==13) {
                if (confirm("确认退出？")) {
                    this.ipc.send('window-close');
                }
            }
            console.log(key)

        }
    }
}
</script>
<style scoped>

.xhside{
    display: inline-block;
    width: 50%;
    text-align: center;
}
.xhimg{
  width: 25%;
  height: 25%;
  border-radius: 50%; 
  display: block;
  margin: 0 auto;
  margin-top: 30%;

}
.undbq{
  display: inline-block;
  font-size: 2.2vw;
  background: rgba(158, 158, 158, 0.7);
  width: 10vw;
  margin: 10vh 19vw 0 19vw;
  padding-top:0.8vh;
  padding-bottom: 0.8vh; 
  border-radius: 2vw;
  font-family: bdzy;
}
.topic{
  display: block;
  font-size: 2.2vw;
  background: rgba(158, 158, 158, 0.7);
  padding-top:1%;
  padding-bottom: 1%; 
  padding-left: 5%;
  padding-right: 5%;
  border-radius: 2em;
  width: max-content;
  margin: auto;
  margin-top: 5vh;
}
.xhside a{
    position: absolute;
    display: block;
    outline: 0;
    border: 0;
    text-decoration:none;
    color: black;
    font-size: 1.5vw;
    background: rgba(158, 158, 158, 0.7);
    padding-top:0.8vw;
    padding-bottom: 0.8vw; 
    padding-left: 2vw;
    padding-right: 2vw;
    border-radius: 2vw;
    bottom: -18vh;
    right: 5vw;
    
}
</style>
