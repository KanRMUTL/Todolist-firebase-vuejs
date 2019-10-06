import Vue from 'vue'
import Vuex from 'vuex'
import { db } from '@/main'
Vue.use(Vuex)

export default new Vuex.Store({
     state: {
          items: null
     }, 
     
     getters: {
          getItems: state => state.items
     },

     mutations: {
          setItems: state => {
               let items = []
               db.collection('items').orderBy('created').onSnapshot((snapshot) => {
                    items = []
                    snapshot.forEach((doc) => {
                         items.push({
                              id: doc.id, 
                              title: doc.data().title,
                              complete: doc.data().complete
                         })
                    })
                    state.items = items
               })
          }
     },

     actions: {
          setItems: context => {
               context.commit('setItems')
          }
     }

})