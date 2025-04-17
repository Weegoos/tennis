<template>
  <div>Медиатека</div>
</template>

<script setup>
import { redirectToUser } from "src/composables/javascriptFunction/redirectToTheAuthPage";
import { onMounted } from "vue";

onMounted(() => {
  redirectToUser();
});
</script>

<style></style>
