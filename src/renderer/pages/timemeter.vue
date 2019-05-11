<template>
    <div>
        <h3>{{fomat[currentformat].name}}</h3>
        <countdown :pause='ispause' v-model='currenttime' @down='out'></countdown>
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
    }
}
</script>