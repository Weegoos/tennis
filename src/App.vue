<template>
  <div>
    <AppLayout />
  </div>
</template>

<script setup>
import { onErrorCaptured } from "vue";
import { useQuasar } from "quasar";
import AppLayout from "./layouts/AppLayout.vue";
defineOptions({
  name: "App",
});

const $q = useQuasar();
onErrorCaptured((err, instance, info) => {
  console.log();
  $q.notify({
    message: `${err}: ${info}`,
    color: "negative",
    icon: "error",
  });
});
</script>
