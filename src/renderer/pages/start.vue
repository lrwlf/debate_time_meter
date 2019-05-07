<template>
    <div>
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
        <button @click="toimgpages">toimgpages</button>
    </div>
</template>
<script>
export default {
    data(){
        return{
            input:'',
        }
    },
    methods:{
        toimgpages(){
            this.$router.push('loadimg');
        },
        startdebate(){
            this.$router.push('timemeter')
        }
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
</style>