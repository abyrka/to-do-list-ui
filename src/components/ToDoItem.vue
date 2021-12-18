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
    <single-file :itemId="item._id" />
    <button
      v-for="file in files"
      :key="file._id"
      v-on:click="submitFile(file._id)"
    >
      {{ file.name }}
    </button>
  </div>
</template>

<script>
import axios from "axios";
import {
  deleteTodoItem,
  updateTodoItems,
  completeTodoItems,
  getTodoItemFiles,
} from "@/services/index";
import SingleFile from "@/components/SingleFile.vue";

export default {
  props: {
    item: {
      type: Object,
      required: true,
    },
  },
  components: {
    SingleFile,
  },
  data() {
    return {
      newContent: "",
      isEditing: false,
      files: [],
    };
  },
  created: async function () {
    const resItems = await getTodoItemFiles(this.item._id);
    this.files = resItems.data;
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
      await completeTodoItems(this.item._id, !this.item.complete);
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
    submitFile(id) {
      axios
        .get(`http://localhost:8000/file/${id}`, {
          headers: {
            "Content-Type": "application/octet-stream",
          },
        })
        .then(function (response) {
          console.log("SUCCESS!!");
          const blob = new Blob([response.data], {
              type: "application/octet-stream",
            }),
            url = window.URL.createObjectURL(blob);

          window.open(url);
        })
        .catch(function () {
          console.log("FAILURE!!");
        });
    },
  },
};
</script>
