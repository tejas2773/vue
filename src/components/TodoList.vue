<template>
  <div class="todo-container">
    <h1 class="todo-title">Todo List</h1>
    <input
      v-model="newTodo"
      @keyup.enter="addTodo"
      placeholder="Add a new todo"
      class="todo-input"
    />
    <ul class="todo-list">
      <li v-for="(todo, index) in todos" :key="index" class="todo-item">
        <span v-if="editIndex !== index">{{ todo }}</span>
        <input
          v-else
          v-model="editTodo"
          @keyup.enter="updateTodo"
          class="todo-edit-input"
        />
        <div class="todo-actions">
          <button @click="startEditing(index, todo)" v-if="editIndex !== index" class="todo-edit-button">Edit</button>
          <button @click="updateTodo" v-if="editIndex === index" class="todo-save-button">Save</button>
          <button @click="cancelEditing" v-if="editIndex === index" class="todo-cancel-button">Cancel</button>
          <button @click="removeTodo(index)" class="todo-remove-button">Remove</button>
        </div>
      </li>
    </ul>
  </div>
</template>

<script>
import { computed, ref } from 'vue';
import { useStore } from 'vuex';

export default {
  setup() {
    const store = useStore();
    const newTodo = ref('');
    const editIndex = ref(null);
    const editTodo = ref('');

    const todos = computed(() => store.getters.todos);

    const addTodo = () => {
      if (newTodo.value.trim() !== '') {
        store.dispatch('addTodo', newTodo.value);
        newTodo.value = '';
      }
    };

    const removeTodo = (index) => {
      store.dispatch('removeTodo', index);
    };

    const startEditing = (index, todo) => {
      editIndex.value = index;
      editTodo.value = todo;
    };

    const cancelEditing = () => {
      editIndex.value = null;
      editTodo.value = '';
    };

    const updateTodo = () => {
      if (editTodo.value.trim() !== '') {
        store.dispatch('updateTodo', { index: editIndex.value, todo: editTodo.value });
        cancelEditing();
      }
    };

    return {
      newTodo,
      todos,
      addTodo,
      removeTodo,
      editIndex,
      editTodo,
      startEditing,
      cancelEditing,
      updateTodo
    };
  }
};
</script>

<style scoped>
.todo-container {
  max-width: 600px;
  margin: 0 auto;
  padding: 20px;
  border: 1px solid #ddd;
  border-radius: 8px;
  background-color: #f9f9f9;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.todo-title {
  font-size: 24px;
  font-weight: bold;
  margin-bottom: 16px;
  text-align: center;
}

.todo-input {
  width: 100%;
  padding: 8px;
  border: 1px solid #ccc;
  border-radius: 4px;
  margin-bottom: 16px;
  box-sizing: border-box;
}

.todo-list {
  list-style-type: none;
  padding: 0;
}

.todo-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 8px;
  border-bottom: 1px solid #eee;
}

.todo-item:last-child {
  border-bottom: none;
}

.todo-edit-input {
  width: 70%;
  padding: 4px;
  border: 1px solid #ccc;
  border-radius: 4px;
}

.todo-actions {
  display: flex;
  gap: 8px;
}

.todo-edit-button,
.todo-save-button,
.todo-cancel-button,
.todo-remove-button {
  background-color: #3498db;
  color: #fff;
  border: none;
  padding: 4px 8px;
  border-radius: 4px;
  cursor: pointer;
}

.todo-save-button {
  background-color: #2ecc71;
}

.todo-cancel-button {
  background-color: #e74c3c;
}

.todo-remove-button {
  background-color: #ff4d4f;
}

.todo-edit-button:hover,
.todo-save-button:hover,
.todo-cancel-button:hover,
.todo-remove-button:hover {
  opacity: 0.8;
}
</style>


