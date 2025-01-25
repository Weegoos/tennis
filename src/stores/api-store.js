import { defineStore } from "pinia";
import axios from "axios";
import { Cookies } from "quasar";

export const useApiStore = defineStore("api", {
  state: () => ({
    userData: null,
  }),
  actions: {
    async getUserProfile() {
      try {
        const response = await axios.get(
          "http://localhost:8000/api/v1/user/authenticated",
          {
            headers: {
              "Content-Type": "application/json",
              Accept: "application/json",
              Authorization: `Bearer ${Cookies.get("accessToken")}`,
            },
            withCredentials: true,
          }
        );
        this.userData = response.data;
      } catch (error) {
        console.error(error);
      }
    },
  },
});
