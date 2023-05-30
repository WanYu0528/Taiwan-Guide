import { createStore, createLogger } from "vuex";

import searchData from "@/store/modules/searchData";
export default createStore({
  modules: {
    searchData
  },
  plugins: [createLogger()]
});
