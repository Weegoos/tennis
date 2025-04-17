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
import { redirectToUser } from "src/composables/javascriptFunction/redirectToTheAuthPage";
onMounted(() => {
  redirectToUser();
});
</script>

<style></style>
