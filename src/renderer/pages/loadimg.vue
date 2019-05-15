<template>
    <div>
        <img :src="xiaohui[0]" @click="loadzheng(100)">
        <img v-for="(item,index) in zhengimg" @click="loadzheng(index)" :key="item.id" :src="zhengimg[index]" > 
        <br>

        <img :src="xiaohui[1]" @click="loadfan(200)"> 
        <img v-for="(item,index) in fanimg" @click="loadfan(index+4)" :key="item.id" :src="fanimg[index]" >
        
        <button @click="change_background">修改背景图片</button>
        <button @click="reindex">返回主界面</button>
    </div>
</template>
<script>
import { Menu } from 'electron';
export default {
    data(){
        return {
            zhengimg:[], //这个数组放加载的四个正方图片的路径
            fanimg:[], //反方的四个图片路径
            ipc:require('electron').ipcRenderer,
            xiaohui:[],
            menuShow:false,
            menuLeft:0,
            menuTop:0,
        }
    },
    methods:{
        loadzheng(index){
            this.ipc.send('open-directory-dialog',index);
        },
        loadfan(index){
            this.ipc.send('open-directory-dialog',index)
            //this.fanimg[index] = '' //在这里加载图片
        },
        change_background(){
            this.ipc.send('open-directory-dialog',1024);
            this.menuShow = false;
        },
        reindex(){
            this.$root.zhengimg = this.zhengimg;
            this.$root.fanimg = this.fanimg;
            this.$root.xiaohui=this.xiaohui;
            this.$router.push('/');
        }
    },
    
    created(){
        this.xiaohui = this.$root.xiaohui;
        this.zhengimg =this.$root.zhengimg; 
        this.fanimg =this.$root.fanimg;
        this.ipc.on('selectedItem',(event,path)=>{
            if(path[1]>=0 && path[1] < 4)
            this.$set(this.zhengimg,path[1],path[0][0].replace(/\\/g,"/"))
            else if (path[1] >= 4 && path[1] < 8)
            this.$set(this.fanimg,path[1]-4,path[0][0].replace(/\\/g,"/"))
            else if(path[1] == 100)
            this.$set(this.xiaohui,0,path[0][0].replace(/\\/g,"/"))
            else if(path[1] == 200)
            this.$set(this.xiaohui,1,path[0][0].replace(/\\/g,"/"))
            else 
            document.querySelector('body').setAttribute('style', 'background:url('+path[0][0].replace(/\\/g,"/")+');background-size:cover;background-repeat:no-repeat;font-family: Source Han Sans,Microsoft YaHei')
        })
            
    },
    

    
}
</script>
<style scoped >
img{
     width: 120px;
     height: 120px;
     border-radius:60px
}

.bordermenu{
    width:100%;
    height: 100%;
}
</style>
