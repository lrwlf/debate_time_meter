<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>

<script>
  export default {
    name: 'debate_time_meter',
    data(){
      return {
        fomat: [
          {
            name:'正方开篇立论',
            countmode:1,
            time:210,
            person:1,
          },
          {
            name:'反方二辩质询',
            countmode:1,
            time:120,
            person:-2,
          },
          {
            name:'反方开篇立论',
            countmode:1,
            time:210,
            person:-1,
          },
          {
            name:'正方二辩质询',
            countmode:1,
            time:120,
            person:2,
          },
          {
            name:'正方质询小结',
            countmode:1,
            time:90,
            person:2,
          },  
          {
            name:'反方质询小结',
            countmode:1,
            time:90,
            person:-2,
          },
          {
            name:'正反四辩对辩论',
            countmode:2,
            time:90,
            person:[4,-4],
          },
          {
            name:'正方三辩盘问',
            countmode:3,
            time:90,
            person:3,
          },
          {
            name:'反方三辩盘问',
            countmode:3,
            time:90,
            person:-3,
          },
          {
            name:'正方盘问小结',
            countmode:1,
            time:90,
            person:3,
          },
          {
            name:'反方盘问小结',
            countmode:1,
            time:90,
            person:-3,
          },
          {
            name:'自由辩论',
            countmode:2,
            time:240,
            person:[0,0],
          },
          {
            name:'反方结辩',
            countmode:1,
            time:210,
            person:-4,
          },
          {
            name:'正方结辩',
            countmode:1,
            time:210,
            person:4,
          },          
        ]
      }
    }
  }
</script>

<style>
  /* CSS */
  body{
    background: url('./assets/bg.svg');
    background-size:cover;
    background-repeat: no-repeat;
    font-family:Source Han Sans,Microsoft YaHei;
  }
</style>
