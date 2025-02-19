import { defineStore } from "pinia";
import axios from "axios";
import { Cookies, QSpinnerGears, useQuasar } from "quasar";
import { useNotifyStore } from "./notify-store";
import { getMethod } from "src/composables/apiMethod/get";
import { ref } from "vue";

export const useApiStore = defineStore("api", {
  state: () => ({
    userData: null,
    city: ref([]),
  }),
  actions: {
    async getUserProfile() {
      const $q = useQuasar();
      const notifyStore = useNotifyStore();
      notifyStore.loading($q, "Данные загружаются...", QSpinnerGears);
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
        // console.log(response.data);
      } catch (error) {
        notifyStore.notifyError(
          $q,
          `Ошибка передачи данных о пользователе: ${error}`
        );
        console.error(error);
      } finally {
        $q.loading.hide();
      }
    },

    async getCity(serverURL) {
      const $q = useQuasar();
      const notifyStore = useNotifyStore();
      await getMethod(serverURL, "enum/city", this.city, $q); // Передаём ref
    },
  },
});
