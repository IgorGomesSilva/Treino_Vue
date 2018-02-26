// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import Vuetify from 'vuetify'
import { store } from './store'
import DateFilter from './filters/date'
import * as firebase from 'firebase'
import Alert from './components/Shared/Alert.vue'


Vue.use(Vuetify)
Vue.config.productionTip = false

Vue.filter('date', DateFilter)
Vue.component('app-alert', Alert)
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>',
  created () {
    firebase.initializeApp({
      apiKey: 'AIzaSyCcwAbhJoKJlN2CSd-r1Yu3eppQhtUZU2U',
      authDomain: 'igorbd-3bb4f.firebaseapp.com',
      databaseURL: 'https://igorbd-3bb4f.firebaseio.com',
      projectId: 'igorbd-3bb4f',
      storageBucket: 'igorbd-3bb4f.appspot.com'
    })
  }
})
