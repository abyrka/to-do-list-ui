<template>
  <div class="home">
    <img alt="Vue logo" src="../assets/logo.png" />
    <ToDoItemCreate />
    <ToDoItem v-for="item in items" :key="item._id" :item="item" />
  </div>
</template>

<script>
import { onMounted, ref } from "vue";
import { useStore } from "vuex";
import ToDoItem from "@/components/ToDoItem.vue";
import ToDoItemCreate from "@/components/ToDoItemCreate.vue";

import { getUserTodoItems } from "@/services/index";

export default {
  name: "Home",
  components: {
    ToDoItem,
    ToDoItemCreate,
  },
  setup() {
    const store = useStore();
    const items = ref([]);
    onMounted(async () => {
      const resItems = await getUserTodoItems(store.state.currentUser._id);
      items.value = resItems.data;
    });

    return {
      items,
    };
  },
  methods: {
    startEditing() {
      this.isActive = true;
    },
    finishEditing() {
      this.isActive = false;
    },
  },
};
</script>
