const searchData = {
  namespaced: true,
  state: {
    mode: "",
    city: "",
    keyword: ""
  },
  mutations: {
    getChosenMode (state, val) {
      state.mode = val;
    },
    getChosenCity (state, val) {
      state.city = val;
    },
    getChosenKeyword (state, val) {
      state.keyword = val;
    },
  }
};
export default searchData;