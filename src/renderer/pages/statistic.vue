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
            ord:['正方一辩','正方二辩','正方三辩','正方四辩','反方一辩','反方二辩','反方三辩','反方四辩'],
        }
    },
    created(){
        for(let i = 0;i<this.$root.statistic.length;++i){
            if(!this.$root.fomat[i].statistic)
                continue;
            this.data+= '-------'+this.$root.fomat[i].name+'--------\n';
            for(let j = 0;j<this.$root.statistic[i].length;++j){
                if(this.$root.statistic[i][j].times){
                    this.data +=this.ord[j]+'发言'+this.$root.statistic[i][j].times+'次 发言时间'+this.$root.statistic[i][j].time+'秒\n'
                }
            }
        };
    }
}
</script>
<style scoped>
#data{
    width:900px;
    height: 450px;
}
</style>
