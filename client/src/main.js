import Vue from 'vue'
import App from './App.vue'
import Title from './components/Title.vue'

Vue.config.productionTip = false

new Vue({
  render: h => h(App),
}).$mount('#app')

new Vue({
  render: h => h(Title),
}).$mount('#site-title')