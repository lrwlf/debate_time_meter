<template>
  <div>
    <ol>
      <li v-for="item in fomat" :key="item.index">
        <span>环节名称:</span>
        <input v-model="item.name" />
        <span>计时模式:</span>
        <select v-model="item.countmode">
          <option value="1">单方计时</option>
          <option value="2">双方计时</option>
        </select>
        <span>时间:</span>
        <input type="number" style="width:50px;" v-model.number="item.time" />
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
        <input type="checkbox" v-model="item.statistic" />
        <span>高级统计</span>
      </li>
      <button @click="add" style="margin-right:500px;margin-left:100px;">添加环节</button>
      <button @click="toback">保存并返回</button>
      <button
        @click="exportRaw('sz.dtm',JSON.stringify(fomat))"
        style="margin-right:500px;margin-left:100px;"
      >导出赛制</button>
      <button @click="read()">导入赛制</button>
      <input type="file" @change="readPath" id="files" style="position:absolute;top:-100vh" />
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
    toback() {
      this.$root.fomat = [];
      this.fomat.forEach(item => {
        if (item.countmode == 2) {
          item.timel = item.time;
          item.timef = item.time;
        }
        this.$root.fomat.push(item);
      });
      this.$router.push("/");
    },
    exportRaw(name, data) {
      var urlObject = window.URL || window.webkitURL || window;
      var export_blob = new Blob([data]);
      var save_link = document.createElementNS(
        "http://www.w3.org/1999/xhtml",
        "a"
      );
      save_link.href = urlObject.createObjectURL(export_blob);
      save_link.download = name;
      this.fakeClick(save_link);
    },
    fakeClick(obj) {
      var ev = document.createEvent("MouseEvents");
      ev.initMouseEvent(
        "click",
        true,
        false,
        window,
        0,
        0,
        0,
        0,
        0,
        false,
        false,
        false,
        false,
        0,
        null
      );
      obj.dispatchEvent(ev);
    },
    read() {
      var getFile = document.getElementById("files");
      getFile.click();
    },
    readPath(e) {
        console.log(e.currentTarget.files[0].path); //文件名
        let xhr = new XMLHttpRequest(),
        okStatus = document.location.protocol === "file:" ? 0 : 200;
        xhr.open("GET", e.currentTarget.files[0].path, false);
        xhr.overrideMimeType("text/html;charset=utf-8"); //默认为utf-8
        xhr.send(null);
        if(xhr.status === okStatus){
            this.fomat=JSON.parse(xhr.responseText)
        }
        else{
          alert('导入失败！')
        }      
    }
  }
};
</script>
<style scoped>
button {
  display: inline-block;
  margin-top: 20px;
  font-family: "bdzy";
  border: 0;
  outline: 0;
  border-radius: 10px;
  width: 100px;
  height: 25px;
  background: rgba(184, 184, 184, 0.7);
}
</style>
