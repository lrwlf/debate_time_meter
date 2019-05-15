<template>
    <div>
        <textarea v-bind="data" id="data"></textarea>

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
                    this.data += ord[i]+'发言'+this.element.data[i].times+' 发言时间'+this.element.data[i].time+'秒\n'
                }
            }
        });
    }
}
</script>
<style scoped>
#data{
    width: 100%;
    height: 100%;
}
</style>
