<template>
    <div>
        <img v-for="(item,index) in zhengimg" @click="loadzheng(index)" :key="item.id" :src="item" >    
        <img v-for="(item,index) in fanimg" @click="loadfan(index)" :key="item.id" :src="item" >
    </div>
</template>
<script>
export default {
    data(){
        return {
            zhengimg:[], //这个数组放加载的四个正方图片的路径
            fanimg:[], //反方的四个图片路径
        }
    },
    methods:{
        loadzheng(index){
            console.log(index);
            this.zhengimg[index] = ''//在这里加载图片
        },
        loadfan(index){
            this.fanimg[index] = '' //在这里加载图片
        }
    },
    created(){
        for(let i=0;i<4;++i){
            this.zhengimg.push('static/defaultimg.jpg') //加载默认图片
            this.fanimg.push('static/defaultimg.jpg')
        }    
    }
}
</script>
<style scoped>
 img{
     width: 120px;
     border-radius:60px
    }

</style>
