<template>
  <div>
    <section data-testid="profileContent">
      <GeneralInfo />
    </section>
  </div>
</template>

<script setup>
import { onMounted } from "vue";
import GeneralInfo from "src/components/Profile/GeneralInfo.vue";
import { useJavaScriptFunction } from "src/stores/javascript-store";

const javascriptStore = useJavaScriptFunction();

onMounted(() => {
  javascriptStore.redirect();
});
</script>

<style></style>
