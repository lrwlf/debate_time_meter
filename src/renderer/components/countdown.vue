<template>
    <div>
        计时器
        {{minute}}:{{ten}}{{one}}
        <button @click="dopause">pause</button>
        <img class="num" :src="topath(minute)">
        <img class="num" src="static/split.png">
        <img class="num" :src="topath(ten)">
        <img class="num" :src="topath(one)">
    </div>
</template>
<script>
export default {
    data(){
        return{
            currenttime:600,
            pause:false,
        }
    },
    computed:{
        minute:function(){
            return parseInt(this.currenttime/60);
        },
        ten:function(){
            return parseInt(parseInt(this.currenttime%60)/10)
        },
        one:function(){
            return parseInt(parseInt(this.currenttime%60)%10)
        }
    },
    methods:{
        timedown(){
                if(this.pause||this.currenttime<=0)
                    return
                this.currenttime--;
                setTimeout(this.timedown, 1000);
        },
        dopause(){
            this.pause = !this.pause;
            if(!this.pause)
                this.timedown()
        },
        topath(num){
            return 'static/'+num+'.png'
        }
    },
    created(){
        this.timedown();
    }
}
</script>
<style scoped>
    .num{
       padding: 20px
    }
</style>
