import { defineStore } from "pinia";
import axios from "axios";
import { Cookies, QSpinnerGears, useQuasar } from "quasar";
import { useNotifyStore } from "./notify-store";
import { getMethod } from "src/composables/apiMethod/get";
import { ref } from "vue";

export const useApiStore = defineStore("api", {
  state: () => ({
    userData: ref([]),
    city: ref([]),
    category: ref([]),
    role: ref([]),
    language: ref([]),
    gender: ref([]),
    service: ref([]),
    tier: ref([]),
    numberOfCoach: ref(0),
  }),
  actions: {
    async getUserProfile() {
      try {
        const response = await axios.get(
          "https://tennis-p30s.onrender.com/api/v1/user/authenticated",
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

    async getCity(serverURL, $q) {
      await getMethod(
        serverURL,
        "enum/city",
        this.city,
        $q,
        "Ошибка при получении списка городов"
      );
    },

    async getCategory(serverURL, $q) {
      await getMethod(
        serverURL,
        "enum/category",
        this.category,
        $q,
        "Ошибка при получении списка категории"
      );
    },
    async getRoles(serverURL, $q) {
      await getMethod(
        serverURL,
        "enum/roles",
        this.role,
        $q,
        "Ошибка при получении списка роле"
      );
    },
    async getLanguage(serverURL, $q) {
      await getMethod(
        serverURL,
        "enum/language",
        this.language,
        $q,
        "Ошибка при получении списка языка"
      );
    },
    async getGender(serverURL, $q) {
      await getMethod(
        serverURL,
        "enum/gender",
        this.gender,
        $q,
        "Ошибка при получении списка пола"
      );
    },
    async getService(serverURL, $q) {
      await getMethod(
        serverURL,
        "enum/service",
        this.service,
        $q,
        "Ошибка при получении списка сервисов"
      );
    },
    async getTier(serverURL, $q) {
      await getMethod(
        serverURL,
        "enum/tier",
        this.tier,
        $q,
        "Ошибка при получении тира"
      );
    },
    async setNumber(value) {
      this.numberOfCoach = value;
    },
  },
  persist: true,
});
