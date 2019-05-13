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
  body{
    background: url('./assets/bg.svg');
    background-size:cover;
    background-repeat: no-repeat;
    font-family:Source Han Sans,Microsoft YaHei;
  }
</style>
