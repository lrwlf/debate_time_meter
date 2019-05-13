<template>
    <div @contextmenu.prevent="showRightMenu" class="bodermenu">
        <img v-for="(item,index) in zhengimg" @click="loadzheng(index)" :key="item.id" :src="zhengimg[index]" >    
        <img v-for="(item,index) in fanimg" @click="loadfan(index+4)" :key="item.id" :src="fanimg[index]" >
        <ul class="contextmenu" v-bind:style="{left: getMenuLeft+'px',top: getMenuTop+'px'}" v-show="menuShow">
            <li v-on:click="change_background">选择背景图片</li>
        </ul>
       
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
        showRightMenu(e){
            if(this.menuShow == false)
            this.menuShow = true;
            else this.menuShow = false;
            this.menuLeft = e.offsetX;
            this.menuTop = e.offsetY;
        },
        
        change_background(){
            this.ipc.send('open-directory-dialog',1024);
            this.menuShow = false;
        },
        reindex(){
            this.$root.zhengimg = this.zhengimg;
            this.$root.fanimg = this.fanimg;
            this.$router.push('/');
        }
    },
    computed: {
        getMenuLeft:function(e){
            return this.menuLeft;
        },
        getMenuTop:function(e){
            return this.menuTop;
        },
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
            else if (path[1] >= 4 && path[1] < 8)
            this.$set(this.fanimg,path[1]-4,path[0][0].replace(/\\/g,"/"))
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
.contextmenu {
  margin: 0;
  background: #fff;
  width: 135px;
  z-index: 100;
  position: absolute;
  list-style-type: none;
  padding: 5px 0;
  border-radius: 4px;
  font-size: 12px;
  font-weight: 400;
  color: #333;
  box-shadow: 1px 1px 1px 1px rgba(0, 0, 0, .3)
}
.contextmenu li {
  margin: 0;
  padding: 7px 16px;
  cursor: pointer;
}
.contextmenu li:hover {
  background: #eee;
}
.bordermenu{
    width:100%;
    height: 100%;
}
</style>
