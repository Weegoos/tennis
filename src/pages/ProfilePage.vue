<template>
  <div>
    <section data-testid="profileContent">
      <GeneralInfo />
    </section>
    <section data-testid="userStats">
      <UserStats />
    </section>
  </div>
</template>

<script setup>
import { onMounted } from "vue";
import GeneralInfo from "src/components/Profile/GeneralInfo.vue";
import { redirectToUser } from "src/composables/javascriptFunction/redirectToTheAuthPage";
import UserStats from "src/components/Profile/UserStats.vue";
onMounted(() => {
  redirectToUser();
});
</script>

<style></style>
