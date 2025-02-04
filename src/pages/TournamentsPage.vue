<template>
  <div>{{ tournaments }}</div>
</template>

<script setup>
import { Cookies, QSpinnerGears, useQuasar } from "quasar";
import axios from "axios";
import { useNotifyStore } from "src/stores/notify-store";
import { ref } from "vue";

// global variables
const notifyStore = useNotifyStore();
const $q = useQuasar();

const tournaments = ref("");
const getTournaments = async () => {
  notifyStore.loading($q, "Подождите, данные загружаются...", QSpinnerGears);
  try {
    const response = await axios.get(
      "http://localhost:8000/api/v1/tournament",
      {
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          Authorization: `Bearer ${Cookies.get("accessToken")}`,
        },
        withCredentials: true,
      }
    );

    console.log(response.data);
    tournaments.value = response.data;
  } catch (error) {
    console.error(error);
  } finally {
    $q.loading.hide();
  }
};

getTournaments();
</script>

<style></style>
