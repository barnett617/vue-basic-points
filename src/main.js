import Vue from 'vue'
import App from './App.vue'
import router from './router'
import vConsole from 'vconsole'

const vc = new vConsole()
vc.hide()
export { vc }

Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
