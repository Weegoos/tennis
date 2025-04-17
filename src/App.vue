<template>
  <div>
    <AppLayout />
  </div>
</template>

<script setup>
import { onErrorCaptured, onMounted } from "vue";
import { useQuasar } from "quasar";
import AppLayout from "./layouts/AppLayout.vue";
import { useNotifyStore } from "./stores/notify-store";
import { redirectToUser } from "./composables/javascriptFunction/redirectToTheAuthPage";

const notifyStore = useNotifyStore();
defineOptions({
  name: "App",
});

const $q = useQuasar();

onMounted(() => {
  redirectToUser();
});

onErrorCaptured((err, instance, info) => {
  console.log();
  notifyStore.notifyError($q, `${err}, ${info}`);
});
</script>
