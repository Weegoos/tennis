import { defineStore } from "pinia";

export const useNotifyStore = defineStore("notify", {
  actions: {
    nofifySuccess($q, message) {
      $q.notify({
        color: "green-4",
        textColor: "white",
        icon: "cloud_done",
        message: message,
      });
    },
    notifyError($q, message) {
      $q.notify({
        color: "red-5",
        textColor: "white",
        icon: "error",
        message: message,
      });
    },
    loading($q, message, spinner) {
      if (!$q || !$q.loading) {
        console.error("Quasar instance ($q) is not provided!");
        return;
      }

      $q.loading.show({
        spinner: spinner,
        message: message,
        messageColor: "white",
        backgroundColor: "black",
      });
    },
  },
});
