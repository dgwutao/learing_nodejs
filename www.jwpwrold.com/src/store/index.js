import { defineStore } from "pinia";

export const useFileStore = defineStore("fileStore", {
  state: () => ({
    dict: {},   
  }),
  actions: {
    setDict(info) {
      this.dict = info;
    },   
  },
});
