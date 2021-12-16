<template>
  <div :class="classList">
    <button class="delete-button" @click="deleteItem">×</button>
    <button class="edit-button" @click="updateTask">
      {{ isEditing ? "Update" : "Edit" }}
    </button>
    <input
      class="toggle"
      type="checkbox"
      v-model="item.complete"
      @input="$emit('input', $event.target.value)"
      @change="onItemCompleteChanged"
    />
    <h3 v-if="!isEditing">{{ this.item.text }}</h3>
    <div v-else>
      <input
        :value="newContent"
        @change="onItemTextChanged"
        type="text"
        class="input-task"
      />
    </div>
  </div>
</template>

<script>
import {
  deleteTodoItem,
  updateTodoItems,
  completeTodoItems,
} from "@/services/index";

export default {
  props: {
    item: {
      type: Object,
      required: true,
    },
  },
  data() {
    return {
      newContent: "",
      isEditing: false,
    };
  },
  computed: {
    classList() {
      const classList = ["task"];
      return classList;
    },
  },
  methods: {
    async deleteItem() {
      console.log(this.item._id);
      await deleteTodoItem(this.item._id);
    },
    async onItemCompleteChanged() {
      await completeTodoItems(this.item._id);
    },
    async onItemTextChanged(e) {
      this.newContent = e.target.value;
      await updateTodoItems(this.item._id, this.newContent);
    },
    async updateTask() {
      console.log(this.item.text);
      this.isEditing = !this.isEditing;

      if (this.isEditing) {
        this.newContent = this.item.text;
      } else {
        this.item.text = this.newContent;
      }
    },
  },
};
</script>
