<template>
  <div>Профиль</div>
</template>

<script setup>
import { useNotifyStore } from "src/stores/notify-store";
import { onMounted } from "vue";
import { useApiStore } from "src/stores/api-store";

const notifyStore = useNotifyStore();
const apiStore = useApiStore();

onMounted(async () => {
  await apiStore.getUserProfile();
  console.log(apiStore.userData);
});
</script>

<style></style>
