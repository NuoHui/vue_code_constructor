<template>
  <div id="app">
    <transition name="fade" mode="out-in">
      <router-view></router-view>
    </transition>
  </div>
</template>

<script>
export default {
  name: 'App'
}
</script>

<style lang="scss" scoped>
// @import './assets/styles/index.scss';
.fade-enter-active, .fade-leave-active {
  transition: opacity .5s
}
.fade-enter, .fade-leave-active {
  opacity: 0
}
html, body{
  height: 100%;
}
body{
  // display: table;
  width: 100%;
  // border-right: 7px solid transparent;
}
</style>
