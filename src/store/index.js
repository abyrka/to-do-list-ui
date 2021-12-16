import { createStore } from "vuex";

export default createStore({
  state: {
    currentUser: null,
  },
  mutations: {
    changeCurrentUser(state, user) {
      state.currentUser = user;
    },
  },
  actions: {},
});
