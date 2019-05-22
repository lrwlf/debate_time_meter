<template>
    <div id="aside">
        <textarea :value="data" id="data"></textarea>
        <a href="static/log.txt"  download = "file.csv" ref="download_file">另存为</a>
        
        
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
        }
    },
    methods: {
        save_as_txt(){
            this.fs.writeFileSync('static/log.txt', '\ufeff'); // utf-8 with bom
            this.fs.appendFileSync("static/log.txt",this.data);
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
        
        this.fs = require("fs")
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
        this.save_as_txt();
    }
}
</script>
<style scoped>
#data{
    width:900px;
    height: 450px;
}
.aside button {
  display: inline-block;
  background-color: rgba(184, 184, 184, 0.7);
  width: 30%;
  height: 50px;
  border-radius: 9px;
  border: none;
  font-size: 20px;
  outline: none;
  color: black;
  margin-top: 50px;
  text-align: center;
  font-family: bdzy;
  margin-left:10%;
  margin-right:5%;
}
</style>
