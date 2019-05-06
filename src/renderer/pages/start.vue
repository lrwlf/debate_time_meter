<template>
    <div>
        <span>正方</span>
        <input type="text"/>
        <span>反方</span>
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
        }
    }
}
</script>
<style>
    input{
        background-color:rgba(207, 207, 207, 0.7);
        width:300px;
        height: 50px;
        border-radius:9px;
        border:none;
        font-size: 20px;
        outline: none;
        color: aliceblue;
    }
</style>