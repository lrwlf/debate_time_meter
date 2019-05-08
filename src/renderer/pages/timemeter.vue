<template>
    <div>
        <countdown :pause='ispause' v-model='currenttime' @down='out'></countdown>
        <button @click="pause_start">开始/暂停</button>
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
        }
    },
    created(){
        this.ipc = require('electron').ipcRenderer;
        this.ipc.send('window-max');

    }
}
</script>