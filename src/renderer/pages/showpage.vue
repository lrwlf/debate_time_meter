<template>
    <div>
        <div class="xhside">
        <img class="xhimg" :src="xiaohui[0]" >
        <span class='undbq'>正方</span>
        <span class="topic">{{topicz}}</span>
        </div><div class="xhside">
        <img class="xhimg" :src="xiaohui[1]" >
        <span class='undbq'> 反方</span>
        <span class="topic">{{topicf}}</span>
        </div>
        <audio ref='threet' src="static/threet.mp3"></audio>
        <audio ref='five' src="static/five.mp3"></audio>
        <audio ref='end' src="static/end.mp3"></audio>
    </div>
</template>
<script>
export default {
    data(){
        return{
            ipc: require("electron").ipcRenderer,
            xiaohui:[],
            topicz:'',
            topicf:'',
        }
    },
    methods:{
        nextpage(){
            this.$router.push('/timemeter');
        }
    },
    created(){
        this.xiaohui = this.$root.xiaohui;
        this.topicz = this.$root.topicz;
        this.topicf = this.$root.topicf;
        document.onkeydown = e => {
            let key = window.event.keyCode;
            if(key==13) this.nextpage();
            if (key == 27) {
                if (confirm("确认退出？")) {
                    this.ipc.send('window-close');
                }
            }
            if(key==88){this.$refs.five.play()}
            if(key==90){this.$refs.threet.play()}
            if(key==67){this.$refs.end.play()}
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
  font-size: 30px;
  background: rgba(158, 158, 158, 0.7);
  width: 12%;
  padding-top:1%;
  padding-bottom: 1%; 
  border-radius: 2em;
  margin-top:10%;

  }
.topic{
  display: block;
  font-size: 30px;
  background: rgba(158, 158, 158, 0.7);
  padding-top:1%;
  padding-bottom: 1%; 
  padding-left: 5%;
  padding-right: 5%;
  
  border-radius: 2em;
  width: max-content;
  margin: auto;
  margin-top: 5%;
}
</style>
