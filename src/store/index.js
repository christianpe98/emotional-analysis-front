import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

const store = new Vuex.Store({
  state: {
    username: "",
    analysis: [],
    dates: [],
  },
  mutations: {
    setUsername(state, username) {
      state.username = username;
    },
    setAnalysis(state, analysis) {
      state.analysis = analysis;
    },
    setDates(state, dates) {
      state.dates = dates;
    },
  },
  getters: {
    getUsername: (state) => state.username,
    getAnalysis: (state) => state.analysis,
    getDates: (state) => state.dates,
  },
});

export default store;
