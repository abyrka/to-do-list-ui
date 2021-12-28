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
    <h3 v-show="!isEditing">{{ this.item.text }}</h3>
    <div v-show="isEditing">
      <input
        :id="`todoItemInputId_${item._id}`"
        :value="newContent"
        @change="onItemTextChanged"
        type="text"
        class="input-task"
      />
    </div>
    <Accordion>
      <template v-slot:title>
        <span class="font-semibold text-xl">Attachments</span>
      </template>
      <template v-slot:content>
        <div>
          <SingleFile :itemId="item._id" />
          <div v-for="file in files" :key="file._id">
            {{ file.name }}
            <button v-on:click="submitFile(file._id)">load</button>
            <button v-on:click="deleteFile(file._id)">delete</button>
          </div>
        </div>
      </template>
    </Accordion>
  </div>
</template>

<script>
import {
  deleteTodoItem,
  updateTodoItems,
  completeTodoItems,
  getTodoItemAttachments,
  deleteAttachment,
  downloadAttachment,
} from "@/services/index";
import Accordion from "@/components/Accordion.vue";
import SingleFile from "@/components/SingleFile.vue";

export default {
  props: {
    item: {
      type: Object,
      required: true,
    },
  },
  components: {
    Accordion,
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
    const resItems = await getTodoItemAttachments(this.item._id);
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
      await completeTodoItems(this.item._id, this.item.complete);
    },
    async onItemTextChanged(e) {
      this.newContent = e.target.value;
      await updateTodoItems(this.item._id, this.newContent);
    },
    async updateTask() {
      this.isEditing = !this.isEditing;

      if (this.isEditing) {
        this.newContent = this.item.text;
        const control = document.getElementById(
          `todoItemInputId_${this.item._id}`
        );
        setTimeout(function () {
          control.focus();
        }, 10);

        console.log(control);
      } else {
        this.item.text = this.newContent;
      }
    },
    submitFile(id) {
      downloadAttachment(id);
    },
    deleteFile(id) {
      deleteAttachment(id);
    },
  },
};
</script>
