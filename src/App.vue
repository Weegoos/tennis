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
import { useJavaScriptFunction } from "./stores/javascript-store";

const notifyStore = useNotifyStore();
const javascriptStore = useJavaScriptFunction();
defineOptions({
  name: "App",
});

const $q = useQuasar();

// onMounted(() => {
//   javascriptStore.redirect();
// });

onErrorCaptured((err, instance, info) => {
  console.log();
  notifyStore.notifyError($q, `${err}, ${info}`);
});
</script>
