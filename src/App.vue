<template>
  <div>
    <h1>Toto list</h1>
    <input type="text" v-model="todo"/>
    <button @click="addTodo">Add todo</button>
    <br>
    <small>{{ this.errors }}</small>
    <div v-if="this.getItems && this.getItems.length > 0">
      <div v-for="item in this.getItems" :key="item.id">
        {{ item.title }} <br>  
      </div>
    </div>
    <br>
   
  </div>
</template>

<script>
import { db } from '@/main'
import {mapGetters, mapActions} from 'vuex'
export default {
  name: 'app',
  beforeCreate () {
    this.$store.dispatch('setItems')
  },
  data: () => {
    return {
      todo: '',
      errors: ''
    }
  },
  methods: {
    ...mapActions(['setItems']),
    addTodo() {
      this.errors = '';
      if(this.todo !== ''){
        db.collection('items').add({
          title: this.todo,
          created: Date.now()
        }).then((response) => {
          if(response) {
            this.todo = ''
          }
        }).catch((error) =>{
          this.errors = error
        })
      } else {
        this.errors = "เพิ่ม todo list ก่อนจ้า"
      }
    }
  },
  computed: {
    ...mapGetters(['getItems'])
  },
}
</script>
