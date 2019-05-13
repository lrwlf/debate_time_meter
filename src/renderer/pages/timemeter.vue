<template>
    <div>
        <h3>{{fomat[currentformat].name}}</h3>
        <div class="midcontent">
        <img  class="tx" :src="leftimg">
        <countdown class="tm" :pause='ispause' v-model='currenttime' @down='out'></countdown>
        <img class="tx" :src="rightimg">
        </div>
        <button @click="pause_start" ref='pskey' >开始/暂停</button>
        <button @click="tonext">nextformat</button>
        <input type="text"  v-model="currenttime">
    </div>
</template>
<script>
import countdown from '../components/countdown.vue'
export default {
    data(){
        return{
            ipc : '',
            currenttime:65,
            ispause:true,
            fomat:'',
            currentformat:0,
            currentspeaker:0,
            currentmode:'',
            leftimg:'',
            rigthimg:'',
            zhengimg:[],
            fanimg:[],
        }
    },
    components:{
        countdown,
    },
    methods:{
        pause_start(){
            this.ispause=!this.ispause;
        },
        out(){
            console.log(this.currenttime);
        },
        tonext(){
            this.currentformat++;
            this.currenttime=this.fomat[this.currentformat].time;
            this.currentspeaker=this.fomat[this.currentformat].person;
            this.currentmode=this.fomat[this.currentformat].mode
            this.ispause = true;

        }   
        },
    created(){
        this.ipc = require('electron').ipcRenderer;
        this.ipc.send('window-max');
        //快捷键
        document.onkeydown =(e)=>{
            let key = window.event.keyCode;
            console.log(this.$refs.pskey)
            if (key == 80) {
                this.$refs.pskey.click();
            }
        };
        this.fomat = this.$root.fomat;
        this.currenttime=this.fomat[this.currentformat].time; //初始化计时到第一阶段
        this.currentspeaker=this.fomat[this.currentformat].person;  //初始化默认发言人
        this.currentmode=this.fomat[this.currentformat].mode //初始化第一阶段模式
        this.zhengimg=this.$root.zhengimg;
        this.fanimg=this.$root.fanimg;
        this.leftimg=this.zhengimg[0];
        this.rightimg=this.fanimg[0];
    }
}
</script>
<style scoped>
.tx{
    display: inline-block;
    width: 200px;
    border-radius: 50%;
}
.tm{
    display: inline-block;
}
</style>
