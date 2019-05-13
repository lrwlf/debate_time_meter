<template>
    <div @contextmenu.prevent="showRightMenu" class="bodermenu" @click="LshowRightMenu">
        <div class="aside">
            <span>正方</span>
            <input type="text" placeholder="请输入正方名称"/>
            <input type="text" placeholder="请输入正方观点"/>
        </div><div class="aside">
            <span>反方</span>
            <input type="text" placeholder="请输入反方名称"/>
            <input type="text" placeholder="请输入反方观点"/>
        </div>
        <button id='startdebate' @click="startdebate">开始辩论</button>
        <ul class="contextmenu" v-bind:style="{left: getMenuLeft+'px',top: getMenuTop+'px'}" v-show="menuShow">
            <li v-on:click="change_picture">修改配置</li>
        </ul>
        <input v-model='pos' type="text">
    </div>
</template>
<script>
export default {
    data(){
        return{
            input:'',
            ipc:require('electron').ipcRenderer,
            menuShow:false,
            menuLeft:0,
            menuTop:0,
            pos:'',
        }
    },
    methods:{
        toimgpages(){
            this.$router.push('loadimg');
        },
        startdebate(){
            //this.$router.push('timemeter')
            this.ipc = require("electron").ipcRenderer;
            this.ipc.send("window-max");
        },
        showRightMenu(e){
            if(this.menuShow == false)
            this.menuShow = true;
            else this.menuShow = false;
            this.menuLeft = e.offsetX;
            this.menuTop = e.offsetY;
        },
        LshowRightMenu(e){
            this.menuShow = false;
        },
        change_picture(){
            this.$router.push('loadimg');
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
        this.pos=__static;
    }
}
</script>
<style scoped>
    .aside input{
        background-color:rgba(158, 158, 158, 0.7);
        width:80%;
        height: 50px;
        border-radius:9px;
        border:none;
        font-size: 20px;
        outline: none;
        color: aliceblue;
        margin-top:50px; 
        text-align: center;
        
    }
    .aside{
        width: 50%;
        height: 70%;
        display: inline-block;
        text-align: center;
        margin-top:10%;

    }
    .aside span{
        display: inline-block;
        width: 100%;
    }
    #startdebate{
        width: 120px;
        height: 120px;
        display: block;
        background-color:rgba(158, 158, 158, 0.7);
        border-radius:50%;
        border: none;
        outline: none;
        margin: 0 auto;
        margin-top: 30px;
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