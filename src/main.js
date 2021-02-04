import Vue from 'vue'
import store from './store'
import router from './router'
import Buefy from 'buefy'
import App from './App.vue'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import './icons'
import './sass/global.scss'
import 'vue-swatches/dist/vue-swatches.min.css'

Vue.config.productionTip = false

Vue.use(Buefy, {
  defaultIconComponent: 'font-awesome-icon',
  defaultIconPack: 'far'
})
Vue.component('font-awesome-icon', FontAwesomeIcon)

new Vue({
  router,
  store,
  beforeCreate () {
    this.$store.commit('initialiseStore')
  },
  render: h => h(App)
}).$mount('#app')
