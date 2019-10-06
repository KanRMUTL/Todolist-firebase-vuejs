import Vue from 'vue'
import App from './App.vue'
import firebase from 'firebase'
import store from './store'
import './vueMaterial'

const firebaseConfig = {
  apiKey: "AIzaSyCQGkApFITU4gj6aJaVLSIHKLwslE5EqqM",
  authDomain: "todolist-vue-2729a.firebaseapp.com",
  databaseURL: "https://todolist-vue-2729a.firebaseio.com",
  projectId: "todolist-vue-2729a",
  storageBucket: "todolist-vue-2729a.appspot.com",
  messagingSenderId: "1098068581485",
  appId: "1:1098068581485:web:0749a9583fc82dc7c5b364",
  measurementId: "G-BRRRWW409X"
}

firebase.initializeApp(firebaseConfig)

export const db = firebase.firestore()
export const database = firebase.database()

Vue.config.productionTip = false

new Vue({
  store,
  render: h => h(App),
}).$mount('#app')