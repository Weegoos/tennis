<template>
  <div>
    <AppLayout />
  </div>
</template>

<script setup>
import { onErrorCaptured } from "vue";
import AppLayout from "./layouts/AppLayout.vue";
defineOptions({
  name: "App",
});

onErrorCaptured((err, instance, info) => {
  console.log();
});
</script>
