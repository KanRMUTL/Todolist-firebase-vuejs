<template>
  <div>
    <h1>Toto list</h1>
    <input type="text" v-model="todo"/>
    <br>
    <small>{{ this.errors }}</small>
    <br>
    <button @click="addTodo">Add todo</button>
  </div>
</template>

<script>
import { db } from '@/main'
export default {
  name: 'app',
  data: () => {
    return {
      todo: '',
      errors: ''
    }
  },
  methods: {
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
}
</script>
