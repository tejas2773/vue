import { createStore } from 'vuex';

export default createStore({
  state: {
    todos: [],
  },
  getters: {
    todos: (state) => state.todos,
  },
  mutations: {
    ADD_TODO: (state, todo) => {
      state.todos.push(todo);
    },
    REMOVE_TODO: (state, index) => {
      state.todos.splice(index, 1);
    },
    UPDATE_TODO: (state, { index, todo }) => {
      state.todos.splice(index, 1, todo);
    },
  },
  actions: {
    addTodo: ({ commit }, todo) => {
      commit('ADD_TODO', todo);
    },
    removeTodo: ({ commit }, index) => {
      commit('REMOVE_TODO', index);
    },
    updateTodo: ({ commit }, payload) => {
      commit('UPDATE_TODO', payload);
    },
  },
  modules: {},
});

