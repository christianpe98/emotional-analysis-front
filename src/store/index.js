import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

const store = new Vuex.Store({
  state: {
    username: "",
    analysis: [],
  },
  mutations: {
    setUsername(state, username) {
      state.username = username;
    },
    setAnalysis(state, analysis) {
      state.analysis = analysis;
    },
  },
  getters: {
    getUsername: (state) => state.username,
    getAnalysis: (state) => state.analysis,
  },
});

export default store;
