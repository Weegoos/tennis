import { defineStore } from "pinia";
import { Cookies } from "quasar";
import { useRouter } from "vue-router";

export const useJavaScriptFunction = defineStore("javascript", {
  actions: {
    redirect() {
      const router = useRouter();
      const accessToken = Cookies.get("accessToken");
      if (!accessToken) {
        router.push("/registration");
      }
    },
  },
});
