import Vue from 'vue'
import Vant from 'vant'
import App from './App.vue'

import router from './router'
import 'vant/lib/index.less'

Vue.use(Vant)

Vue.config.productionTip = false

new Vue({
  router,
  render: (h) => h(App)
}).$mount('#app')
