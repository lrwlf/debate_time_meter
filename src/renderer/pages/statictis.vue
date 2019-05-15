<template>
    <div>
        <textarea :value="data" id="data"></textarea>

    </div>
</template>
<script>
export default {
    data(){
        return{
            data:'',
            ord:['正方一辩','正方二辩','正方三辩','反方四辩','反方一辩','反方二辩','反方三辩','反方四辩'],
        }
    },
    created(){
        this.$root.statictis.forEach(element => {
            this.data+= '-------'+element.name+'--------\n';
            for(let i = 0;i<element.data.length;++i){
                if(element.data[i].times){
                    this.data +=this.ord[i]+'发言'+element.data[i].times+'次 发言时间'+element.data[i].time+'秒\n'
                }
            }
        });
    }
}
</script>
<style scoped>
#data{
    width:900px;
    height: 450px;
}
</style>
