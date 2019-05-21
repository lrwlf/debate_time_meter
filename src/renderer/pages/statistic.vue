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
            ord:['正方一辩','正方二辩','正方三辩','正方四辩','反方一辩','反方二辩','反方三辩','反方四辩'],
        }
    },
    methods: {
        save_as_txt(){
            this.fs.writeFileSync('static/log.txt', '\ufeff'); // utf-8 with bom
            this.fs.appendFileSync("static/log.txt",this.data);
        }
    },
    created(){
        
        this.fs = require("fs")
        this.ipc = require('electron').ipcRenderer;
        this.ipc.on('select_path',(event,path)=>{
            console.log(path);
        })
        for(let i = 0;i<this.$root.statistic.length;++i){
            if(!this.$root.fomat[i].statistic)
                continue;
            this.data+= '-------'+this.$root.fomat[i].name+'--------\n';
            for(let j = 0;j<this.$root.statistic[i].length;++j){
                if(this.$root.statistic[i][j].times){
                    this.data +=this.ord[j]+'发言'+this.$root.statistic[i][j].times+'次, 发言时间'+this.$root.statistic[i][j].time+'秒,\n'
                }
            }
        };
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
