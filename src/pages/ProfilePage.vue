<template>
  <div>
    <section>
      <GeneralInfo />
    </section>
  </div>
</template>

<script setup>
import { onMounted, ref } from "vue";
import GeneralInfo from "src/components/Profile/GeneralInfo.vue";
import { useJavaScriptFunction } from "src/stores/javascript-store";

const javascriptStore = useJavaScriptFunction();

onMounted(() => {
  javascriptStore.redirect();
});
</script>

<style></style>
