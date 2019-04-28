import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    user: {
      firstname: "",
      lastname: ""
    }
  },
  mutations: {
    setProfile(state, user) {
      state.user.firstname = user.firstname;
      state.user.lastname = user.lastname;
    }
  },
  actions: {
    updateProfile({ commit }, user) {
      commit("setProfile", user);
    }
  }
});
