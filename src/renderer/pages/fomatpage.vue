<template>
  <div>
    <ol>
      <li v-for="item in fomat" :key="item.name">
        <span>环节名称:</span>
        <input v-model="item.name">
        <span>计时模式:</span>
        <select v-model="item.countmode">
          <option value="1">单方计时</option>
          <option value="2">双方计时</option>
        </select>
        <span>时间:</span>
        <input type="number" style="width:50px;" v-model.number="item.time">
        <span>默认发言人</span>
        <select v-model="item.person">
          <option value="0">无</option>
          <option value="1">正方一辩</option>
          <option value="2">正方二辩</option>
          <option value="3">正方三辩</option>
          <option value="4">正方四辩</option>
          <option value="-1">反方一辩</option>
          <option value="-2">反方二辩</option>
          <option value="-3">反方三辩</option>
          <option value="-4">反方四辩</option>
        </select>
        <span>等待发言人</span>
        <select v-model="item.waitperson">
          <option value="0">无</option>
          <option value="1">正方一辩</option>
          <option value="2">正方二辩</option>
          <option value="3">正方三辩</option>
          <option value="4">正方四辩</option>
          <option value="-1">反方一辩</option>
          <option value="-2">反方二辩</option>
          <option value="-3">反方三辩</option>
          <option value="-4">反方四辩</option>
        </select>
        <input type="checkbox" v-model="item.statistic"><span>高级统计</span>
      </li>
      <button @click="add" style="margin-right:500px;margin-left:100px;">添加环节</button><button @click="toback">保存并返回</button>
    </ol>
  </div>
</template>
<script>
export default {
  data() {
    return {
      fomat: [
        {
          name: "",
          countmode: 1,
          time: 0,
          person: 0,
          waitperson: 0,
          statistic: false
        }
      ]
    };
  },
  methods: {
    add() {
      this.fomat.push({
        name: "",
        countmode: 1,
        time: 0,
        person: 0,
        waitperson: 0,
        statistic: false
      });
    },
    toback(){
        this.$root.fomat = [];
        this.fomat.forEach(item => {
            if(item.countmode==2){
                item.timel=item.time;
                item.timef=item.time;
            }
            this.$root.fomat.push(item);
        });
        this.$router.push('/');
    }
  }
};
</script>
<style scoped>
button{
    display: inline-block;
    margin-top:20px; 
    font-family: 'bdzy';
    border: 0;
    outline: 0;
    border-radius: 10px;
    width: 100px;
    height: 25px;
    background: rgba(184, 184, 184, 0.7);
}

</style>
