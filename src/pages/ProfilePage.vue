<template>
  <div>Профиль</div>
</template>

<script setup>
import { QSpinnerGears, useQuasar } from "quasar";
import axios from "axios";
import { useNotifyStore } from "src/stores/notify-store";

const notifyStore = useNotifyStore();
const $q = useQuasar();
const getUserInformationById = async () => {
  notifyStore.loading($q, "Подождите, данные грузятся...", QSpinnerGears);
  try {
    const response = await axios.get("http://localhost:8000/api/v1/user/1", {
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      withCredentials: true,
    });

    console.log(response.data);
  } catch (error) {
  } finally {
    $q.loading.hide();
  }
};

getUserInformationById();
</script>

<style></style>
