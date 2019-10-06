<template>
  <div class="md-layout md-gutter">
     <div class="md-layout-item md-xlarge-size-25 md-large-size-25 md-medium-size-25 md-small-size-5"></div>
    <md-card class="md-layout-item md-xlarge-size-50 md-large-size-50 md-medium-size-50 md-small-size-90">
     <md-button>Toto list</md-button>
      <div class="full-control">
        <md-field>
          <label>Add Your Todo list</label>
          <md-input v-model="todo"></md-input>
          <md-button class="md-raised md-primary" @click="addTodo">Add todo</md-button>
        </md-field>
      </div>
      
      <md-dialog-alert 
        :md-active.sync="hasError"
        md-title="อ๊ะ!!"
        :md-content="this.errors"
        md-confirm-text="OK...ก็ได้"
      />

      <md-list v-if="this.getItems && this.getItems.length > 0">
        <md-list-item href="#" v-for="item in this.getItems" :key="item.id" >
          <md-checkbox v-model="item.complete" @click="complete(item)"/>
          <span :class="{ 'md-list-item-text complete': item.complete, 'md-list-item-text': !item.complete }" @click="complete(item)">
            {{ item.title }}
          </span>
          <md-button class="md-raised md-accent" @click="deleteItem(item.id)">Clear</md-button>
        </md-list-item>
      </md-list>
     
    </md-card>
  </div>
</template>

<script>
import { db } from "@/main";
import { mapGetters, mapActions } from "vuex";

export default {
  name: "app",
  beforeCreate() {
    this.$store.dispatch("setItems");
   
  },
  data: () => ({
      todo: "",
      hasError: false,
      errors: "",
    }),
  methods: {
    ...mapActions(["setItems", "deleteItem"]),
    addTodo() {
      this.hasError = false,
      this.errors = "";
      if (this.todo !== "") {
        db.collection("items")
          .add({
            title: this.todo,
            created: Date.now(),
            complete: false
          })
          .then(response => {
            if (response) {
              this.todo = "";
            }
          })
          .catch(error => {
            this.hasError = true,
            this.errors = error;
          });
      } else {
        this.hasError = true,
        this.errors = "พิมพ์ todo list ก่อนจ้า";
      }
    },

  },
  computed: {
    ...mapGetters(["getItems"])
  }
};
</script>
<style lang="scss" scoped>
  .full-control > .md-list {
    width: 320px;
    max-width: 100%;
    height: 400px;
    display: inline-block;
    overflow: auto;
    border: 1px solid rgba(#000, .12);
    vertical-align: top;
  }
  .complete {
    text-decoration: line-through;
  }
</style>