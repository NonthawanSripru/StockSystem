import Vue from 'vue'
import './plugins/axios'
import App from './App.vue'
import vuetify from './plugins/vuetify'
import router from './router'
import '../src/firebaseDb'
import VueQRCodeComponent from 'vue-qrcode-component'

Vue.component('qr-code', VueQRCodeComponent)

Vue.config.productionTip = false

new Vue({
  vuetify,
  router,
  render: h => h(App)
}).$mount('#app')
