<template>
  <div id="app">
    <keep-alive>
      <router-view v-if="$route.meta.isKeepAlive"/>
    </keep-alive>
    <router-view v-if="!$route.meta.isKeepAlive"/>
  </div>
</template>

<script>
  export default {
    name: 'debate_time_meter',
  }
</script>

<style>
  /* CSS */
  @font-face
  {
    font-family: bdzy;
    src: url('../../static/bdzy.ttf');
  }
  body{
    background: url('../../static/bg.svg');
    background-size:100%;
    background-repeat: no-repeat;
    font-family:bdzy;
    position: relative;
  }
</style>
