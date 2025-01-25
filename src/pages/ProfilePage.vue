<template>
  <div>
    <section>
      <GeneralInfo />
    </section>
  </div>
</template>

<script setup>
import { useNotifyStore } from "src/stores/notify-store";
import { onMounted, ref } from "vue";
import { useApiStore } from "src/stores/api-store";
import GeneralInfo from "src/components/Profile/GeneralInfo.vue";

const notifyStore = useNotifyStore();
const apiStore = useApiStore();

const firstName = ref("");
const secondName = ref("");
const phone = ref("");
const email = ref("");

onMounted(async () => {
  await apiStore.getUserProfile();
});
</script>

<style></style>
