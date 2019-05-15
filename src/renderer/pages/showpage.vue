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
              console.log(this.$root.topicz);
        this.topicz = this.$root.topicz;
        this.topicf = this.$root.topicf;
        document.onkeydown = e => {
            let key = window.event.keyCode;
            if(key==13) this.nextpage();
            if (key == 27) {if (confirm("确认退出？")) {this.$router.push('/');this.ipc.send('reNomalsize');}
      }
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
  top: 300px;
  position: relative;
  width: 250px;
  border-radius: 50%; 
  display: block;
  margin: 0 auto;
}
.undbq{
  display: inline-block;
  font-size: 30px;
  background: rgba(158, 158, 158, 0.7);
  padding: 20px;
  padding-left: 30px;
  padding-right: 30px;
  border-radius: 50px;
  top: 420px;
  position: relative;
}
.topic{
  display: block;
  font-size: 30px;
  background: rgba(158, 158, 158, 0.7);
  padding: 20px;
  padding-left: 30px;
  padding-right: 30px;
  border-radius: 50px;
  width: 40%;
  margin: auto;
  top: 460px;
  position: relative;
}
</style>
