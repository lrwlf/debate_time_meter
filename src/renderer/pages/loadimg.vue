<template>
    <div>
        <img v-for="(item,index) in zhengimg" @click="loadzheng(index)" :key="item.id" :src="zhengimg[index]" >    
        <img v-for="(item,index) in fanimg" @click="loadfan(index+4)" :key="item.id" :src="fanimg[index]" >
        
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
        showRightMenu(){
            this.ipc.send('open-directory-dialog',1024);
            console.log(1);
        }
    },
    created(){
        for(let i=0;i<4;++i){
            if(this.zhengimg[i] == undefined || this.zhengimg[i]=='static/defaultimg.jpg')
            this.zhengimg[i] = 'static/defaultimg.jpg' //加载默认图片

            if(this.fanimg[i] == undefined || this.fanimg[i] =='static/defaultimg.jpg')
            this.fanimg[i] = 'static/defaultimg.jpg'
        }
        this.ipc.on('selectedItem',(event,path)=>{
            if(path[1]>=0 && path[1] < 4)
            this.$set(this.zhengimg,path[1],path[0][0].replace(/\\/g,"/"))
            else
            this.$set(this.fanimg,path[1]-4,path[0][0].replace(/\\/g,"/"))
            console.log(path[1]-4)
           /* else 
            document.querySelector('body').setAttribute('style', 'background-color:#fff')*/
        })    
    },
    

    
}
</script>
<style scoped>
 img{
     width: 120px;
     height: 120px;
     border-radius:60px
    }

</style>
