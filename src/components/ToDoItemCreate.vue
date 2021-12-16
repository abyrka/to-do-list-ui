<template>
  <form v-bind:class="classList" v-on:submit.prevent="createToDoItem">
    <input
      v-model="content"
      type="text"
      class="input-text"
      placeholder="Add another task"
      v-on:focusin="startEditing"
      v-on:focusout="finishEditing"
    />
    <button v-if="isActive || contentExists" type="submit" class="add-button">
      + Add
    </button>
  </form>
</template>

<script>
import { createTodoItems } from "@/services/index";

export default {
  data() {
    return {
      content: "",
      isActive: false,
    };
  },
  computed: {
    classList() {
      let classList = [];
      if (this.isActive) {
        classList.push("active");
      }
      return classList;
    },
    contentExists() {
      return this.content.length > 0;
    },
  },
  methods: {
    async createToDoItem() {
      await createTodoItems(this.$store.state.currentUser._id, this.content);
      this.content = "";
    },
    startEditing() {
      this.isActive = true;
    },
    finishEditing() {
      this.isActive = false;
    },
  },
};
</script>
