<template>
  <div class="container">
    <div>
      <label>
        <span> Add new file </span>
        <input type="file" @change="handleFileUpload($event)" />
      </label>
      <br />
      <button v-on:click="submitFile()">Submit</button>
    </div>
  </div>
</template>

<script>
import { uploadAttachment } from "@/services/index";

export default {
  data() {
    return {
      file: "",
    };
  },
  props: {
    itemId: {
      type: String,
      required: true,
    },
  },
  methods: {
    handleFileUpload(event) {
      this.file = event.target.files[0];
    },

    async submitFile() {
      const success = await uploadAttachment(this.itemId, this.file);
      if (success) {
        this.file = null;
      }
    },
  },
};
</script>
