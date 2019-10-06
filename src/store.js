import Vue from 'vue'
import Vuex from 'vuex'
import { db } from '@/main'
Vue.use(Vuex)

export default new Vuex.Store({
     state: {
          items: null,
          database: db.collection('items')
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
          },
          deleteItem: (state, payload) => {
               state.database.doc(payload).delete().then(res => {
               if(res){ console.log(res) }
               }).catch(error => this.errors = error)
          },
          updateItem: (state, payload) => {
               state.database.doc(payload.id).update({
                 "complete": !payload.complete
               }).then(res => {
                 if(res){ console.log(res) }
               }).catch(error => this.errors = error)
          }
     },

     actions: {
          setItems: ({commit}) => {
               commit('setItems')
          },
          deleteItem: ({commit}, payload) => {
               commit('deleteItem', payload)
          },
          updateItem: ({commit}, payload) => {
               commit('updateItem', payload)
          }
     }

})