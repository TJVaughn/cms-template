<template>
  <div id="app">
    <img alt="Vue logo" src="./assets/logo.png">
    <ApiHello />
    <HelloWorld msg="Welcome to Your App"/>
  </div>
</template>

<script>
import HelloWorld from './components/HelloWorld.vue'
import ApiHello from './components/ApiHello'

export default {
  name: 'App',
  components: {
    HelloWorld,
    ApiHello
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
